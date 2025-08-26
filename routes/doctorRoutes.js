import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";

const doctorrouter = express.Router();

// Doctor Registration
doctorrouter.post("/register", async (req, res) => {
    try {
        const { username, specialization, contact, email, experience, password } = req.body;

        // Check existing doctor
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new doctor
        const newDoctor = new Doctor({ 
            username, 
            specialization, 
            contact, 
            email, 
            experience, 
            password: hashedPassword 
        });
        await newDoctor.save();

        res.status(201).json({ message: "Doctor registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Doctor Login
doctorrouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if doctor exists
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: doctor._id, role: "doctor" }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ token, doctor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Doctors (protected route example)
doctorrouter.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find().select("-password"); // 👈 Hide password
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default doctorrouter;
