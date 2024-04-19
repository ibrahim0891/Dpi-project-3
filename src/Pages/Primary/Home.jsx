/* eslint-disable no-mixed-spaces-and-tabs */
import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { setOnline } from "../../Common/SetActiveStatue";

let Home = () => {
    let [userData, setUserData] = useState("");
    useEffect(() => {
        let currentUser = localStorage.getItem("currentUser");
        const path = "users/" + currentUser + "/info";
        get(child(ref(database), path)).then((snapshot) => {
            setUserData(snapshot.val());
        });
        setOnline(localStorage.getItem(auth.currentUser.uid))
    }, []);
    return (
        <div className=" m-4">
            <div className="post  flex items-center">
                <div className=" w-1/12  m-3  flex justify-center items-center overflow-hidden ">
                    {userData && (
                        <img
                            src={userData.avater}
                            alt=""
                            className="w-10 rounded-full h-10"
                        />
                    )}
                </div>
                <div className="w-10/12">
                    <div className="w-full p-2 flex items-center text-base cursor-pointer bg-slate-200 border rounded-full h-8">
                        What is on your mind?
                    </div>
                </div>
            </div>

            <br />
            <div className="flex justify-around items-center bg-slate-200 ">
                <h2 className="text-base font-semibold uppercase hover:bg-slate-400 py-3 w-full text-center">recent</h2>
                <h2 className="text-base font-semibold uppercase hover:bg-slate-400 py-3 w-full text-center">Most Viewed</h2>
                <h2 className="text-base font-semibold uppercase hover:bg-slate-400 py-3 w-full text-center">Favourite</h2>
            </div>
            <br />
            <div className="body">
                <div className=" ">
                    <div className="flex items-center bg-slate-200">
                        <div className=" w-1/12  m-3  flex justify-center items-center overflow-hidden ">
                            {userData && (
                                <img
                                    src={userData.avater}
                                    alt=""
                                    className="w-8 rounded-full h-8"
                                />
                            )}
                        </div>
                        <h1 className="text-lg font-medium">{userData.fname}</h1>
                    </div>
                    <div className=" px-8 bg-slate-100 py-4">
                        <h2 className="text-lg font-bold py-4">Title of Post</h2>
                        <p className="py-2">Body of post <br /> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ducimus.</p>
                        <div className="flex justify-between text-center my-4 cursor-pointer ">
                            <div className="w-1/4"><FontAwesomeIcon icon={faHeart} className="text-xl  w-full rounded-full py-2 hover:bg-slate-200 bg-white text-slate-600"></FontAwesomeIcon></div>
                            <div className="w-1/4"><FontAwesomeIcon icon={faComment} className="text-xl w-full rounded-full py-2 hover:bg-slate-200 bg-white text-slate-600"></FontAwesomeIcon></div>
                            <div className="w-1/4"><FontAwesomeIcon icon={faBookmark} className="text-xl w-full rounded-full py-2 hover:bg-slate-200 bg-white text-slate-600"></FontAwesomeIcon></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
