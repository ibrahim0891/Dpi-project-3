import { useState } from "react"
import { Link } from "react-router-dom"
import { Authenticaion } from "../../Common/Authfunction"
import image from '../../assets/img/loginbg.png'

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { writeDataInDB } from "../../Common/Database" 
import googleLogo from '../../assets/img/google-logo.png';

//Ready

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authResponse, setAuthResponse] = useState('')

    let googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithPopup(auth, provider).then((result) => {
            writeDataInDB('/users/' + result.user.uid + '/info', {
                email: result.user.email,
                fname: result.user.displayName,
                avater: result.user.photoURL
            })
        }).catch((error) => {
            console.log(error, error.code);
        })
    }
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
                <div className="py-4 text-center cursor-pointer flex items-center justify-center rounded-lg shadow-md" onClick={googleSignIn}>
                    <img src={googleLogo} className="w-5 mr-2" alt="" />
                    <span className="text-md ">Sign in with Google</span>
                </div>
                <div className="text-center py-4 text-lg"> or </div>
                <div className=" flex flex-col p-6 shadow-md border rounded-md relative">
                    <div className="absolute top-0 left-0 bg-gray-700/90 text-white font-bold text-md h-full w-full text-center flex items-center justify-center flex-col gap-2 p-6"> 
                    <h1 className="text-xl "> We're sorry </h1>
                       <span className="font-medium "> Our emaill and password login methode is under ongoing development. </span> <span className="text-[12px] block w-2/3 "> Please use Google Sign in for now.</span>
                    </div>
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

                <div className="py-4 mt-4 text-center shadow-md border rounded-md">
                    <p className="">New here? <Link className="text-blue-600 hover:underline " to="/auth/signup">Sign up </Link></p>
                </div>

            </form>
        </div>
    )
}
export default Login