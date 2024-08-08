import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_REACT_APP_WEBSOCKET_URL, {
  withCredentials: false,
});

export default socket;
