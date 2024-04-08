

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const SecondaryLayout = () => {
    const navigate = useNavigate()
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(!user){
            navigate('/auth/login')
        }
      })
    },[])
  return ( 
    <div>
        <Outlet/>
    </div>
  )
}

export default SecondaryLayout