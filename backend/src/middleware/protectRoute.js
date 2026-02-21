import { requireAuth } from '@clerk/express'
import User from '../models/user.js'

export const protectRoute = [requireAuth({ signInUrl: "/sign-in" }), async (req, res, next) => {
    try {
        const clerkId = res.auth().userId
        if (!clerkId) {
            return res.status(401).json({ message: "User is Unauthorized - Invalid Token" })
        }
        const user = await User.findOne({ clerkId })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // attach user to request
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}] 
