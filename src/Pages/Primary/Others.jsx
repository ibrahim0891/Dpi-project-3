import { Link } from "react-router-dom"
import { links } from "../../assets/Vars"
import { useEffect, useState } from "react"
import { child, get, ref } from "firebase/database"
import { auth, database } from "../../../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
//Under development
// prototype design availabel

const Others = () => {
    const [otherUser, setOtherUser] = useState(null);
    useEffect(() => {

        get(child(ref(database), '/users')).then((snapshot) => {
            let array = [];
            let data = snapshot.val()
            for (let key in data) {
                if (key !== auth.currentUser.uid) {
                    array.push({ ...data[key], uid: key });
                }
            }
            setOtherUser(array);

        }).catch(() => {
            setOtherUser(null);
        });
        // get(child(ref(database),'/users'))
        // .then((snapshot) => {
        //   console.log(snapshot.val());
        // })
    }, []);
    return (
        <div className="">
            <h1 className="text-2xl font-semibold mb-2"> See who else here: </h1>
            {otherUser ? otherUser.map((value) =>
                <Link className="border-b-1 p-4 hover:bg-gray-100 flex items-center" key={value.uid} to={links.sec.modOthers + value.uid}><div className="w-8 h-8 mr-2 border rounded-full flex justify-center items-center overflow-hidden">
                    <div>{console.log(value)}</div>
                   {value.info.avater? <img src={value.info.avater}/> : <FontAwesomeIcon className="text-2xl " icon={faUser} />} 
                </div> {value.info.fname} <div className="w-2 h-2 rounded bg-amber-400 ml-2"> </div>
                </Link>
            ) : 'Loading...'}
        </div>
    )
}

export default Others