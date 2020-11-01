import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import "./Sidebar.css";
import { RateReviewOutlined, Search } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";
import db, { auth } from "./firebase";
import { useState } from "react";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  });

  const addChat = () => {
    const chatName = prompt("please enter a chat name");
    db.collection("chats").add({
      chatName,
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <Search />
          <input type="text" placeholder="search" />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButtton">
          <RateReviewOutlined onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
