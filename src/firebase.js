import firebase from 'firebase/app'
import { isMobileDevice } from './utils'

//You should declare your own firebase config
//Current one is configured in .env.development.local
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
firestore.enablePersistence().catch(err => {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
    }
})

const auth = firebase.auth()

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    if (isMobileDevice()) {
        auth.signInWithRedirect(provider)
            .then(result => {
                console.log(result)
            })
            .catch(e => {
                console.log(e)
            })
    } else {
        auth.signInWithPopup(provider).catch(e => {
            console.log(e)
        })
    }
}

export { firestore, auth, signInWithGoogle }
export default firebase
