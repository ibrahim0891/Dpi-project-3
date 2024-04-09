
import { ref, set, update } from 'firebase/database';
import { auth , database} from '../../firebase';

const handleDecline = (e, requestorUID) => {
    e.preventDefault()
    let requestId = requestorUID.slice(0,6)
    let requestRef = ref(database, `/requests/${auth.currentUser.uid}/${requestId}`)
    set(requestRef, null)
}
const handleAccept = (e, requestorUID) => {
    e.preventDefault()
    let connectRef = ref(database, `/connections/${auth.currentUser.uid}`)
    let connectRef2 = ref(database, `/connections/${requestorUID}`)
    update(connectRef, {
      [requestorUID]: true
    })
    update(connectRef2, {
      [auth.currentUser.uid]: true
    })
    handleDecline(e , requestorUID)
}

export { handleDecline, handleAccept }