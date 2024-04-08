import { Link } from "react-router-dom"
import { links } from "../../../assets/Vars"


//under development
const Inbox = () => {
    return (
        <div>
            <h1> Messaging page </h1>
            <div className="flex flex-col px-4 py-2 ">
                <Link className="p-4" to={links.sec.modInbox + 1}> Thread 1 </Link>
                <Link className="p-4" to={links.sec.modInbox + 2}> Thread 2 </Link>
                <Link className="p-4" to={links.sec.modInbox + 3}> Thread 3</Link>
            </div>
        </div>
    )
}

export default Inbox