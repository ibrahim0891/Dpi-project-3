import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { auth, database } from "../../../firebase"
import { useNavigate } from "react-router-dom"
import { links } from "../../assets/Vars"
import { child, get, ref } from "firebase/database"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faInbox, faInfo, faMailBulk, faMailReply, faUser, faUserCircle, faUserGroup } from "@fortawesome/free-solid-svg-icons"

//under developemt

const RootLayout = () => {
    const navigate = useNavigate()
    const [user, setUserData] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/auth/login')
            } else {
                localStorage.setItem('currentUser', user.uid)
            }
        })
        get(child(ref(database), `/users/${localStorage.getItem('currentUser')}/info`)).then((snapshot) => {
            let data = snapshot.val();
            setUserData(data);
        })
    }, [])
    return (
        <div>
            <div className="py-6 px-4 text-center text-3xl font-thin bg-gray-100">
                <h1> Dpi-project-3 </h1>
            </div>
            <div className="bg-green-100 text-sm text-green-900 flex justify-center p-1">
                {user ? <p> {user.fname} is currently logged in!</p> : <p>Loading...</p>}
            </div>
            <nav className="bg-slate-200 text-gray-900 flex space-between">
                <NavLink className='m-2 p-4 hover:bg-gray-200  hover:text-black rounded-md w-1/3 text-nowrap text-center ' to='/'>
                    <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                </NavLink>
                <NavLink className='m-2 p-4 hover:bg-gray-200  hover:text-black rounded-md w-1/3 text-nowrap text-center ' to={links.home.profile}> 
                <FontAwesomeIcon icon={faUserCircle}> </FontAwesomeIcon>
                 </NavLink>
                <NavLink className='m-2 p-4 hover:bg-gray-200  hover:text-black rounded-md w-1/3 text-nowrap text-center ' to={links.home.peoples.peopleLayout}> 
                <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
                 </NavLink>
                <NavLink className='m-2 p-4 hover:bg-gray-200  hover:text-black rounded-md w-1/3 text-nowrap text-center ' to={links.home.inbox.chatLayout}> 
                 <FontAwesomeIcon icon={faInbox}></FontAwesomeIcon>
                 </NavLink>
            </nav>
            <div className=" p-4 ">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout