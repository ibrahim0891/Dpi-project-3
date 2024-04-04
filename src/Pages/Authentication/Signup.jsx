import { useState } from "react"
import { Link } from "react-router-dom"
import { Authenticaion } from "../../Common/Authfunction"
import { useNavigate } from "react-router-dom"

//Ready 

const SignUp = () => {
    const [fname ,setFname]= useState('')
    const [lname ,setLname]= useState('')
    const [email ,setEmail]= useState('')
    const [password ,setPassword]= useState('')

    const navigate = useNavigate()

    const handleSignup = (e)=>{
        e.preventDefault()
        const credential = {
            fname: fname,
            lname: lname,
            email: email, 
            password : password
        }
        Authenticaion('signup',credential, navigate) 
    }
    return (
        <form action="" className="border  px-8 py-12 m-auto ">
            <h1 className="font-thin text-3xl text-center"> সাক্ষর উপরে করেন </h1> <br/>
            <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">First name</label> <br/>
            <input className="my-3 w-full border-2 p-2" type="text" onChange={(e)=>{setFname(e.target.value)}} /> <br/>
            <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">Last name</label> <br/>
            <input className="my-3 w-full border-2 p-2" type="text"  onChange={(e)=>{setLname(e.target.value)}}/> <br/>
            <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">Email Address</label> <br/>
            <input className="my-3 w-full border-2 p-2" type="email"  onChange={(e)=>{setEmail(e.target.value)}}/> <br/>
            <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">Password</label> <br/>
            <input className="my-3 w-full border-2 p-2" type="password"  onChange={(e)=>{setPassword(e.target.value)}}/> <br/>
            <button  className="block bg-gray-800 text-white hover:bg-gray-700 px-3 py-2 my-4" onClick={(e)=>handleSignup(e)}> Signup </button>
            <div>
                Already have account? <Link to="/auth/login">Log in</Link>
            </div>
        </form>
    )
}

export default SignUp