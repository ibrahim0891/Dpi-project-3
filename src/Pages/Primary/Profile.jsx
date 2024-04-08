// React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Firebase
import { auth, database } from "../../../firebase";
import { signOut } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; 

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
					<div className="flex justify-center">
						<div className=" w-20 h-20 my-3 border rounded-full flex justify-center items-center">
							<FontAwesomeIcon className="text-6xl " icon={faUser} />
						</div> 
					</div>
					<h1 className="font-thin text-xl text-center">{userData.fname}</h1>
					<p className="font-thin text-sm text-center">{userData.email}</p>
				</div>
			) : (
				"Loading..."
			)}
			<button onClick={(e) => handleSignOut(e)}>Sign out</button>
		</div>
	);
};

export default Profile;
