import { useState } from "react"
import { Link } from "react-router-dom"
import { Authenticaion } from "../../Common/Authfunction"
import image from './img/image.png'

//Ready

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authResponse, setAuthResponse] = useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        const credential = {
            email: email,
            password: password
        }
        Authenticaion('login', credential).then((res) => {
            setAuthResponse(res)
            // console.log(res);
        })
    }
    const closeError = (e) => {
        e.preventDefault();
        setAuthResponse('')
    }
    return (
        <div className=" ">
            <form action="" className="border  px-8 py-12 m-auto">
                <h1 className="font-thin text-3xl text-center"> DPI PROJECT 3 </h1>
                <div className="">
                    <img className='h-3/4' src={image} alt="" />
                </div>
                <div className="bg-red-100">
                    {authResponse !== '' ?
                        <p className="py-2 px-4 text-red-900 my-2 flex space-between">
                            {authResponse.message}
                            <button onClick={(e) => closeError(e)} className="px-2 cursor-pointer">ok</button>
                        </p> : ''}
                </div>
                <div className=" flex flex-col">
                    <label className="py-2 font-bold text-md" htmlFor="">Enter email</label>
                    <input
                        type="text"
                        className="border-2 p-2"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <label className="py-2 font-bold text-md" htmlFor="">Enter password</label>
                    <input
                        type="password"
                        className="border-2 p-2"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <button className="block bg-gray-800 text-white hover:bg-gray-700 px-3 py-2 my-4" onClick={handleLogin}> Log in </button>
                </div>

                <div className="pt-4 text-center">
                    <p className="">New here? <Link className="text-blue-600 hover:underline " to="/auth/signup">Sign up </Link></p>
                </div>
            </form>
        </div>
    )
}
export default Login