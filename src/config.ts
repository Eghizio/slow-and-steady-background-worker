import { join } from "path";
import { readdir } from "fs/promises";
import { prompt } from "inquirer";
import dotenv from "dotenv";

const URL = "wss://slowandsteady.io";

/*
  Check for `.env-*` files.
  If not found, default to `.env`. If not found -> EXIT.
  Let user choose the env profile from list.
  Load that env.
  
  TODO: Handle wrong envs and connection problems
*/

type PromptProfile = { profile: string };

const chooseProfile = async (profiles: string[]) => {
  const prefix = ".env-";
  const choices = profiles.map(profile => profile.replace(prefix, ""));

  const answers = await prompt<PromptProfile>({
    type: "list",
    name: "profile",
    message: "Choose a profile:",
    choices,
  });

  const profilePath = prefix + answers.profile;

  return profilePath;
};

const getEnvProfile = async () => {
  const rootPath = join(__dirname, "..");
  const files = await readdir(rootPath, { encoding: "utf-8" });

  const prefix = ".env-";
  const profiles = files.filter(file => file.startsWith(prefix));

  if(profiles.length === 0){
    console.log("No profiles found.");
    const defaultProfile = files.find(file => file === ".env");

    if(defaultProfile){
      console.log(`Loading default profile: ${defaultProfile}`);
      return defaultProfile;
    }

    return null;
  }

  const profile = await chooseProfile(profiles);
  return profile;
};

export const loadConfig = async () => {
  const profile = await getEnvProfile();

  if(!profile) return;

  dotenv.config({ path: profile });

  const USER = {
    client_uid: process.env.CLIENT_UID, 
    client_username: process.env.CLIENT_USERNAME
  };

  return {
    URL,
    USER,
  };
};
