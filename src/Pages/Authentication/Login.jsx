import { useState } from "react"
import { Link } from "react-router-dom"
import { Authenticaion } from "../../Common/Authfunction"
import image from './img/image.png'


const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    const credential = {
        email: email,
        password: password
    }
    Authenticaion('login',credential)
  }
  return (
    <div className="flex w-4/5 justify-center ">
      <div className="w-2/4 ">
        <img src={image} alt="" />
        </div>
      <form action="" className="border w-2/4 p-5 ">
        <label htmlFor="">Enter email</label>
        <input type="text" className="border" onChange={(e)=>{ setEmail(e.target.value)}}/><br/>
        <label htmlFor="">Enter password</label>
        <input type="password" onChange={(e)=>{ setPassword(e.target.value)}}/>
        <button onClick={handleLogin}> Log in </button>
        <div>
            <p>New here? <Link to="/auth/signup">Sign up </Link></p>
        </div>
      </form>
    </div>
  )
}
export default Login