import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { auth } from "../../../firebase"
import { useNavigate } from "react-router-dom"
import { links } from "../../assets/Vars"

//under developemt

const RootLayout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/auth/login')
            }
        })
    }, [])
    return (
        <div>
            <nav className="bg-gray-800 text-white flex space-between">
                <NavLink className='p-4 w-1/3 text-nowrap text-center ' to='/'> Profile </NavLink>
                <NavLink className='p-4 w-1/3 text-nowrap text-center ' to='/others'> People </NavLink>
                <NavLink className='p-4 w-1/3 text-nowrap text-center ' to={links.home.inbox.chatLayout}> Inbox </NavLink>
            </nav>
            <div className="p-6 bg-slate-500">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout