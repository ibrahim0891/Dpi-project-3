import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars" 
import { useEffect, useState } from "react";
import { child, get, onValue, ref } from "firebase/database";
import { auth, database } from "../../../../firebase";
import LoaderIcon from "../../../Common/Loader-icon"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
//under development
const Inbox = () => {

    let [threadList, setThreadList] = useState(null)
    useEffect(() => {
        onValue(ref(database, `/threadList/${localStorage.getItem('currentUser')}`), async (snapshot) => { //currentUser holds UID
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(data[i]);
            }
            const info = await getThreadList(temp);
            // Sort thread list by last message time (descending)
            const sortedInfo = info.sort((a, b) => {
                const dateA = new Date(a.lastMessageTime);
                const dateB = new Date(b.lastMessageTime);
                return dateB - dateA;
            });
            setThreadList(sortedInfo);
        })
        async function getThreadList(threadListObject) {
            let threadListArray = []
            for (let thread of threadListObject) {
                await get(child(ref(database), `/users/${thread['receiver']}/info`)).then((snapshot) => {
                    const data = snapshot.val();
                    threadListArray.push({ ...data, uid: thread['receiver'], lastmessage: thread['lastMessage'], lastMessageTime: thread['lastMessageTime'], lastSender: thread['lastSender'] })
                })
            }
            return threadListArray
        }
    }, [])
    return (
        <div className="h-full">
            <div className="py-1 text-xl font-thin text-center">
                <FontAwesomeIcon icon={faComment} className="text-2xl text-blue-700" ></FontAwesomeIcon>
                <h2> {threadList == null || threadList.length == 0 ? " Apni ekhono kauke message pathan ni " : 'Apnar bondhur sathe chat korun ekhane! '}</h2>
            </div>
            <div className="flex flex-col p-4 relative ">
                {threadList ? Object.keys(threadList).map((value, index) =>
                    <div key={index} className="flex items-center gap-4 my-4">
                        <div className=" relative">
                            <img className="w-12 aspect-square rounded-md" src={threadList[value].avater} alt="" />
                            {threadList[value].activeStatus.online == 'Active now' ?
                                <div className="w-3 aspect-square bg-lime-400 ring-2 ring-white rounded-full absolute bottom-0 right-0"></div> :
                                <div className="w-3 aspect-square bg-red-500 ring-2 ring-white rounded-full absolute bottom-0 right-0"></div>
                            }
                        </div>
                        <Link to={links.sec.modInbox + threadList[value].uid}>
                            <p className="text-lg font-semibold pb-1">{threadList[value].fname}</p>
                            <p className="text-xs">
                                <span className="font-bold"> {threadList[value].lastSender == auth.currentUser.uid ? 'You: ' : threadList[value].fname + ': '} </span>
                                {threadList[value].lastmessage.length > 12 ? threadList[value].lastmessage.slice(0, 6) + '...' : threadList[value].lastmessage} -
                                <span className='italic'> {threadList[value].lastMessageTime} </span>
                            </p>
                        </Link>
                    </div>
                ) : <LoaderIcon customClasses='mt-16 static w-full h-full'></LoaderIcon>}
            </div>
        </div>
    )
}

export default Inbox