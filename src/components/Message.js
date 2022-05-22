import { useContext } from 'react';
import { UserContext } from "./UserContext";
import "../css/message.css";

export default function Message({msg, author, id}){
    const { user } = useContext(UserContext);

    const sentOrReceived = (author) => {

        let classes = "message-container ";
        if(author.id == user.uid){
            classes += "sent";
        }

        return classes;
    }

    return (
        <div className={sentOrReceived(author, id)}>
            <div className="message-data">
                {author.id != user.uid && <div className="message-author">{author.name}</div>}
                <div className="message">{msg} </div>
            </div>
        </div>
    )
}