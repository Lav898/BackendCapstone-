import express from "express";
import Appointment from "../models/Appointment.js";

const appointmentrouter = express.Router();

// Book Appointment
appointmentrouter.post("/book", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Appointments
appointmentrouter.get("/", async (req, res) => {
    const appointments = await Appointment.find()
        .populate("patientId")
        .populate("doctorId");
    res.json(appointments);
});

export default appointmentrouter;
