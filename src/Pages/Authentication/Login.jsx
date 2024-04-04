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
    <div className="flex bg-gradient-to-r from-blue-300 to-cyan-500 lg:h-screen sm:h-screen md:h-screen items-center justify-center">
      
      <div className="flex p-4 bg-white h-3/5 items-center w-3/5 justify-center ">
        <div className="w-2/4 flex justify-center md:hidden sm:hidden lg:block">
          <img className="w-96" src={image} alt="" />
        </div>
        <div className=" lg:w-2/4 flex justify-center">
          <form action="" className=" md:w-96 sm:w-96  p-5">
            <table>
              <tr className="my-1">
                <td className="w-1/2"> <label htmlFor="">Enter email</label></td>
                <td className="w-1/2"><input type="text" className="border" onChange={(e)=>{ setEmail(e.target.value)}}/></td>
              </tr>
            
              <tr className="my-1">
                <td className="w-1/2"> <label htmlFor="">Enter password</label></td>
                <td className="w-1/2"><input type="password" className="border" onChange={(e)=>{ setPassword(e.target.value)}}/></td>
              </tr>
            
            </table>
            <button onClick={handleLogin}> Log in </button>
            <div>
                <p>New here? <Link to="/auth/signup">Sign up </Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login