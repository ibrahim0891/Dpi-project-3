import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { database } from "../../../firebase";


const ChatView = () => {
    const chatID = useParams();
    const chatIDnumber = chatID['chatID']
    let [receiver, setReceiver] = useState()
    useEffect(() => {
        get(child(ref(database), `/users/${chatIDnumber}/info`)).then((snapshot) => {
            setReceiver(snapshot.val())
            console.log(snapshot.val());
        })
    }, [])
    return (
        <div className="">
            {receiver ? <div>
                <BackButton titlebarText={"Messaging to " + receiver.fname + ' '+ receiver.lastname} buttonLink={links.home.inbox.chatLayout} />
                <h2> Messaging to {chatIDnumber}</h2>
            </div> : <div className="flex items-center justify-center w-full p-6 text center"> Loading image will go here </div>}

        </div>
    )
}

export default ChatView