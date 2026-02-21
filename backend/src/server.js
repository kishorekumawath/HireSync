import express from "express";
import ENV from "./lib/env.js";
import path from "path";
import connectDB from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest } from "./lib/inngest.js";
import { functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // used for parsing json data from incoming requests 
// why credentials: true because sever allows to browser to include cookies in the request
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}));
app.use(clerkMiddleware()); // this middleware will protect all the routes that are coming after this middleware

app.use('/api/inngest', serve({ client: inngest, functions }));


app.use("/api/chat", chatRoutes);

// when u pass an array of middleware functions, they are executed in order
// app.get("/video-calls", protectRoute, (req, res) => {
//     res.status(200).json({
//         message: "this is the test endpoint"
//     })
// })

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "api is up and running"
    })
})

// make our app ready fro deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));
    } catch (error) {
        console.error("Server startup error:", error);
    }
}

startServer();
