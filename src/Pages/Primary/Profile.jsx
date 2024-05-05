// React
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Firebase
import { auth, database } from "../../../firebase";
import { signOut } from "firebase/auth";
import { child, get, ref } from "firebase/database";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/img/profile-bg.jpg";
import profile from "../../assets/img/default-profile.jpg";
import { links } from "../../assets/Vars";
import TimeStamp from "../../Common/TimeStamp";
import { setOffline } from "../../Common/SetActiveStatue";
import Post from "../Components/Post";

// Under development

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    let [posts, setPosts] = useState([])
    const handleSignOut = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            setOffline(localStorage.getItem('currentUser'));
            localStorage.removeItem("currentUser");
            navigate("/auth/login");

        });
    };

    let [authorData, setAuthorData] = useState('')
    let [imageArray, setImageArray] = useState([])
    useEffect(() => {
        let currentUser = localStorage.getItem("currentUser");
        const path = "users/" + currentUser + "/info";
        get(child(ref(database), path)).then((snapshot) => {
            setUserData(snapshot.val());
        });
        get(child(ref(database), '/posts/' + currentUser)).then((snapshot) => {
            if (snapshot.exists) {
                // console.log(snapshot.val());
                const newPosts = [];
                snapshot.forEach((childSnapshot) => {
                    const postID = childSnapshot.key
                    const postData = childSnapshot.val();
                    newPosts.push({ ...postData, id: postID });
                });
                setPosts(newPosts);
                console.log(newPosts);
            } else {
                console.log("No posts found for this user.");
            }
        });
    }, []);

    let deletePost = (e , postID) => {
      e.preventDefault()
      console.log(postID);
      console.log('/posts/'+localStorage.getItem('currentUser')+'/'+postID);
    }
    // document.getElementById("edit-button").addEventListener("click", () => {
    // 	document.getElementById("edit-section").style.display = "block";
    // 	document.getElementById("mainProfilePage").style.display = "none";
    // });

    return (
        <div className="">
            {userData ? (
                <div className="slideIn">
                    <div className="flex items-center bg-center bg-cover bg-no-repeat md:aspect-[4/1]"
                        style={{ backgroundImage: "url(" + image + ")" }}>
                        <div className="w-1/4 flex justify-center">
                            <div className=" w-16 h-16  my-3 border rounded-full flex justify-center items-center overflow-hidden bg-white">
                                <img src={userData.avater} alt="" className="" />
                            </div>
                        </div>
                        <div className="ml-3 w-4/6">
                            <h1 className="font-medium text-xl ">{userData.fname}</h1>
                            <p className="font-thin text-sm text-left">{userData.email}</p>
                        </div>
                        <div className="mr-4">
                            <button className="flex items-center">
                                <Link to={links.sec.editProfile}> Edit Profile </Link>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-around text-center my-3 cursor-pointer ">
                        <div className="bg-gray-200 w-1/3 mr-1 hover:shadow-md p-2">
                            <h1>Posts</h1>
                            <h3>00</h3>
                        </div>
                        <div className="bg-gray-200 w-1/3 mx-1 hover:shadow-md p-2">
                            <h1>Followers</h1>
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
            <div className="space-y-6 ">
                {posts ? posts.map((post, index) =>
                    <div key={index}>
                        <Post title={post.postTitle} timestamp={post.timestamp} authorData={post.authorUID} bodyText={post.postBody} imageArray={post.images} ></Post>
                        <button onClick={(e)=>deletePost(e, post.postID)}> Delete post </button>
                    </div>
                )
                    : "loading posts..."}
            </div>
            <button
                className="bg-gray-100 block p-4 mt-4 w-full"
                onClick={(e) => handleSignOut(e)}>
                Sign out
            </button>
        </div>
    );
};


export default Profile;
