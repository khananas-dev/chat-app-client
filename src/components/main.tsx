import React, { useState, useEffect, useCallback } from "react";
import Chat from "./chat/chat";
import Login from "./login/login";
import moment from "moment";
import socket from "../utils/socket";

export default function Main() {
  // States
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState({ userId: "", username: "" });
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Variables

  // Functions
  const newLoginUser = () => {
    socket.auth = {
      username: newUser,
    };
    socket.connect();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      newLoginUser();
    }
  };

  const checkIfUserExists = useCallback(() => {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      socket.auth = { sessionId: sessionId };
      socket.connect();
    }
  }, [socket]);

  //   Effects

  useEffect(() => {
    checkIfUserExists();
    // Session event
    socket.on("session", ({ sessionId, userId, username }: any) => {
      console.log({ sessionId, userId, username });
      socket.auth = { sessionId: sessionId };
      localStorage.setItem("sessionId", sessionId);
      setUser({ userId, username });
    });

    // All user event
    socket.on("users", (users: any) => {
      setUsers(users);
    });

    socket.on("connect", () => {
      console.log("socket connect");
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }, [socket, messages, checkIfUserExists]);

  return (
    <>
      {user.username && (
        <Chat
          user={user}
          users={users}
          messages={messages}
          setMessages={setMessages}
          setUsers={setUsers}
          socket={socket}
        />
      )}
      {!user.username && (
        <Login
          handleKeyDown={handleKeyDown}
          newUser={newUser}
          setNewUser={setNewUser}
          newLoginUser={newLoginUser}
        />
      )}
    </>
  );
}
