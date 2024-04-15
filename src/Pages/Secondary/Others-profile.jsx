/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { child, get, onValue, ref, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import { useEffect, useState } from "react";
import TimeStamp from "../../Common/TimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import image from "../../assets/img/profile-bg.jpg"

import { handleAccept, handleDecline, handleDisconnect } from "../../Common/Accept&Decline";
// prototype design availabel
//under development 

const OthersProfile = () => {
    const uid = useParams();
    const uidnumber = uid['uid']
    const [userData, setUserData] = useState('')
    let [isConnected, setIsConnected] = useState(false)
    let [isRequestPending, setIsRequestPending] = useState(false)

    let [requestHandle, setRequestHandle] = useState(false)
    useEffect(() => {
        get(child(ref(database), `/users/${uidnumber}/info`)).then((snapshot) => {
            let data = snapshot.val()
            setUserData(data)
        })
        let currentUser = localStorage.getItem('currentUser')

        // check if currently loggin in user has request from this user
        onValue(ref(database, `/connections/${currentUser}/${uidnumber}`), (snapshot) => {
            if (snapshot.exists()) {
                setIsConnected(true)
            }
            else {
                setIsConnected(false)
            }
        })

        // check if currently loggin in user sent request to this user
        let slice = localStorage.getItem('currentUser').slice(0, 6)
        let a = `/requests/${uidnumber}/${slice}`
        onValue(ref(database, a), (snapshot) => {
            if (snapshot.exists()) {
                setIsRequestPending(true)
                console.log('already requested');
            }
            else {
                setIsRequestPending(false)
                console.log('Not requested yet');
            }
        })


        // check if this user sent request to currently logged in user . if yes show accept and decline button  else show connect button with connect function 
        let slice2 = uidnumber.slice(0, 6)
        onValue(ref(database, `/requests/${auth.currentUser.uid}/${slice2}`), (snapshot) => {
            if (snapshot.exists()) {
                setRequestHandle(true)
            }
            else {
                setRequestHandle(false)
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

    let InProfileRequestHandle = ({ ruid }) => {
        return (
            <div>
                <button onClick={(e) => handleDecline(e, ruid)} className="bg-red-50 text-red-900 hover:bg-red-200 p-2"> Decline </button>
                <button onClick={(e) => handleAccept(e, ruid)} className="bg-green-50 text-green-900 hover:bg-green-200 p-2"> Accept </button>
            </div>
        )
    }

   
    return (
        <div>
            <BackButton buttonLink={links.home.peoples.peopleLayout} titlebarText={`${userData.fname}'s Profile`} />
            <div className="p-6">
                <div className="flex items-center bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url(" + image + ")" }}>
                    <div className=" w-20 h-20 mx-3 my-3 border rounded-full flex justify-center items-center bg-white">
                        {
                            userData.avater? <img src={userData.avater} className="w-full h-full rounded-full"/> : <FontAwesomeIcon className="text-6xl" icon={faUser} />
                        } 
                    </div>
                    <div className="ml-3">
                        <h1 className="font-medium text-xl ">{userData.fname}</h1>
                        <p className="font-thin text-sm text-center">{userData.email}</p>
                    </div>
                </div>
                <div className="p-2 my-2 flex justify-start gap-2">
                    {
                        isConnected ?
                            <div className="flex items-center justify-between p-2 gap-2">
                                <Link className=" p-4 bg-gray-100" to={links.sec.modInbox + uidnumber}> Message </Link>
                                <button className='p-4 bg-gray-100' onClick={(e) => handleDisconnect(e , uidnumber)}> Disconnect </button>
                            </div>
                            :
                            (isRequestPending ?
                                'Requested' :
                                (requestHandle ?
                                    <InProfileRequestHandle ruid={uidnumber} /> :
                                    <button className="p-4 mt-2 " onClick={(e) => sendRequest(e)}> Connect </button>))
                    }

                </div>
            </div>
        </div>
    )
}

export default OthersProfile