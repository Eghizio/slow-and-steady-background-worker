import WebSocket from "ws";
import { loadConfig } from "./config";


const main = async () => {
  const config = await loadConfig();
  if(!config){
    console.log("Failed to load config.");
    return;
  }

  const { URL, USER } = config;

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
};

main().catch(console.error);