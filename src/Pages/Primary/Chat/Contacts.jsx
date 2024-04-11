import { onValue, ref, get , child } from "firebase/database";
import { useEffect, useState } from "react";
import { database, auth } from "../../../../firebase";
import { Link } from "react-router-dom";
import { links } from "../../../assets/Vars";

const Contacts = () => {
    let [connectionList, setConnectionList] = useState(null);
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
                    if (data) {
                        connectionInfoList.push({ ...data, uid: connection });
                    }
                })
            }
            return connectionInfoList
        }
    },[])
  return(
     <div className="mt-2">
        {connectionList ? connectionList.map(connection => (
          <div className="p-4 bg-gray-50 hover:bg-gray-100 " key={connection.uid}>
            <Link to={links.sec.modOthers+ connection.uid}> {connection.fname} {connection.lname} </Link>
          </div>
        )) : "Loading..."}
     </div>
  )
}

export default Contacts