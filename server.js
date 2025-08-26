import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import patientrouter from "./routes/patientRoutes.js";
import doctorrouter from "./routes/doctorRoutes.js";
import appointmentrouter from "./routes/appointmentRoutes.js";
import authrouter from "./routes/authRoutes.js";
import cors from "cors";
import adminrouter from './routes/adminRoutes.js';

dotenv.config();
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/patients", patientrouter);
app.use("/api/doctors", doctorrouter);
app.use("/api/appointments", appointmentrouter);
app.use("/api/auth", authrouter);
app.use('/api/admin', adminrouter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
