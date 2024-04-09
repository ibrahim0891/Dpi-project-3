import { links } from "../../assets/Vars";
import BackButton from "../Components/BackButton";
import profile from "../../assets/img/default-profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const EditPofile = () => {
	return (
		<div>
			{/* you have to add profile edit form here */}
			<BackButton
				buttonLink={links.home.root}
				titlebarText={"Edit profile"}></BackButton>
			<div className="p-4 m-4 bg-gray-100 ">
				<div className="relative">
					<div className="flex justify-center">
						<img className="w-2/4 rounded-full" src={profile} alt="" />
						<FontAwesomeIcon
							className="text-black-600 text-lg cursor-pointer absolute bottom-1 right-20 p-2 bg-slate-200 rounded-full"
							icon={faCamera}></FontAwesomeIcon>
						<input type="file" name="profile" id="" className="hidden" />
					</div>
				</div>
        <br />
        {/* value gula automatic rakhen r edit a chaile change korar option rakhen */} 
				<h2 className="text-lg my-2">Edit your name</h2>
				<input type="text" name="name" id="" className="w-full  focus:outline-none focus:shadow-md"/>  {/*value={userData.fname}*/}
        <h2 className="text-lg my-2">Edit your email</h2>
				<input type="email" name="email" id="" className="w-full  focus:outline-none focus:shadow-md"/>  {/*value={userData.femail}*/}
        <h2 className="text-lg my-2">Edit your Phone</h2>
				<input type="number" name="Phone" id="" className="w-full  focus:outline-none focus:shadow-md"/>  {/*value={userData.Phone}*/}
        <h2 className="text-lg my-2">Edit your Address</h2>
        <textarea name="Address" id="" className="w-full focus:outline-none focus:shadow-md resize-none" />  {/*value={userData.Address}*/}
        <select>
          <option value="Web Developer">Web Developer</option>
        </select>
        <button className="bg-white shadow-md block p-4 mt-4 w-full">Update</button>
			</div>
		</div>
	);
};

export default EditPofile;
