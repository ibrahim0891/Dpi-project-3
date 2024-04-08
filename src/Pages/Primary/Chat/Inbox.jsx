import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//under development
const Inbox = () => {
    return (
        <div>
            <h1> Messaging page </h1>
            <div className="flex flex-col px-4 py-2 ">
                <Link className="p-4 flex items-center" to={links.sec.modInbox + 1}><div className="w-8 h-8 mr-2 border rounded-full flex justify-center items-center overflow-hidden"><FontAwesomeIcon className="text-2xl " icon={faUser} /></div> Thread 1 </Link>
                <Link className="p-4 flex items-center" to={links.sec.modInbox + 2}><div className="w-8 h-8 mr-2 border rounded-full flex justify-center items-center overflow-hidden"><FontAwesomeIcon className="text-2xl " icon={faUser} /></div> Thread 2 </Link>
                <Link className="p-4 flex items-center" to={links.sec.modInbox + 3}><div className="w-8 h-8 mr-2 border rounded-full flex justify-center items-center overflow-hidden"><FontAwesomeIcon className="text-2xl " icon={faUser} /></div> Thread 3</Link>
            </div>
        </div>
    )
}

export default Inbox