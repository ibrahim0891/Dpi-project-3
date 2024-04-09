import { links } from "../../assets/Vars"
import BackButton from "../Components/BackButton"
import profile from "../../assets/img/default-profile.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const EditPofile = () => {
  return(
    <div>
        {/* you have to add profile edit form here */}
        <BackButton buttonLink={links.home.root} titlebarText={'Edit profile'}></BackButton>
        <div className="p-4 m-4 bg-gray-100 relative"> 
           <div className="flex justify-center">
            <img className="w-2/4 rounded-full" src={profile} alt="" />
            <FontAwesomeIcon className="text-black-600 text-lg cursor-pointer absolute bottom-3 right-24 p-2 bg-slate-200 rounded-full" icon={faCamera}></FontAwesomeIcon>
            <input type="file" name="profile" id=""className="hidden"/>
           </div>
        </div>
    </div>
  )
}
