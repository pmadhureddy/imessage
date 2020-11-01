import React, { useEffect, useState } from "react";
import "./Chat.css";
import { IconButton } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "./features/user/chatSlice";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import { selectUser } from "./features/user/userSlice";

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snappshot) => {
          setMessages(
            snappshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message keys={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      {chatName && (
        <div className="chat__input">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage}>Send Message</button>
          </form>
          <IconButton className="chat__mic">
            <MicNone />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Chat;
