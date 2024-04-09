import { links } from "../../assets/Vars"
import BackButton from "../Components/BackButton"



const EditPofile = () => {
  return(
    <div>
        {/* you have to add profile edit form here */}
        <BackButton buttonLink={links.home.root} titlebarText={'Edit profile'}></BackButton>
        <div className="p-4 m-4 bg-gray-100"> 
         <h1> Edit profile page will go here!</h1>
        </div>
    </div>
  )
}

export default EditPofile