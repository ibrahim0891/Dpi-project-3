import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";


let Home = () => {
    let [userData , setUserData ] = useState('')
    useEffect(() => {
        let currentUser = localStorage.getItem("currentUser");
        const path = "users/" + currentUser + "/info";
        get(child(ref(database), path)).then((snapshot) => {
            setUserData(snapshot.val());
        });
        
    }, []);
  return (
    <div>
      <div className="post m-4 flex justify-between items-center">
        <div className=" w-8 h-8  m-3 border rounded-full flex justify-center items-center overflow-hidden bg-white">
         {userData && <img src={userData.avater} alt="" className=""/>} 
        </div>
        <div className="w-10/12">
          <div className="w-full p-2 flex items-center cursor-pointer bg-slate-200 border rounded-full h-8">What is on your mind?</div>
        </div>
      </div>
      <div className="body">

      </div>
    </div>
  )
}

export default Home