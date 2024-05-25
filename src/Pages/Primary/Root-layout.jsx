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

    const navLinks = {
        className: "px-4 py-3 w-full text-center rounded-md",
        linksAndIcon: [
            { iconName: faHome, link: '/' },
            { iconName: faUserCircle, link: links.home.profile },
            { iconName: faUserGroup, link: links.home.peoples.peopleLayout },
            { iconName: faInbox, link: links.home.inbox.chatLayout }
        ]
    }
    return (
        <div >
            <div className="sticky top-0 z-30 bg-gray-50">

                <div className="flex items-center justify-between p-5">
                    <h1 className="text-lg"> Dpi-project-3 </h1>
                    <img src={user.avater} className="bg-slate-500 aspect-square w-9 rounded-full" alt="avater" />
                </div>

                <nav className="flex items-center justify-around mx-2 mb-4 pb-2 ">
                    {navLinks.linksAndIcon.map((linkIdentifier) =>
                        <NavLink className={navLinks.className} key={linkIdentifier.link} to={linkIdentifier.link}>
                            <FontAwesomeIcon icon={linkIdentifier.iconName}> </FontAwesomeIcon>
                        </NavLink>
                    )}
                </nav>
            </div>
            <div className=" ">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout