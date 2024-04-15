import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { child, get, onValue, ref } from "firebase/database";
import { auth, database } from "../../../../firebase";

//under development
const Inbox = () => {

    let [threadList, setThreadList] = useState(null)
    useEffect(() => {
        onValue(ref(database, `/threadList/${localStorage.getItem('currentUser')}`), (snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(data[i]);
            }
            getThreadList(temp).then((info) => {
                setThreadList(info)
                console.log(info);
            })
        })
        async function getThreadList(threadListObject) {
            let threadListArray = []
            for (let thread of threadListObject) {
                await get(child(ref(database), `/users/${thread['receiver']}/info`)).then((snapshot) => {
                    const data = snapshot.val();
                    threadListArray.push({ ...data, uid: thread['receiver'] , lastmessage: thread['lastMessage'] ,lastMessageTime: thread['lastMessageTime'] , lastSender : thread['lastSender']})
                })
            }
            return threadListArray
        }
    }, [])
    return (
        <div>
            <h1> Messaging page </h1>
            <div className="flex flex-col p-4 ">
                {threadList ? Object.keys(threadList).map((value, index) =>
                    <div key={index} className="p-4 bg-gray-100">
                        <Link to={links.sec.modInbox + threadList[value].uid}>
                            <p>{threadList[value].fname}</p>
                            <p className="text-sm">{threadList[value].lastSender == auth.currentUser.uid ? 'You:': threadList[value].fname + ':' } {threadList[value].lastmessage} @ {threadList[value].lastMessageTime}</p>
                        </Link>
                    </div>
                ) : 'Loading...'}
            </div>
        </div>
    )
}

export default Inbox