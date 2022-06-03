import { collection, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import '../css/userList.css';

export default function UserList({openGroupList, setOpenGroupList}){
    const [ users, setUsers ] = useState([]);

    if(openGroupList){
        onSnapshot(collection(db, "users"), snapshot => {
            let usersSet = [];
            snapshot.docs.map(doc => {
                usersSet.push({...doc.data()});
            })
            setUsers(usersSet);       
            
        })
    }
    useEffect(() => {
        if(openGroupList){
            document.querySelector("#groupinfo").className = "show";        
        }else{
            document.querySelector("#groupinfo").className = "";        
        }
    }, [openGroupList])

    const clearChat = async() => {
        const messRef = collection(db, 'messages');

        getDocs(messRef).then(snapshot=>{
            console.log(snapshot);
            snapshot.forEach(doc=>{
                deleteDoc(doc.ref);
                alert("Messages Deleted");
            })
            console.log(snapshot);
        })
    }

    return (
        <>
        <div id="groupinfo">
            <div className="groupinfo-title">
                <span className="close-groupinfo" onClick={() => setOpenGroupList(false)}><i className="fa fa-angle-left"></i></span>
                <span className="groupinfo-title-text">In this chat</span>
            </div>
            <ul className="userlist">
                { users.length == 0 ? 
                    <i className="fa fa-spinner fa-spin"></i>
                            :
                    users.map(user => 
                        <li className="userlist-item" key={user.uid}>
                            <span className='userlist-item-name'>{user.displayName}</span>
                            <br></br>
                            <span className='userlist-item-email'>{user.email}</span>
                        </li>
                    )
                }
            </ul>

            <div className="clearchat-container">
                <button type="button" className="clear btn btn-danger" onClick={clearChat}>Clear Chat</button>
            </div>
        </div>
        </>
    )
}