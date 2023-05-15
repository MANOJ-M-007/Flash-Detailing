import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import userApiCalls from "../../EndPoints/userApiCalls";
import Conversations from "../conversations/Conversations";
import ChatBox from "../ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const socket = useRef();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const senderId = new URLSearchParams(location.search).get("receiverId");
  console.log(senderId, "senderId");
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userApiCalls.userChats(userInfo?._id, senderId);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userInfo._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://flashsocket.onrender.com");
    socket.current.emit("new-user-add", userInfo._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userInfo]);

  //send messsage to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userInfo._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <SearchTwoToneIcon /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversations
                  data={chat}
                  currentUser={userInfo._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={userInfo._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
