import { useContext, useEffect, useState, useRef } from 'react';
import { db } from '../firebase.js';
import { collection, orderBy, query, onSnapshot, limit } from 'firebase/firestore';
import { UserContext } from './UserContext';
import Sender from './Sender';
import Message from './Message';
import '../css/chat.css';
import UserList from './UserList.js';

export default function Chat(){
    const [ messages, setMessages ] = useState([]);
    const [ initialScroll, setInitialScroll ] = useState(false);
    const [ openGroupList, setOpenGroupList ] = useState(false);
    const [loading, setLoading] = useState(false);
    const chatBody = useRef(null);

    const endMessages = useRef();

    useEffect(() => {
        if(!initialScroll){
            setTimeout(() => {
                endMessages.current.scrollIntoView();
                setInitialScroll(true);
            },2000);
        }
    }, [])

    const messagesRef = query(collection(db, "messages"), orderBy("createdAt"), limit(25));
    onSnapshot(messagesRef, (snapshot) => {
        setLoading(true);
        let msgs  = [];
        snapshot.docs.map(doc => {
            msgs.push({...doc.data()});
        })
        chatBody.current.scrollTop = chatBody.current.scrollHeight;
        setMessages(msgs);
        setLoading(false);
    });

    return (
        <div id="chat-container">
            
            {/* Group Info, Absolute */}
            <UserList openGroupList={openGroupList} setOpenGroupList={setOpenGroupList}/>
            {/* Group Info, Absolute */}


            <div id="chat-name">
                <span>Global Chat</span>
                <i className="fa fa-info-circle" onClick={() => setOpenGroupList(true)}></i>
            </div>
            <div id="chat" ref={chatBody}>
                <div id="messages-box">
                    { loading ? 
                        <i className="fa fa-spinner fa-spin"></i>
                        :
                            messages.length == 0 ?
                                <span className="noMessages">No messages</span>
                            :
                            messages.map(msg => 
                                <Message msg={msg.text} author={msg.author} key={msg.id}/>                          
                            )
                    }
                </div>
                <div ref={endMessages}></div>
            </div>
            <Sender/>
        </div>
    )
}