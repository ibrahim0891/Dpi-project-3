import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { useEffect, useRef, useState } from "react";
import { child, get, onValue, push, ref, runTransaction, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import TimeStamp from "../../Common/TimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
        if(input.length == 1) {
            let typingIndicatorData = {
                typer: localStorage.getItem('currentUser'),
                isTyping: true,
                typeContent: 'is thinking...'
            }
            set(ref(database, `/typingState/${threadID}/${localStorage.getItem('currentUser').slice(0, 4)}`), typingIndicatorData)
        }
        if(input.length > 5 &&  input.length <= 20) {
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
                    <BackButton titlebarText={"Messaging to " + receiver.fname} buttonLink={links.home.inbox.chatLayout} additionalInfo={isActive && isActive['online']} />
                    <div className=" bg-gray-50 h-full flex-1 overflow-auto" >
                        {messsages ? Object.keys(messsages).map((objKeys) =>
                            <div className={messsages[objKeys].sender == chatIDnumber ? '' : 'text-right'} key={objKeys}>
                                <p className="px-4 py-2 m-2 rounded-sm inline-block bg-slate-200">{messsages[objKeys].message}

                                    {messsages ? <div ref={autoScroller}> </div> : null}
                                </p>
                            </div>
                        ) : firstMessage ? firstMessage : <LoaderIcon></LoaderIcon>}
                    </div>
                    <form className=" bg-gray-200 items-center justify-between sticky bottom-0 ">
                        <div className="w-full text-sm flex items-center bg-white ">
                            {typing ? (typing.isTyping ?
                                <div className="flex items-center justify-center w-full">
                                    <img className="w-16 -mr-3" src="https://i.pinimg.com/originals/b4/4e/22/b44e229598a8bdb7f2f432f246fb0813.gif" alt="" />
                                    <span className="inline-block  "> {receiver.fname} {typing.typeContent}{typing.typeContent.length >=20? '...': ''} </span>
                                </div> : null) : ' '}
                        </div>
                        <div className="flex items-center justify-between">
                            <FontAwesomeIcon icon={faLink} className="py-4 px-2"></FontAwesomeIcon>
                            <textarea
                                className="ml-1 resize-none border w-full"
                                value={messageContent}
                                onFocus={(e) => { typingStart(e) }}
                                onBlur={typingEnd}
                                onChange={(e) => handleInputChange(e)}
                                onKeyDown={handleKeyDown}
                                required={true}>
                            </textarea>
                            <FontAwesomeIcon icon={faFaceSmile} className="px-2"></FontAwesomeIcon>
                            <button className="py-4 px-2" onClick={(e) => send(e)}> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                        </div>
                    </form>
                </div> :
                <LoaderIcon className='absolute top-0 left-0 h-full' customClasses={'w-full h-full'}> </LoaderIcon>}

        </div>
    )
}

export default ChatView