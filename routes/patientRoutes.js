import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";

const patientrouter = express.Router();

// Patient Registration
patientrouter.post("/register", async (req, res) => {
    try {
        const { name, age, email, gender, contact, address, medicalHistory, password } = req.body;
 
        // Check existing patient
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new patient
        const newPatient = new Patient({ 
            name, 
            age, 
            gender, 
            email, 
            contact, 
            address,
            medicalHistory,
            password: hashedPassword 
        });
        await newPatient.save();

        res.status(201).json({ message: "Patient registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Patient Login
patientrouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if patient exists
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: patient._id, role: "patient" }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ token, patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Patients (protected route example)
patientrouter.get("/", async (req, res) => {
    try {
        const patients = await Patient.find().select("-password"); // Hide password
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default patientrouter;
