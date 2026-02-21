import { StreamChat } from "stream-chat";
import ENV from "./env.js";

const apiKey = ENV.STREAM_API_KEY
const apiSecretKey = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecretKey) {
    throw new Error("Missing Stream API Key or Secret");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecretKey);

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
