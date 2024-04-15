import { ref, set } from "firebase/database"
import { database } from "../../firebase"
import TimeStamp from "./TimeStamp"

let pathTemplete = "/users/"
let setOnline = (uid) => {
    set(ref(database, pathTemplete + uid + '/info/activeStatus'), {
        online: 'Active now'
    }) 
}

let setOffline = (uid) => {
  set(ref(database,pathTemplete+uid+'/info/activeStatus'),{
    online: 'Offline',
    lastActive : TimeStamp()
  })
}

export {setOffline, setOnline}