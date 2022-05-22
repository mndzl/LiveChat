import { app } from '../firebase.js';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import '../css/signIn.css';

import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

export default function SignIn(){
    const {
        setUser
    } = useContext(UserContext);

    const auth = getAuth(app);

    const signInWithGoogle = () => {
        setUser({name:"debug", uid:"asdasd"});
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((snapshot) => {
                setUser(snapshot.user);
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