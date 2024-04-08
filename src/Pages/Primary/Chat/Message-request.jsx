import { get, ref, onValue, child } from "firebase/database"
import { useEffect, useState } from "react"
import { auth, database } from "../../../../firebase"
import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars"
const MessageRequest = () => {
    let [requestList, setRequestList] = useState(null);
    let [requestorInfo, setRequestorInfo] = useState([]);
    useEffect(() => {

        onValue(ref(database, `/requests/${auth.currentUser.uid}`), (snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                -               temp.push(data[i])
            }
            getRequestorInfo(temp).then((info) => {
                setRequestList(info)
                console.log(info);
            })
        })

        async function getRequestorInfo(requests) {
            let requestorInfoList = []
            for (let request of requests) {
                await get(child(ref(database), `/users/${request.requestorUID}/info`)).then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        requestorInfoList.push({ ...data, requestorUID: request.requestorUID });
                    }
                })
            }
            return requestorInfoList
        }

    }, [])


    return (
        <div>
            <h1>Message Requests</h1>
            <div className="bg-gray-50 border p-2 flex gap-2">
                {requestList ?
                    (requestList.length === 0 ?
                        <p>No request!</p> :
                        requestList.map((request, index) =>
                            <Link key={index} className="bg-white border p-4 block w-full hover:shadow-md" to={links.sec.modOthers + request.requestorUID}> {request.fname + ' ' + request.lname}</Link>
                        )) :
                    'loading'}
            </div>


        </div>
    )
}
export default MessageRequest

