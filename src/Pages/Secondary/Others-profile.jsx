import { useParams, Link } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { child, get, ref, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import { useEffect, useState } from "react";
import TimeStamp from "../../Common/TimeStamp";


// prototype design availabel
//under development 

const OthersProfile = () => {
    const uid = useParams();
    const uidnumber = uid['uid']
    const [userData, setUserData] = useState('')


    useEffect(() => {
        get(child(ref(database), `/users/${uidnumber}/info`)).then((snapshot) => {
            let data = snapshot.val()
            setUserData(data) 
        })
    }, [])

    const sendRequest = (e) => {
      e.preventDefault()
      let createRequestUID = auth.currentUser.uid.slice(0,6)
      set(ref(database,`/requests/${uidnumber}/${createRequestUID}`),{
        requestorUID : auth.currentUser.uid,
        timeStamp : TimeStamp(),
        status: 'pending'
      }).then(() => {
        console.log('Request sent');
      })
    }
    return (
        <div>
            <BackButton buttonLink={`/others`} buttonText={'Back'} />
            <div className="p-6">
                <h1 className=""> {userData.fname} </h1>
                <p className="">{userData.email} </p>
                {/* <Link
                    className=" "
                    to={links.sec.modInbox + uidnumber}>
                    Message {userData.fname}
                </Link>  */}

                <button onClick={(e)=>sendRequest(e)}> Connect </button>
            </div>
        </div>
    )
}

export default OthersProfile