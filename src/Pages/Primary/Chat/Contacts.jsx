 import { onValue, ref, get, child } from "firebase/database";
import { useEffect, useState } from "react";
import { database, auth } from "../../../../firebase";
import { Link } from "react-router-dom";
import { links } from "../../../assets/Vars";
import LoaderIcon from "../../../Common/Loader-icon";

const Contacts = () => {
    let [connectionList, setConnectionList] = useState(null);
    const [isActive , setIsActive] = useState(false)
    useEffect(() => {
        onValue(ref(database, `/connections/${auth.currentUser.uid}`), (snapshot) => {
            let data = snapshot.val()
            let temp = []
            for (let i in data) {
                temp.push(i)
            }

            getConnectionList(temp).then((info) => {
                setConnectionList(info)
            })
        })
        async function getConnectionList(connections) {
            let connectionInfoList = [] 
            for (let connection of connections) {
                await get(child(ref(database), `/users/${connection}/info`)).then((snapshot) => {
                    const data = snapshot.val();
                    console.log(data);
                    if (data) {
                        connectionInfoList.push({ ...data, uid: connection });
                    }
                })
            
            }
            console.log(connectionInfoList);
            return connectionInfoList
        }

    }, [])
    return (
        <div className="mt-2">
            <div className="py-2 text-xl font-thin">
                <h2> { connectionList == null || connectionList.length == 0  ? "Apni ekhono karo sathe connected non." : 'Apnar sathe connected sobaike dekhon ek jaygay!! '}</h2>
            </div>
            {connectionList ? connectionList.map(connection => (
                <div className="p-4 bg-gray-50 hover:bg-gray-100 flex " key={connection.uid}>
                    <Link  className="w-full" to={links.sec.modOthers + connection.uid}> {connection.fname} {connection.lname} </Link> 
                    {/* <span className="text-sm"> {connection.activeStatus.online =='Active now' ? <div className="w-2 h-2 rounded bg-green-400 ml-2"> </div>: 'Last online: ' +  connection.activeStatus.lastActive }</span> */}
                </div>                                                                                                                                              
            )) : <LoaderIcon customClasses='mt-16 static'></LoaderIcon>}
        </div>
    )
}

export default Contacts     