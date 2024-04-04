import { useState } from "react"
import { Link } from "react-router-dom"
import { Authenticaion } from "../../Common/Authfunction"
import { useNavigate } from "react-router-dom"
import image from "./img/bg.jpg"

//Ready 

const SignUp = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authResponse, setAuthResponse] = useState('')
    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        const credential = {
            fname: fname,
            lname: lname,
            email: email,
            password: password
        }
        Authenticaion('signup', credential, navigate).then((res) => {
            setAuthResponse(res)
        })
    }
    const closeError = (e) => {
        e.preventDefault()
        setAuthResponse('')
    }
    return (
        <div className="bg-cover w-full bg-center bg-no-repeat" style={{ backgroundImage: "url(" + image + ")" }}>
            <form action="" className="border  px-8 py-12 m-auto ">
                <h1 className="font-thin text-3xl text-center">Create an Account </h1> <br />
                <div>
                    <div className="bg-red-100">
                        {authResponse !== '' ?
                            <p className="py-2 px-4 text-red-900 my-2 flex space-between">
                                {authResponse.message}
                                <button onClick={(e) => closeError(e)} className="px-2 cursor-pointer">ok</button>
                            </p> : ''}
                    </div>
                </div>
                <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">First name</label> <br />
                <input className="my-3 w-full border-2 p-2" type="text" onChange={(e) => { setFname(e.target.value) }} required /> <br />

                <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">Last name</label> <br />
                <input className="my-3 w-full border-2 p-2" type="text" onChange={(e) => { setLname(e.target.value) }} required /> <br />

                <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">Email Address</label> <br />
                <input className="my-3 w-full border-2 p-2" type="email" onChange={(e) => { setEmail(e.target.value) }} required /> <br />

                <label className="my-3 w-full py-2 font-bold text-md" htmlFor="">Password</label> <br />
                <input className="my-3 w-full border-2 p-2" type="password" onChange={(e) => { setPassword(e.target.value) }} required /> <br />

                <button className="block bg-gray-800 text-white w-full hover:bg-gray-700 px-3 py-2 my-4" onClick={(e) => handleSignup(e)}> Signup </button>

                <div>
                    <p className="text-white">Already have account? <Link to="/auth/login" className="text-blue-800">Log in</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp