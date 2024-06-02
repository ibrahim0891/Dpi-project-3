import { onValue, ref, get, child } from "firebase/database";
import { useEffect, useState } from "react";
import { database, auth } from "../../../../firebase";
import { Link } from "react-router-dom";
import { links } from "../../../assets/Vars";
import LoaderIcon from "../../../Common/Loader-icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Contacts = () => {
    let [connectionList, setConnectionList] = useState(null);
    const [isActive, setIsActive] = useState(false)
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
                <h2> {connectionList == null || connectionList.length == 0 ? "Apni ekhono karo sathe connected non." : 'Apnar sathe connected sobaike dekhon ek jaygay!! '}</h2>
            </div>
            {connectionList ? connectionList.map(connection => (
                <div className="p-4 bg-gray-50 hover:bg-gray-200 flex items-center justify-between gap-4 " key={connection.uid}>
                    {connection.avater ? <img src={connection.avater} className="h-8 aspect-square rounded-md " alt="" /> : <img src='https://pic.onlinewebfonts.com/thumbnails/icons_149464.svg' className="h-8 aspect-square rounded-md " alt="" />}
                    <Link className="w-full" to={links.sec.modOthers + connection.uid} >
                        <p className="w-full text-md text-left" > {connection.fname} {connection.lname} </p>
                        <span className="text-xs"> {connection.activeStatus.online == 'Active now' ? null :  connection.activeStatus.lastActive}</span>
                    </Link>
                    <span className="text-sm"> {connection.activeStatus.online == 'Active now' ? <div className="w-2 h-2 rounded bg-green-400 ml-2"> </div> : <div className="w-2 h-2 rounded bg-red-400 ml-2"> </div>  }</span>
                </div>
            )) : <LoaderIcon customClasses='mt-16 static w-full h-full'></LoaderIcon>}
        </div>
    )
}

export default Contacts     