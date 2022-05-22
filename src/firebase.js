import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBl2xXQy2Uw3UEyYLW5g3qBG-eNRsMpJtI",
    authDomain: "chat-68052.firebaseapp.com",
    databaseURL: "https://chat-68052-default-rtdb.firebaseio.com",
    projectId: "chat-68052",
    storageBucket: "chat-68052.appspot.com",
    messagingSenderId: "172626935231",
    appId: "1:172626935231:web:2702909fd6b92278b8b50a",
    measurementId: "G-52JWLKJ6ZJ"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, app };