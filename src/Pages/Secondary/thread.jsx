import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { useEffect, useRef, useState } from "react";
import { child, get, onValue, push, ref, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import TimeStamp from "../../Common/TimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


const ChatView = () => {
    const chatID = useParams();
    const chatIDnumber = chatID['chatID']
    let [receiver, setReceiver] = useState()
    let [messageContent, setMessageContent] = useState('')
    const [messsages, setMessages] = useState([])
    const [firstMessage, setFirstMessge] = useState('')

    const autoScroller = useRef(null)

    let genarateThreadID = (uid1, uid2) => {
        let sortedUID = [uid1, uid2].sort()
        let combinedUID = sortedUID.join('')
        return combinedUID.slice(0, 6)
    }
    let threadID = genarateThreadID(auth.currentUser.uid, chatIDnumber)
    let message = {
        sender: auth.currentUser.uid,
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
    }, [])


    useEffect(() => {
        if(autoScroller.current){
            autoScroller.current.scrollIntoView({ behavior: "smooth" })
        }
    },[messsages,[]])
    
    let send = (e) => {
        e.preventDefault()
        let newMessageID = push(ref(database, '/chats')).key
        set(ref(database, '/chats/' + threadID + "/" + newMessageID), message)

        let lastMessage = {
            lastMessageTime: TimeStamp(),
            lastSender : auth.currentUser.uid,
            lastMessage: messageContent
        }
        set(ref(database, '/threadList/'+ auth.currentUser.uid + '/' + threadID),{...lastMessage , receiver: chatIDnumber})
        set(ref(database, '/threadList/'+ chatIDnumber + '/' + threadID),{...lastMessage, receiver: auth.currentUser.uid})
        setMessageContent('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(e);
        }
    };
 
    return (
        <div className="h-full bg-red-700">
            {receiver ? <div className="flex flex-col h-fit bg-green-200 justify-between ">
                <BackButton titlebarText={"Messaging to " + receiver.fname } buttonLink={links.home.inbox.chatLayout} />

                <div className=" bg-gray-50 " >
                    {messsages ? Object.keys(messsages).map((objKeys) =>
                        <div className={messsages[objKeys].sender == chatIDnumber ? '' : 'text-right'} key={objKeys}>
                            <p className="px-4 py-2 m-2 rounded-sm inline-block bg-slate-200">{messsages[objKeys].message}</p>
                        </div>
                    ) : firstMessage ? firstMessage : 'Loading...'}
                    {messsages ? <div ref={autoScroller}></div> :  null }
                </div>
                <form className="flex bg-gray-200 items-center justify-between sticky bottom-0">
                    <textarea className="resize-none border w-full" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} onKeyDown={handleKeyDown}></textarea>
                    <button className="p-4" onClick={(e)=> send(e)}> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                </form>
            </div> : <div className="flex items-center justify-center w-full p-6 text center"> Loading image will go here </div>}

        </div>
    )
}

export default ChatView