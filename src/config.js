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
exports.loadConfig = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const inquirer_1 = require("inquirer");
const dotenv_1 = __importDefault(require("dotenv"));
const URL = "wss://slowandsteady.io";
const chooseProfile = (profiles) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = ".env-";
    const choices = profiles.map(profile => profile.replace(prefix, ""));
    const answers = yield (0, inquirer_1.prompt)({
        type: "list",
        name: "profile",
        message: "Choose a profile:",
        choices,
    });
    const profilePath = prefix + answers.profile;
    return profilePath;
});
const getEnvProfile = () => __awaiter(void 0, void 0, void 0, function* () {
    const rootPath = (0, path_1.join)(__dirname, "..");
    const files = yield (0, promises_1.readdir)(rootPath, { encoding: "utf-8" });
    const prefix = ".env-";
    const profiles = files.filter(file => file.startsWith(prefix));
    if (profiles.length === 0) {
        console.log("No profiles found.");
        const defaultProfile = files.find(file => file === ".env");
        if (defaultProfile) {
            console.log(`Loading default profile: ${defaultProfile}`);
            return defaultProfile;
        }
        return null;
    }
    const profile = yield chooseProfile(profiles);
    return profile;
});
const loadConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield getEnvProfile();
    if (!profile)
        return;
    dotenv_1.default.config({ path: profile });
    const USER = {
        client_uid: process.env.CLIENT_UID,
        client_username: process.env.CLIENT_USERNAME
    };
    return {
        URL,
        USER,
    };
});
exports.loadConfig = loadConfig;
