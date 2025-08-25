import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: { type: String, required: true, unique: true },
    gender: String,
    contact: String,
    address: String,
    medicalHistory: String,
    password: String
});

export default mongoose.model("Patient", patientSchema);
