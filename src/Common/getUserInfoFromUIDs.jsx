/* eslint-disable no-unused-vars */

import { child, get, onValue, ref } from "firebase/database"
import { database } from "../../firebase"
import { info } from "autoprefixer"



let getUserInfoFromUIDS = async (targetDBref) => {
    onValue(ref(database, targetDBref), (snapshot) => {
        let data = snapshot.val()
        let temp = []
        for (let i in data ){
            temp.push(data[i])
        }
        getUserInfoList(temp).then((info) => {
          return info
        })
    })
    async function getUserInfoList(uids){
        let userInfoList = []
        for (let uid of uids){
            await get(child(ref(database), `/users/${uid}/info`)).then((snapshot) => {
               let data = snapshot.val();
               if(data ){
                userInfoList.push({...data, uid: uid});
               }
            })
        }
        return userInfoList
    }
}

export default getUserInfoFromUIDS