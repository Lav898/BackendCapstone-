import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const authrouter = express.Router();

// Register Route
authrouter.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default authrouter;
