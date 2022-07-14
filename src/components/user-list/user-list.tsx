export default function UserList({ user, users, selectedUser }: any) {
  return (
    <div id="plist" className="people-list border-right">
      <div className="chat-header">
        <div className="d-flex align-items-center">
          <img
            src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
            alt="avatar"
            height={40}
            width={40}
          />
          <div className="chat-about">
            <h6 className="ml-2 mb-0">{user.username}</h6>
          </div>
        </div>
      </div>
      <div className="border my-2"></div>
      <ul className="list-unstyled chat-list mt-2 mb-0">
        {users.length > 0 ? (
          users.map((singleUser: any) => (
            <li
              className="clearfix d-flex align-items-center position-relative"
              key={`userList-${singleUser.userId}`}
              onClick={() => {
                selectedUser(singleUser);
              }}
            >
              <img
                src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
                alt="avatar"
                width={30}
                height={30}
              />
              <span
                className={singleUser.connected ? "online" : "offline"}
              ></span>
              <div className="about">
                <div className="name">
                  <strong>{singleUser.username}</strong>
                </div>
              </div>
              <span
                className={singleUser.hasNewMessage ? "new-message-alert" : ""}
              ></span>
            </li>
          ))
        ) : (
          <div className="name text-center">No user connected</div>
        )}

        {/* <li
          className="clearfix d-flex align-items-center"
          key={`userList-${index}`}
        >
          <img
            src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
            alt="avatar"
          />
          <div className="about">
            <div className="name">{item.userName}</div>
          </div>
        </li> */}
      </ul>
    </div>
  );
}
