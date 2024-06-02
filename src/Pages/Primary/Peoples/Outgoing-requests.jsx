import { useEffect, useState } from "react"
import getUserInfoFromUIDS from "../../../Common/getUserInfoFromUIDs"
import { child, get, onValue, ref, set, update } from "firebase/database"
import { auth, database } from "../../../../firebase"
import LoaderIcon from "../../../Common/Loader-icon"



let OutgoingRequests = () => {
    let [loadUsersData, setLoadUsersData] = useState([]);
    useEffect(() => {
        onValue(ref(database, `/sentRequestList/${auth.currentUser.uid}`), (snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(data[i])
            }
            getUsersInfo(temp).then((data) => {
                console.log(data);
                setLoadUsersData(data)
            })
        })

        async function getUsersInfo(uids) {
            let outputArray = []
            for (let uid of uids) {
                console.log(uid);
                await get(child(ref(database), `/users/${uid}/info`)).then((snapshot) => {
                    let data = snapshot.val()
                    if (data) {
                        outputArray.push({ ...data, uid: uid });
                    }
                })
            }
            return outputArray
        }

    }, [])


    let createRequestUID = auth.currentUser.uid.slice(0, 6)
    const deleteRequest = (e, uidnumber) => {
        e.preventDefault()
        set(ref(database, `/requests/${uidnumber}/${createRequestUID}`), null).then(() => { })
        update(ref(database, `/sentRequestList/${auth.currentUser.uid}`), {
            [uidnumber.slice(0, 4)]: null
        })
    }
    return (
        <div className="bg-gray-100 p-4">
            {loadUsersData ?
                <div>
                    <div className="py-6 text-xl font-thin">
                        <h2> {loadUsersData.length == 0 ? " You have not sent request to anyone " : 'You have sent request to these peoples! '}</h2>
                    </div>
                    {
                        loadUsersData.map((user, index) =>
                            <div key={index} className={"flex items-center space-x-4 mb-4 "}>
                                <div className="flex gap-4 items-center justify-start">
                                    <img src={user.avater} className="h-10 aspect-square rounded-md" alt="" />
                                    <div>
                                        <p>{user.fname}</p>
                                        <button onClick={(e)=>{ deleteRequest(e,user.uid) }}> Cencel request</button>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div> : <LoaderIcon customClasses='mt-16 static'></LoaderIcon>}
        </div>

    )
}

export default OutgoingRequests