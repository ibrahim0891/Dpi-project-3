
import { app } from '../../firebase'
import { getDatabase, ref, set } from 'firebase/database'

const db = getDatabase(app)

export function writeDataInDB(path, data) {
    let dbRef = ref(db, path)
    set(dbRef, data).then(() => {
        console.log('Data saved!');
    })
}