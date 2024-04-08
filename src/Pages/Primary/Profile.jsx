// React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Firebase
import { auth, database } from "../../../firebase";
import { signOut } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import image from "../";

// Under development

const Profile = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({});
	const handleSignOut = (e) => {
		e.preventDefault();
		signOut(auth).then(() => {
			localStorage.removeItem("currentUser");
			navigate("/auth/login");
		});
	};

	useEffect(() => {
		let currentUser = localStorage.getItem("currentUser");
		const path = "users/" + currentUser + "/info";
		console.log(path);
		get(child(ref(database), path)).then((snapshot) => {
			setUserData(snapshot.val());
		});
	}, []);

	return (
		<div>
			{userData ? (
				<div>
					<div
						className="flex items-center bg-center bg-cover bg-no-repeat"
						style={{ backgroundImage: "url(" + image + ")" }}>
						<div className="w-1/4 flex justify-center">
							<div className=" w-16 h-16  my-3 border rounded-full flex justify-center items-center bg-white">
								<FontAwesomeIcon className="text-4xl " icon={faUser} />
							</div>
						</div>
						<div className="ml-3 w-4/6">
							<h1 className="font-medium text-xl ">{userData.fname}</h1>
							<p className="font-thin text-sm text-left">{userData.email}</p>
						</div>
						<div className="mr-1">
							<button className="flex"><div><FontAwesomeIcon className="" icon={faPenNib}></FontAwesomeIcon></div>Edit</button>
						</div>
					</div>
					<div className="flex justify-around text-center my-3 cursor-pointer ">
						<div className="bg-gray-200 w-5/6 mr-1 hover:shadow-md">
							<h1>Followers</h1>
							<h3>00</h3>
						</div>
						<div className="bg-gray-200 w-5/6 mx-1 hover:shadow-md">
							<h1>Posts</h1>
							<h3>00</h3>
						</div>
						<div className="bg-gray-200 w-1/3 ml-1 hover:shadow-md p-2">
							<h1>Favourite</h1>
							<h3>00</h3>
						</div>
					</div>
				</div>
			) : (
				"Loading..."
			)}
			<button onClick={(e) => handleSignOut(e)}>Sign out</button> 
		</div>
	);
};

export default Profile;
