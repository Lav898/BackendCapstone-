import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" }
});

export default mongoose.model("User", userSchema);
