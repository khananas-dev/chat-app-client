import React, { useContext } from "react";
import AuthContext from "../context/authentication";

export default function BroadcastMessageDetail({
  user,
  message,
  setMessage,
  messages,
  setMessages,
  sendMessage,
}: any) {
  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12 p-0">
          <div className="card chat-app">
            <div className="chat m-0">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6 d-flex align-items-center">
                    <img
                      src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
                      alt="avatar"
                    />
                    <div className="chat-about">
                      <h6 className="mb-0">Broadcast Messages</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                {messages.map((message: any, index: number) => {
                  // <div key={`user-status-${index}`} className="text-center">
                  //   <span className="badge bg-info">
                  //     {message.userId === user.userId
                  //       ? "You have joined"
                  //       : message.username}
                  //   </span>
                  // </div>

                  return message.type === "UserStatus" ? (
                    <div key={`user-status-${index}`} className="text-center">
                      <span className="badge bg-info text-white">
                        {message.userId === user.userId
                          ? "You have joined"
                          : message.username + " have Joined"}
                      </span>
                    </div>
                  ) : (
                    <div key={`message-${index}`} className="clearfix mb-4">
                      <div
                        className={
                          message.userId === user.userId
                            ? "message-data text-right"
                            : "message-data"
                        }
                      >
                        <span className="message-data-time">
                          {message.userId === user.userId
                            ? "You"
                            : message.username}
                          <span> </span>
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
                    // <div>{message.message}</div>
                  );
                })}
                {/* <ul className="mb-0">
                  <li className="clearfix">
                    <div className="message-data text-right">
                      <span className="message-data-time">10:10 AM, Today</span>
                    </div>
                    <div className="message other-message float-right">
                      {" "}
                      Hi Aiden, how are you? How is the project coming along?{" "}
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">
                      Are we meeting today?
                    </div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div className="message my-message">
                      Project has been already finished and I have results to
                      show you.
                    </div>
                  </li>
                </ul> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
