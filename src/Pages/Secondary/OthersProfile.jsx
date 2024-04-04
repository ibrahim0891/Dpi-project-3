import { useParams, Link  } from "react-router-dom"
import BackButton from "../Components/BackButton";
import { links } from "../../assets/Vars";

const OthersProfile = () => {
    const uid = useParams();
    const uidnumber = uid['uid']
    console.log(uidnumber);
    return (
        <div>
            <BackButton buttonLink={`/others`} buttonText={'Back'}/>
            <h2> Profile of people {uidnumber} </h2>
            <div>
                <Link to={links.sec.modInbox + uidnumber }> Click here </Link> to message people {uid['uid']} 
            </div>
        </div>
    )
}

export default OthersProfile