import React, { useEffect, useRef } from "react";
import UserList from "../user-list/user-list";

export default function MessageDetail({
  user,
  users,
  message,
  messages,
  setMessage,
  selectedUser,
  selectUser,
  sendMessage,
}: any) {
  // States

  // Ref
  const messageEl: any = useRef(null);
  //   Effects
  useEffect(() => {
    if (messageEl) {
      console.log(messageEl.current);
      if (messageEl.current && messageEl.current.scrollHeight != null) {
        messageEl.current.scrollTop = messageEl.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="container p-0">
      <div className="card chat-app">
        <UserList user={user} users={users} selectedUser={selectedUser} />
        {/* <div className="chat h-100"> */}
        <div
          className={
            selectUser
              ? "chat h-100"
              : "chat h-100 d-flex align-items-center justify-content-center"
          }
        >
          {!selectUser ? (
            <div className="h5 border-0">Please select user</div>
          ) : (
            <>
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6 d-flex align-items-center">
                    <img
                      src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
                      alt="avatar"
                    />
                    <div className="chat-about">
                      <h6 className="mb-0">{selectUser.username}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history" ref={messageEl}>
                {messages.map((message: any, index: number) => {
                  return (
                    <div
                      key={`message-${index}`}
                      className="clearfix message-container mb-4"
                    >
                      <div
                        className={
                          message.userId === user.userId
                            ? "message-data text-right"
                            : "message-data"
                        }
                      >
                        <span className="message-data-time">
                          {message.messageDate}
                        </span>
                      </div>
                      <div
                        className={
                          message.userId === user.userId
                            ? "message other-message float-right"
                            : "message my-message"
                        }
                      >
                        {message.message}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-send"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
