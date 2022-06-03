import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useContext } from 'react';
import { db } from '../firebase.js';
import { UserContext } from './UserContext.js';
import "../css/sender.css";

export default function Sender(){
    const { user } = useContext(UserContext);

    const send = (e) => {
        e.preventDefault();
        const text = e.target.text.value;

        const messagesRef = collection(db, "messages");

        if (text.length > 0){
            addDoc(messagesRef, {
                text:text,
                author: {
                    uid:user.uid,
                    name:user.displayName,
                },
                createdAt: Timestamp.fromDate(new Date()),
            })
                .then(() => {
                    console.log("message sent succesfully by", user.uid);
                    console.log("sent message, scrolling");
                });
        }

        e.target.text.value = "";
    }

    return (
        <form id="sender" autoComplete='off' onSubmit={(e)=>send(e)}>
            <input type="text" name="text" placeholder="Message"/>
            <button><i className="fa fa-paper-plane"></i></button>
        </form>
    )
}