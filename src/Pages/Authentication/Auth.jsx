
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { links } from "../../assets/Vars";

//Under Development

import { useNavigate } from "react-router-dom";
const Auth = () => {
    const navigate = useNavigate()
    // const [splash, setSplashScreen] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate(links.home.root)
            } else {
                navigate(links.auth.login)
            }
        })
    }, [])
    return (
        <div>
            <Outlet />
        </div>
    )
}
export default Auth