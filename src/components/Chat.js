import { useContext, useEffect, useState, useRef } from 'react';
import { db } from '../firebase.js';
import { getDocs, collection, orderBy, query, onSnapshot, limit } from 'firebase/firestore';
import { UserContext } from './UserContext';
import Sender from './Sender';
import Message from './Message';
import '../css/chat.css';

export default function Chat(){
    const [ messages, setMessages ] = useState([]);
    const [ initialScroll, setInitialScroll ] = useState(false);
    const chatBody = useRef(null);

    const { user } = useContext(UserContext);

    const endMessages = useRef();

    useEffect(() => {
        if(!initialScroll){
            setTimeout(() => {
                 endMessages.current.scrollIntoView();
                setInitialScroll(true);
            },2000);
        }
    }, [])

    // const q = query(collection(db, "messages").orderBy("createdAt"));
    // onSnapshot(q, (snapshot) => {
    //     const newMessages = snapshot.docs.map(doc => ({...doc.data(), id:doc.id}));
    //     setMessages( newMessages );
        
    //     if(JSON.stringify(newMessages)!=JSON.stringify(messages)){
    //         console.log(newMessages[newMessages.length-1].text);
    //         scroll(JSON.stringify(newMessages)!=JSON.stringify(messages));
    //     }
    // });
    

    const messagesRef = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
    onSnapshot(messagesRef, (snapshot) => {
        let msgs  = [];
        snapshot.docs.map(doc => {
            msgs.push({...doc.data()});
        })
        chatBody.current.scrollTop = chatBody.current.scrollHeight;
        setMessages(msgs);
    });

    // getDocs(query(collection(db, "messages"),orderBy("createdAt")))
    //     .then((snapshot) => {
    //         let messages = [];
    //         snapshot.docs.forEach((doc) => {
    //             messages.push({...doc.data(), id:doc.id});
    //             setPrevMessageId(doc.id);
    //         })
    //         if(prevMessageId != messages[messages.length-1].id){
    //             chatBody.current.scrollTop = chatBody.current.scrollHeight;
    //         }
    //         setMessages(messages);
    //     });

    // const scroll = (willScroll) => {
    //     if (willScroll){
    //         chatBody.current.scrollTop = chatBody.current.scrollHeight;
    //     }
    // }


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
                            <Message msg={msg.text} author={msg.author} key={msg.id}/>                          
                        )
                    }
                </div>
                <div ref={endMessages}></div>
            </div>
            <Sender bodyRef={chatBody}/>
        </div>
    )
}