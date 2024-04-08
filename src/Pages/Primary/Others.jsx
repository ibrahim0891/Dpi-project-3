import { Link } from "react-router-dom"
import { links } from "../../assets/Vars"
import { useEffect, useState } from "react"
import { child, get, ref } from "firebase/database"
import { auth, database } from "../../../firebase"

//Under development
// prototype design availabel

const Others = () => { 
    const [otherUser, setOtherUser] = useState(null);
    useEffect(() => {
 
        get(child(ref(database),'/users')).then((snapshot) => {
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
        {otherUser? otherUser.map((value) => 
          <Link className="block py-2 px-2 text-xl font-medium my-2 bg-gray-200 hover:bg-gray-100" key={value.uid} to={links.sec.modOthers + value.uid}> {value.info.fname}</Link>
        ): 'Loading...' }
        </div>
    )
}

export default Others