import WebSocket from "ws";
import dotenv from "dotenv";
dotenv.config();

const URL = "wss://slowandsteady.io";

const USER = {
    client_uid: process.env.CLIENT_UID, 
    client_username: process.env.CLIENT_USERNAME
};

console.log("Running server...");
const socket = new WebSocket(URL, {
  perMessageDeflate: false
});


socket.on("open", () => {
    console.log("Connection opened...");
    console.log("\x1b[32m%s\x1b[0m", `Logged in as ${USER.client_username}`);

    const data = { head: "username", tail: USER.client_uid };
    const serializedData = JSON.stringify(data);
    
    socket.send(serializedData);
});

socket.on("message", (data) => {
    console.log("received: %s", data);
});
