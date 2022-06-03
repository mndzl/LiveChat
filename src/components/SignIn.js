import { app, db } from '../firebase.js';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import '../css/signIn.css';

import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function SignIn(){
    const {
        setUser
    } = useContext(UserContext);

    const auth = getAuth(app);

    const signInWithGoogle = () => {
        // setUser({name:"debug", uid:"asdasd"});
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((snapshot) => {
                setUser(snapshot.user);

                // Creating user in collection
                const usersRef = collection(db, "users");
                getDocs(usersRef)
                    .then(snapshot2 => {
                        let duplicated = false;
                        console.log(snapshot2.docs);
                        snapshot2.docs.forEach(doc => {
                            console.log(doc.data().displayName)
                            if(doc.data().uid == snapshot.user.uid){
                                duplicated = true;
                                return;
                            }
                        })
                        if(!duplicated){
                            addDoc(usersRef, {
                                displayName: snapshot.user.displayName,
                                uid: snapshot.user.uid,
                                email: snapshot.user.email,
                            })
                        }
                    });
            })
    }
    
    return (
        <>
            <div>
                <h1>You are not signed in.</h1>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
            
        </>
    )
}