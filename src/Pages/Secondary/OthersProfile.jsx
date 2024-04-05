import { useParams, Link } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { child, get, ref } from "firebase/database";
import { database } from "../../../firebase";
import { useEffect, useState } from "react";


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
    return (
        <div>
            <BackButton buttonLink={`/others`} buttonText={'Back'} />
            <div className="p-6">
                <h1 className=""> {userData.fname} </h1>
                <p className="">{userData.email} </p>
                <Link
                    className=" "
                    to={links.sec.modInbox + uidnumber}>
                    Message {userData.fname}
                </Link> 
            </div>
        </div>
    )
}

export default OthersProfile