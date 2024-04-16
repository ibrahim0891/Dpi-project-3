import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { useEffect, useRef, useState } from "react";
import { child, get, onValue, push, ref, runTransaction, set } from "firebase/database";
import { database } from "../../../firebase";
import TimeStamp from "../../Common/TimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";


const ChatView = () => {
    const chatID = useParams();
    const chatIDnumber = chatID['chatID']
    let [receiver, setReceiver] = useState()
    let [messageContent, setMessageContent] = useState('')
    const [messsages, setMessages] = useState([])
    const [firstMessage, setFirstMessge] = useState('')

    const [isActive , setIsActive] = useState(false)
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
        onValue(ref(database,'/users/'+chatIDnumber+'/info/activeStatus'),(snapshot) => {
          setIsActive(snapshot.val())
        })
    }, [])


    useEffect(() => {
        if(autoScroller.current){
            autoScroller.current.scrollIntoView({ behavior: "smooth" })
        }
    },[messsages,[]])
    
    let send = (e) => {
        e.preventDefault()
        if (messageContent !== ''){
            let newMessageID = push(ref(database, '/chats')).key
            set(ref(database, '/chats/' + threadID + "/" + newMessageID), message)
            let lastMessage = {
            lastMessageTime: TimeStamp(),
            lastSender : currentUID,
            lastMessage: messageContent
        }
        set(ref(database, '/threadList/'+ currentUID + '/' + threadID),{...lastMessage , receiver: chatIDnumber})
        set(ref(database, '/threadList/'+ chatIDnumber + '/' + threadID),{...lastMessage, receiver: currentUID})
        setMessageContent('')
        }else{
            alert('Please enter a message to send')
            return null
        }
        
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(e);
        }
    };
 
    return (
        <div className="h-screen bg-red-700">
            {receiver ? <div className="flex flex-col bg-green-200 justify-between h-full ">
                <BackButton titlebarText={"Messaging to " + receiver.fname } buttonLink={links.home.inbox.chatLayout} additionalInfo={isActive && isActive['online']}/>
                <div className=" bg-gray-50 h-full " >
                    {messsages ? Object.keys(messsages).map((objKeys) =>
                        <div className={messsages[objKeys].sender == chatIDnumber ? '' : 'text-right'} key={objKeys}>
                            <p className="px-4 py-2 m-2 rounded-sm inline-block bg-slate-200">{messsages[objKeys].message}
                            
                            {messsages ? <div ref={autoScroller}> </div> :  null }
                            </p>
                        </div>
                    ) : firstMessage ? firstMessage : 'Loading...'}
                </div>
                <form className="flex bg-gray-200 items-center justify-between px-2 sticky bottom-0 ">
                    <FontAwesomeIcon icon={faLink} className="py-4 px-2"></FontAwesomeIcon>
                    <textarea className="ml-1 resize-none border w-full" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} onKeyDown={handleKeyDown} required={true}></textarea>
                    <FontAwesomeIcon icon={faFaceSmile} className="px-2"></FontAwesomeIcon>
                    <button className="py-4 px-2" onClick={(e)=> send(e)}> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                </form>
            </div> : <div className="flex items-center justify-center w-full p-6 text center"> Loading image will go here </div>}

        </div>
    )
}

export default ChatView