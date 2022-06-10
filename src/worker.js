"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const config_1 = require("./config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield (0, config_1.loadConfig)();
    if (!config) {
        console.log("Failed to load config.");
        return;
    }
    const { URL, USER } = config;
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
});
main().catch(console.error);
