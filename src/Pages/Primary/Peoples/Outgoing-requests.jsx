import { useEffect, useState } from "react"
import getUserInfoFromUIDS from "../../../Common/getUserInfoFromUIDs"
import { child, get, ref } from "firebase/database"
import { auth, database } from "../../../../firebase"



let OutgoingRequests = () => {
    let [loadUsersData, setLoadUsersData] = useState([]);
    useEffect(() => {
        get(child(ref(database), `/sentRequestList/${auth.currentUser.uid}`)).then((snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(data[i])
            }
            getUsersInfo(temp).then((data) => {
                setLoadUsersData(data)
            })
        })
        async function getUsersInfo(uids) {
            let outputArray = []
            for (let uid in uids) {
                await get(child(ref(database), `/users/${uid}/info`)).then((snapshot) => {
                    let data = snapshot.val()
                    if (data){
                        outputArray.push(data)
                    }
                })
            }
            return outputArray
        }
        console.log(loadUsersData);
        //check if this outp out a array with objecct . if yes take farther actions and if no fix the issues in the funtino abave
    }, [])
    return (
        <div>

        </div>
    )
}

export default OutgoingRequests