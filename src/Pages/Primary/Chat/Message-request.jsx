import { get, ref, onValue, child } from "firebase/database"
import { useEffect, useState } from "react"
import { auth, database } from "../../../../firebase"
import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars"
const MessageRequest = () => {
    let [requestList, setRequestList] = useState(null);
    useEffect(() => {

        onValue(ref(database, `/requests/${auth.currentUser.uid}`), (snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(data[i])
            }
            getRequestorInfo(temp).then((info) => {
                setRequestList(info)
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

    const handleDecline = (e, requestorUID) => {
        e.preventDefault()
        console.log("Declining request for ", requestorUID);
        // Code to decline request will go here
        // just remove the request from request node so that this request don't appear in frontend again 
    }
    const handleAccept = (e, requestorUID) => {
        e.preventDefault()
        console.log("Accepting request for ", requestorUID);
        // code to Accept request will go here.
        // call firebase funcion to make a new node named 'connection' in the root of rtdb .
        // In this node there will be a child node for each user conncetions . childe node name will be the uid of 
        // currently logged in user id.
        // under that child node there will be another childe node that will store all the uid of the user who are 
        // connected with currently logged in user. 

        // After updating connection nodes , remove the request node so that it does not show in request list again.
    }


    return (
        <div>
            <h1 className="p-4 my-4 text-center bg-gray-100" >Message Requests <br /> <span className="text-sm"> (Accept and Decline is not functional yet!)</span> </h1>
            <div className="bg-gray-50 border p-2 flex flex-col gap-2">
                {requestList ?
                    (requestList.length === 0 ?
                        <p>No request!</p> :
                        requestList.map((request, index) =>
                            <div key={index} className=" flex flex-col gap-4 border-b p-4">
                                <Link className="bg-white border p-4 w-full hover:shadow-md flex space-between justify-center" to={links.sec.modOthers + request.requestorUID}>

                                    {request.fname + ' ' + request.lname}

                                </Link>
                                <div>
                                    <button onClick={(e) => handleDecline(e, request.requestorUID)} className="bg-red-50 text-red-900 hover:bg-red-200 p-2"> Decline </button>
                                    <button onClick={(e)=> handleAccept(e , request.requestorUID)} className="bg-green-50 text-green-900 hover:bg-green-200 p-2"> Accept </button>
                                </div>
                            </div>

                        )) :
                    'loading'}
            </div>


        </div>
    )
}
export default MessageRequest

