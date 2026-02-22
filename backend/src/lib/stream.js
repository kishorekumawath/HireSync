import { StreamClient } from "@stream-io/node-sdk";
import { StreamChat } from "stream-chat";
import ENV from "./env.js";

const apiKey = ENV.STREAM_API_KEY
const apiSecretKey = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecretKey) {
    throw new Error("Missing Stream API Key or Secret");
}

export const streamClient = new StreamClient(apiKey, apiSecretKey); // this will be used for video calling
export const chatClient = StreamChat.getInstance(apiKey, apiSecretKey); // this is for chat messaging


export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData);
    } catch (error) {
        console.error("Error upserting user:", error);
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
