import { useParams, Link } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { child, get, ref, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import { useEffect, useState } from "react";
import TimeStamp from "../../Common/TimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import image from "../../assets/img/profile-bg.jpg"

// prototype design availabel
//under development 

const OthersProfile = () => {
    const uid = useParams();
    const uidnumber = uid['uid']
    const [userData, setUserData] = useState('')
    let [isConnected , setIsConnected] = useState(false)
    let [isRequestPending , setIsRequestPending] = useState(false)

    useEffect(() => {
        get(child(ref(database), `/users/${uidnumber}/info`)).then((snapshot) => {
            let data = snapshot.val()
            setUserData(data)
        })
        let currentUser = localStorage.getItem('currentUser')
        get(child(ref(database),`/connections/${currentUser}/${uidnumber}`)).then((snapshot) => {
          if(snapshot.exists()){
             setIsConnected(true)
          }
          else{
            console.log('error');
          }
        })
        get(child(ref(database),`/requests/${currentUser}/${uidnumber.slice(0,6)}`)).then((snapshot) => {
          if(snapshot.exists()){
            //  setIsRequestPending(true)
            console.log(snapshot.val());
          }
          else{
            console.log('error');
          }
        })
    }, [])

    const sendRequest = (e) => {
        e.preventDefault()
        let createRequestUID = auth.currentUser.uid.slice(0, 6)
        set(ref(database, `/requests/${uidnumber}/${createRequestUID}`), {
            requestorUID: auth.currentUser.uid,
            timeStamp: TimeStamp(),
            status: 'pending'
        }).then(() => {
            console.log('Request sent');
        })
    }
    return (
        <div>
            <BackButton buttonLink={`/others`} buttonText={'Back'} />
            <div className="p-6">
                <div className="flex items-center bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url(" + image + ")" }}>
                    <div className=" w-20 h-20 mx-3 my-3 border rounded-full flex justify-center items-center bg-white">
                        <FontAwesomeIcon className="text-6xl " icon={faUser} />
                    </div>
                    <div className="ml-3">
                        <h1 className="font-medium text-xl ">{userData.fname}</h1>
                        <p className="font-thin text-sm text-center">{userData.email}</p>
                    </div>
                </div>
                <div className="p-2 my-2 flex justify-start gap-2">
                    {
                        isConnected ? <Link
                        className=" "
                        to={links.sec.modInbox + uidnumber}>
                        Message
                    </Link> : isRequestPending? 'Requested' : <button onClick={(e) => sendRequest(e)}> Connect </button> 
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}

export default OthersProfile