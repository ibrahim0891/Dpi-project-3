import { signOut } from "firebase/auth" 
import { auth } from "../../../firebase"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { updateData } from "../../Common/Database"

//Under development

const Profile = () => {
    const navigate = useNavigate()
    const handleSignOut = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            navigate('/auth/login')
        })
    }
    const [info , setInfo ] = useState('')
    const updateDB = (e) => {
      e.preventDefault()
      let myObj = {
        data : info
      }
      let path = `users/${auth.currentUser.uid}/info`
      updateData(path, myObj)
    }
    return (
        <div>
            <h1> Profile </h1>
            {/* this input is only for test . no need to style Here */}
            <input type="text" onChange={(e)=>{setInfo(e.target.value)}}/>
            <button onClick={(e)=> updateDB(e)}> Update DB</button>
            <button onClick={(e)=> handleSignOut(e)}>Sign out</button>
        </div>
    )
}

export default Profile