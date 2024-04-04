import { useState } from "react"
import { Link } from "react-router-dom"
import { Authenticaion } from "../../Common/Authfunction"



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
    <form action="" className="border p-5 flex flex-col justify-center items-center">
        <label htmlFor="">Enter email</label>
        <input type="text" onChange={(e)=>{ setEmail(e.target.value)}}/>
        <label htmlFor="">Enter password</label>
        <input type="password" onChange={(e)=>{ setPassword(e.target.value)}}/>
        <button onClick={handleLogin}> Log in </button>
        <div>
            <p>New here? <Link to="/auth/signup">Sign up </Link></p>
        </div>
    </form>
  )
}
export default Login