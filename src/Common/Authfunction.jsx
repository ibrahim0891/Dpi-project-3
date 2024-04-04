import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { writeDataInDB } from "./Database";
import { links } from "../assets/Vars";

//Logic 

export function Authenticaion(actionType, formInput , navigate) {
    return new Promise((resolve) => {
        if (actionType == 'login') {
            signInWithEmailAndPassword(auth, formInput.email, formInput.password).then((usercredential) => {
                const user = usercredential.user
                navigate(links.home.root)
                resolve(user)
            }).catch((error) => {
              resolve(error)
            })
        }
        if (actionType == 'signup') {
            createUserWithEmailAndPassword(auth, formInput.email, formInput.password).then((usercredential) => {
                const user = usercredential.user
                writeDataInDB('/users/'+user.uid+'/info' , formInput)
                navigate(links.home.root)
                resolve(user)
            }).catch((error) => {
              resolve(error)
            })
        }
        else {
            console.log("error");
        }
    })

}