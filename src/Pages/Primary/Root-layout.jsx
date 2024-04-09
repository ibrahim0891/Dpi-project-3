import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { auth, database } from "../../../firebase"
import { useNavigate } from "react-router-dom"
import { links } from "../../assets/Vars"
import { child, get, ref } from "firebase/database"
import { useState } from "react"

//under developemt

const RootLayout = () => {
    const navigate = useNavigate()
    const [user,setUserData] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/auth/login')
            }else{
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
            <div className="bg-gray-100 flex justify-center p-4">
                <h1> Boss level messaging web app</h1>
            </div>
            <nav className="bg-gray-100 text-gray-900 flex space-between">
                <NavLink className='m-2 p-2 hover:bg-gray-200 hover:text-black rounded-md w-1/3 text-nowrap text-center ' to='/'> Profile </NavLink>
                <NavLink className='m-2 p-2 hover:bg-gray-200 hover:text-black rounded-md w-1/3 text-nowrap text-center ' to='/others'> People </NavLink>
                <NavLink className='m-2 p-2 hover:bg-gray-200 hover:text-black rounded-md w-1/3 text-nowrap text-center ' to={links.home.inbox.chatLayout}> Inbox </NavLink>
            </nav>
            <div className=" p-4 ">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout