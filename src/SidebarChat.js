import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import { setChat } from "./features/user/chatSlice";
import db from "./firebase";
import moment from "moment";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(setChat({ chatId: id, chatName }));
      }}
      className="sidebarChat"
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sibebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {moment(new Date(chatInfo[0]?.timestamp?.toDate())).fromNow()}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
