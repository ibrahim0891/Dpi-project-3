import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars"
import { useEffect, useState } from "react"
import { child, get, ref } from "firebase/database"
import { auth, database } from "../../../../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import LoaderIcon from "../../../Common/Loader-icon"
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
            <form className="bg-gray-100 mt-3 relative border-2 rounded-md">
              <input type="text" className="p-2 w-full focus:outline-1 focus:outline-gray-300" /> <span className="absolute top-0 right-0 p-2 px-3 border" > <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon> </span>  
            </form>
            <h1 className="text-2xl font-semibold my-3"> See who else here: </h1>
            {otherUser ? otherUser.map((value) =>
                <Link className="border-b-1 p-4 hover:bg-gray-100 flex items-center gap-3" key={value.uid} to={links.sec.modOthers + value.uid}>
                    {value.info.avater ? <img className="h-8 rounded-md aspect-square " src={value.info.avater} /> : <img src='https://pic.onlinewebfonts.com/thumbnails/icons_149464.svg' className="h-8 aspect-square rounded-md " alt="" />}
                    <div>
                        <p> {value.info.fname} </p>
                        <p className="text-xs"> {value.info.email} </p>
                    </div>

                </Link>
            ) : <LoaderIcon customClasses='mt-16 static'></LoaderIcon>}
        </div>
    )
}

export default Others