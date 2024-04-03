import { useParams  } from "react-router-dom"
import BackButton from "../Components/BackButton";


const ChatView = () => {
    const chatID = useParams();
    const chatIDnumber = chatID['chatID']
    return (
        <div>
            <BackButton buttonText={'Back'} buttonLink={'/inbox'}/>
            <h2> Messaging to {chatIDnumber}</h2>
        </div>
    )
}

export default ChatView