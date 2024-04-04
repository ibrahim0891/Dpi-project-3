import { Link } from "react-router-dom"
import { links } from "../../assets/Vars"


//under development
const Inbox = () => {
    return (
        <div>
            <h1> Messaging page </h1>
            <Link to={links.sec.modInbox+1}> Thread 1 </Link>
            <Link to={links.sec.modInbox+2}> Thread 2 </Link>
            <Link to={links.sec.modInbox+3}> Thread 3</Link>
        </div>
    )
}

export default Inbox