import { useContext, useEffect, useState, useRef } from 'react';
import { db } from '../firebase.js';
import { getDocs, collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { UserContext } from './UserContext';
import Sender from './Sender';
import Message from './Message';
import '../css/chat.css';

export default function Chat(){
    const [ messages, setMessages ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    const [ initialScroll, setInitialScroll ] = useState(false);
    const chatBody = useRef(null);

    const { user } = useContext(UserContext);

    const endMessages = useRef();

    useEffect(() => {
        if(!initialScroll){
            setTimeout(() => {
                console.log(initialScroll);
                console.log("Initial scroll", chatBody.current.scrollHeight);
                endMessages.current.scrollIntoView();
                setInitialScroll(true);
            }, 2000);
            console.log("out");
        }
    }, [messages])

    const q = query(collection(db, "messages"),orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
        setMessages( snapshot.docs.map(doc => ({...doc.data(), id:doc.id})) )
    });

    return (
        <div id="chat-container">
            <div id="chat-name">
                <span>Global Chat</span>
            </div>
            <div id="chat" ref={chatBody}>
                <div id="messages-box">
                    { messages.length == 0 ? 
                        <i className="fa fa-spinner fa-spin"></i>
                        :
                        messages.map(msg => 
                            <Message msg={msg.text} author={msg.author} id={msg.id} key={msg.id}/>                          
                        )
                    }
                </div>
                <div ref={endMessages}></div>
            </div>
            <Sender endMessages={endMessages}/>
        </div>
    )
}