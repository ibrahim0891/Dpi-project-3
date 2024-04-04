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
    <div className="flex justify-center">
      <div className="flex w-4/5 justify-center ">
        <div className="w-2/4 md:hidden sm:hidden lg:block"><img src="img/image.png" alt="" /></div>
        <form action="" className="border w-2/4 md:w-96 sm:w-96 p-5 ">
          <table>
            <tr >
              <td className="w-1/2"> <label htmlFor="">Enter email</label></td>
              <td className="w-1/2"><input type="text" className="border" onChange={(e)=>{ setEmail(e.target.value)}}/></td>
            </tr>
           
            <tr >
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
  )
}
export default Login