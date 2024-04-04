import { signOut } from "firebase/auth" 
import { auth } from "../../../firebase"
import { useNavigate } from "react-router-dom"

//Under development

const Profile = () => {
    const navigate = useNavigate()
    const handleSignOut = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            navigate('/auth/login')
        })
    }
    return (
        <div>
            <h1> Profile </h1>
            <button onClick={(e)=> handleSignOut(e)}>Sign out</button>
        </div>
    )
}

export default Profile