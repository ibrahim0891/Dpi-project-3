
import { app } from '../../firebase'
import { getDatabase, ref, set, update } from 'firebase/database'

const db = getDatabase(app)

export function writeDataInDB(path, data) {
    let dbRef = ref(db, path)
    set(dbRef, data).then(() => {
        console.log('Data saved!');
    })
}

export function updateData(path, obj){
    let dbref = ref(db, path)
    update(dbref, obj).then(() => {
      console.log('Data updated!');
    })
}