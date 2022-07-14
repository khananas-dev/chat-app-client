/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MessageDetail from "../message-detail/message-detail";
import Navbar from "../navbar/navbar";

function Chat({ user, users, messages, setMessages, socket, setUsers }: any) {
  // States
  const [message, setMessage] = useState("");
  const [selectUser, setSelectUser] = useState<any>("");

  // Ref
  const currentSelectedUser = useRef<any>({});

  // Functions
  const sendMessage = () => {
    socket.emit("private message", {
      content: message,
      to: selectUser.userId,
    });
    let newMessage = {
      type: "message",
      userId: user.userId,
      username: user.username,
      message,
      messageDate: moment().format("h:mm A"),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const selectedUser = (user: any) => {
    setSelectUser(user);
    setMessages([]);
    currentSelectedUser.current = user;
    socket.emit("user messages", user);
    handleNewMessageStatus(user.userId, false);
  };
  const findUser = useCallback(
    (userId: any) => {
      let userIndex = users.findIndex((user: any) => user.userId === userId);
      return userIndex >= 0;
    },
    [users]
  );

  const handleConnectionStatus = useCallback(
    (userId: any, status: any) => {
      let userIndex = users.findIndex((u: any) => u.userId === userId);
      if (userIndex >= 0) {
        users[userIndex].connected = status;
        setUsers([...users]);
      }
    },
    [users, setUsers]
  );

  const userConnected = useCallback(
    ({ userId, username }: any) => {
      if (user.userId !== userId) {
        let userExists = findUser(userId);
        if (userExists) {
          handleConnectionStatus(userId, true);
        } else {
          let newUser = { userId, username, connected: true };
          setUsers([...users, newUser]);
        }
      }
    },
    [user, users, setUsers, findUser, handleConnectionStatus]
  );

  const userDisconnected = useCallback(
    ({ userId, username }: any) => {
      handleConnectionStatus(userId, false);
    },
    [handleConnectionStatus]
  );

  const handleNewMessageStatus = useCallback(
    (userId: any, status: any) => {
      let userIndex = users.findIndex((u: any) => u.userId === userId);
      if (userIndex >= 0) {
        users[userIndex].hasNewMessage = status;
        setUsers([...users]);
      }
    },
    [users, setUsers]
  );

  const privateMessage = useCallback(
    ({ content, from, to }: any) => {
      // if user is selected
      if (currentSelectedUser.current.userId) {
        if (currentSelectedUser.current.userId === from) {
          let newMessage = {
            userId: from,
            message: content,
          };
          setMessages([...messages, newMessage]);
        } else {
          handleNewMessageStatus(from, true);
        }
      } else {
        // if user is not selected

        handleNewMessageStatus(from, true);
      }
    },
    [messages, setMessages, selectUser, handleNewMessageStatus]
  );

  const userMessages = useCallback(
    ({ message }: any) => {
      console.log(message);

      const chatMessages: any[] = [];
      message &&
        message.forEach(({ content, from }: any) => {
          chatMessages.push({ userId: from, message: content });
          setMessages([...chatMessages]);
        });
    },
    [setMessages]
  );

  // Effects
  useEffect(() => {
    // new user event
    socket.on("userConnected", (user: any) => userConnected(user));

    // user disconnected event
    socket.on("user disconnected", (user: any) => userDisconnected(user));

    // private message event
    socket.on("private message", (message: any) => privateMessage(message));

    // User messages event
    socket.on("user messages", (messages: any) => userMessages(messages));
  }, [socket, userConnected, userDisconnected, privateMessage]);

  return (
    <>
      <Navbar user={user} />

      <div className="container py-4">
        <MessageDetail
          user={user}
          users={users}
          message={message}
          messages={messages}
          setMessage={setMessage}
          selectedUser={selectedUser}
          selectUser={selectUser}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
}

export default Chat;
