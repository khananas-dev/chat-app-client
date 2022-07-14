import { io } from "socket.io-client";

// const URL = "http://localhost:8000";
const URL = "https://basic-chat-app-server.herokuapp.com";
const socket = io(URL, { autoConnect: false });

export default socket;
