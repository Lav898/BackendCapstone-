import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    specialization: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: { type: Number, required: true },
    password: { type: String, required: true }  // 👈 Added for login
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
