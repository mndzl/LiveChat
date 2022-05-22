import { getAuth } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import { app, db } from '../firebase.js';
import { UserContext } from './UserContext.js';
import "../css/sender.css";

export default function Sender({endMessages}){
    const { user } = useContext(UserContext);

    const send = () => {
        const text = document.getElementById('message-input').value;

        const messagesRef = collection(db, "messages");

        if (text.length > 0){
            addDoc(messagesRef, {
                text:text,
                author: {
                    id:user.uid,
                    name:user.displayName,
                },
                createdAt: Timestamp.fromDate(new Date()),
            })
                .then(() => {
                    console.log("message sent succesfully by", user.uid);
                    endMessages.current.scrollIntoView()
                    console.log("sent message, scrolling");
                });
        }

        document.getElementById('message-input').value = "";
    }

    const focus = () => {
        
    }

    return (
        <div id="sender">
            <input type="text" id="message-input" placeholder="Message" onClick={focus}/>
            <button onClick={send}><i className="fa fa-paper-plane"></i></button>
        </div>
    )
}