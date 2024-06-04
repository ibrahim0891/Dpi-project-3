import { Link, useParams } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { useEffect, useRef, useState } from "react";
import { child, get, onValue, push, ref, runTransaction, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import TimeStamp from "../../Common/TimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPaperPlane, faTrash, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import LoaderIcon from "../../Common/Loader-icon";


const ChatView = () => {
    const chatID = useParams();
    const chatIDnumber = chatID['chatID']
    let [receiver, setReceiver] = useState()
    let [messageContent, setMessageContent] = useState('')
    const [messsages, setMessages] = useState([])
    const [firstMessage, setFirstMessge] = useState('')

    const [isActive, setIsActive] = useState(false)
    const autoScroller = useRef(null)
    let currentUID = localStorage.getItem('currentUser')

    let generateThreadID = (uid1, uid2) => {
        let combinedUID = [uid1.slice(0, 4), uid2.slice(0, 4)].sort().join('').slice(0, 8);
        return combinedUID;
    }


    let threadID = generateThreadID(currentUID, chatIDnumber)
    let message = {
        sender: currentUID,
        message: messageContent,
        time: TimeStamp()
    }

    let [typing, setTyping] = useState(null)
    useEffect(() => {
        get(child(ref(database), `/users/${chatIDnumber}/info`)).then((snapshot) => {
            setReceiver(snapshot.val())
        })
        onValue(ref(database, '/chats/' + threadID), (snapshot) => {
            if (snapshot.exists()) {
                setMessages(snapshot.val())
            }
            else {
                setFirstMessge('Say hi to ' + receiver.fname)
            }
        })
        onValue(ref(database, '/users/' + chatIDnumber + '/info/activeStatus'), (snapshot) => {
            setIsActive(snapshot.val())
        })

        onValue(ref(database, `/typingState/${threadID}/${chatIDnumber.slice(0, 4)}`), (snapshot) => {
            if (snapshot.exists()) {
                setTyping(snapshot.val())
            } else {
                setTyping(null)
            }
        })
    }, [])


    useEffect(() => {
        if (autoScroller.current) {
            autoScroller.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messsages, []])

    let send = (e) => {
        e.preventDefault()
        if (messageContent !== '') {
            let newMessageID = push(ref(database, '/chats')).key
            set(ref(database, '/chats/' + threadID + "/" + newMessageID), message)
            let lastMessage = {
                lastMessageTime: TimeStamp(),
                lastSender: currentUID,
                lastMessage: messageContent
            }
            set(ref(database, '/threadList/' + currentUID + '/' + threadID), { ...lastMessage, receiver: chatIDnumber })
            set(ref(database, '/threadList/' + chatIDnumber + '/' + threadID), { ...lastMessage, receiver: currentUID })
            setMessageContent('')
        } else {
            alert('Please enter a message to send')
            return null
        }

    }


    // set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData) 

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(e);
            let typingIndicatorData = {
                typer: localStorage.getItem('currentUser'),
                isTyping: true,
                typeContent: 'is waiting for a reply'
            }
            set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData);
        }
    };



    const typingStart = (e) => {
        let typingIndicatorData = {
            typer: localStorage.getItem('currentUser'),
            isTyping: true,
            typeContent: 'is about to type a message'
        }
        set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData);
        console.log('focus');
    }
    const typingEnd = (e) => {
        let input = e.target.value;
        let typingIndicatorData = {
            typer: localStorage.getItem('currentUser'),
            isTyping: false,
            typeContent: 'typing end'
        }
        set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData);
        console.log('blue');
    }

    const handleInputChange = (e) => {
        let input = e.target.value
        setMessageContent(input)


        if (input.legth == 0 || e.target.value == '') {
            let typingIndicatorData = {
                typer: localStorage.getItem('currentUser'),
                isTyping: true,
                typeContent: 'cleared all text!'
            }
            set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData)
        }
        if (input.length == 1) {
            let typingIndicatorData = {
                typer: localStorage.getItem('currentUser'),
                isTyping: true,
                typeContent: 'is thinking...'
            }
            set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData)
        }
        if (input.length > 5 && input.length <= 20) {
            let typingIndicatorData = {
                typer: localStorage.getItem('currentUser'),
                isTyping: true,
                typeContent: ': ' + input
            }
            set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData)
        }

    }
    return (
        <div className="h-screen relative">
            {receiver ?
                <div className="flex flex-col bg-green-200 justify-between h-screen ">
                    <div className="sticky top-0 md:top-14 bg-gray-100 text-gray-700 p-0.5 flex items-center justify-between z-10 shadow-md ">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-center">
                                <Link to={links.home.inbox.chatLayout}>
                                    <button className="py-2 px-4 pr-2">
                                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                                    </button>
                                </Link>
                                <Link to={links.sec.modOthers + chatIDnumber}>
                                    <div className="flex items-center py-2">
                                        {receiver.avater ?
                                            <img src={receiver.avater} alt={receiver.fname} className="w-10 aspect-square rounded-full mr-1" /> :
                                            <img
                                                src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais'
                                                className="w-10 aspect-square rounded-full mr-1"
                                            />
                                        }
                                        <div className="text-lg ml-3 flex items-center ">
                                            <span className="text-ms" > {receiver.fname} </span>
                                            <div className="text-[14px] flex items-center justify-center ml-4">
                                                {isActive['online'] == 'Active now' ?
                                                    <div className="w-3 mr-2 aspect-square bg-green-700 rounded-full animate-pulse"></div> :
                                                    <div className="w-3 mr-2 aspect-square bg-red-700 rounded-full "></div>
                                                }
                                                {isActive && isActive['online']}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="p-4 rounded-lg hover:bg-white hover:shadow-lg">
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </div>
                        </div>

                    </div>
                    <div className=" bg-gray-50 h-full flex-1 overflow-auto p-4 pb-2" >
                        {messsages ? Object.keys(messsages).map((objKeys) =>
                            <div className={messsages[objKeys].sender == chatIDnumber ? 'flex items-end p-2' : ' flex justify-end p-2' + ''} key={objKeys}>
                                {receiver.avater ?
                                    <img src={messsages[objKeys].sender == chatIDnumber && receiver.avater}
                                        className={messsages[objKeys].sender == chatIDnumber ? 'w-8 aspect-square rounded-full mr-2' : 'hidden'}
                                        alt=""
                                    /> :
                                    <img src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais'
                                        className={messsages[objKeys].sender == chatIDnumber ? 'w-8 aspect-square rounded-full mr-2' : 'hidden'}
                                        alt=""
                                    />
                                }
                                <p className={(messsages[objKeys].sender == chatIDnumber ? 'bg-blue-100' : 'bg-gray-100 max-w-[320px] ') + ' max-w-2/3 px-4 py-2 border rounded-lg'}>
                                    {messsages[objKeys].message}
                                    {messsages ? <div ref={autoScroller}> </div> : null}
                                </p>
                            </div>
                        ) : firstMessage ? firstMessage : <LoaderIcon></LoaderIcon>}
                    </div>
                    <div className="w-full text-sm flex items-start px-6 bg-white pb-2">
                        {typing ? (typing.isTyping ?
                            <div className="flex items-center justify-start w-full">
                                {receiver.avater ?
                                    <img src={receiver.avater} alt={receiver.fname} className="w-10 h-10 rounded-full mr-2 z-10" /> :
                                    <img
                                        src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais'
                                        className="w-8 aspect-square rounded-full mr-2 z-10"
                                    />
                                }
                                <div className="flex items-center justify-start w-full">
                                    <span className="inline-block text-blue-900 z-10 ml-2"> 
                                    {receiver.fname} {typing.typeContent} {typing.typeContent.length >= 20 ? '...' : ''} 
                                    </span>
                                    <img className="w-16 -mx-3" src="https://i.pinimg.com/originals/90/ad/7c/90ad7c4dac1bceb3359b732146062441.gif" alt="" />
                                </div>
                            </div> : null) : ' '}
                    </div>
                    <form className=" bg-gray-100 items-center justify-between sticky bottom-0 p-0.5 messageInputShadow text-xl text-blue-800">
                        <div className="flex items-center justify-between">
                            <FontAwesomeIcon icon={faLink} className="p-3"></FontAwesomeIcon>
                            <textarea
                                className="ml-1 resize-none border block w-full h-10 rounded-full px-4 pt-1 focus:outline-none text-[16px] "
                                value={messageContent}
                                onFocus={(e) => { typingStart(e) }}
                                onBlur={typingEnd}
                                onChange={(e) => handleInputChange(e)}
                                onKeyDown={handleKeyDown}
                                required={true}go
                                placeholder="Type a message...">
                            </textarea>
                            <FontAwesomeIcon icon={faFaceSmile} className="p-4"></FontAwesomeIcon>
                            <button className="p-3 aspect-square hover:bg-white rounded-lg hover:shadow-md  " onClick={(e) => send(e)}> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                        </div>
                    </form>
                </div> :
                <LoaderIcon className='absolute top-0 left-0 h-full' customClasses={'w-full h-full'}> </LoaderIcon>}

        </div>
    )
}

export default ChatView