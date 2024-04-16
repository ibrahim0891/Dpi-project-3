import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";

let Home = () => {
	let [userData, setUserData] = useState("");
	useEffect(() => {
		let currentUser = localStorage.getItem("currentUser");
		const path = "users/" + currentUser + "/info";
		get(child(ref(database), path)).then((snapshot) => {
			setUserData(snapshot.val());
		});
	}, []);
	return (
		<div>
			<div className="post m-4 flex items-center">
				<div className=" w-1/12  m-3  flex justify-center items-center overflow-hidden ">
					{userData && (
						<img
							src={userData.avater}
							alt=""
							className="w-8 rounded-full h-8"
						/>
					)}
				</div>
				<div className="w-10/12">
					<div className="w-full p-2 flex items-center cursor-pointer bg-slate-200 border rounded-full h-8">
						What is on your mind?
					</div>
				</div>
			</div>
			<div className="body">
				<div className="">
					<div title={userData.fname} className=" w-1/12  m-3  flex justify-center items-center overflow-hidden ">
						{userData && (
							<img
								src={userData.avater}
								alt=""
								className="w-8 rounded-full h-8"
							/>
						)}
					</div>
          <div>
            h
          </div>
				</div>
			</div>
		</div>
	);
};

export default Home;
