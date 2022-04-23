"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = "wss://slowandsteady.io";
const USER = {
    client_uid: process.env.CLIENT_UID,
    client_username: process.env.CLIENT_USERNAME
};
console.log("Running server...");
const socket = new ws_1.default(URL, {
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
