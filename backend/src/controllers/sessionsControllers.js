import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";
export async function createSession(req, res) {
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and difficulty are required" });
        }

        // genereate a unqiue call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // create a new session
        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId
        });

        // create a stream video call
        await streamClient.video.call("default", callId).getOrCreate(
            {
                data: {
                    created_by_id: clerkId,
                    custom: {
                        problem,
                        difficulty,
                        sessionId: session._id.toString()
                    }
                }
            }
        );

        // chat messesing 
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        });

        await channel.create();

        return res.status(201).json(session);

    } catch (error) {
        console.log("error in createSession controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getActiveSessions(_, res) {
    try {
        const sessions = await Session.find({ status: "active" })
            .populate("host", "name profileImage email clerkId")
            .sort({ createdAt: -1 }).limit(20);

        return res.status(200).json(sessions);
    } catch (error) {
        console.log("error in getActiveSessions controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMyRecentSessions(req, res) {
    try {
        // get session either user host or participant
        const userId = req.user._id;
        const sessions = await Session.find({
            status: "completed",
            $or: [{ host: userId }, { participant: userId }]
        }).sort({ createdAt: -1 }).limit(20);

        return res.status(200).json(sessions);
    } catch (error) {
        console.log("error in getMyRecentSessions controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSessionById(req, res) {
    try {
        const { id } = req.params;
        const session = await Session.findById(id)
            .populate("host", "name profileImage email clerkId")
            .populate("participant", "name profileImage email clerkId");

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        return res.status(200).json(session);
    } catch (error) {
        console.log("error in getSessionById controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function joinSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (session.status !== "active") {
            return res.status(400).json({ message: "Session is not active" });
        }

        if (session.participant) {
            return res.status(409).json({ message: "Session is already full" });
        }

        // Prevent host from joining their own session
        if (session.host.toString() === userId.toString()) {
            return res.status(400).json({ message: "Host cannot join their own session as participant" });
        }

        session.participant = userId;
        await session.save();

        // add participant to stream video call
        // await streamClient.video.call("default", session.callId).addMembers([clerkId]);

        // add participant to chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        return res.status(200).json(session);
    } catch (error) {
        console.log("error in joinSession controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const session = await Session.findById(id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // check if session is already completed
        if (session.status === "completed") {
            return res.status(400).json({ message: "Session is already completed" });
        }

        // check if user is authorized to end the session
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: "User is not authorized to end the session" });
        }

        // delete stream video call
        await streamClient.video.call("default", session.callId).delete();

        // delete chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        return res.status(200).json({ session, message: "Session ended successfully" });
    } catch (error) {
        console.log("error in endSession controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}