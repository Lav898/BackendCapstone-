// routes/adminRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authmiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

const adminrouter = express.Router();

// Ensure user is authenticated and is admin
adminrouter.use(authMiddleware, adminMiddleware);

// Patients CRUD (examples)
adminrouter.get('/patients', async (req, res) => {
  const patients = await Patient.find().select('-password');
  res.json(patients);
});
adminrouter.delete('/patients/:id', async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: 'Patient deleted' });
});

// Doctors CRUD
adminrouter.get('/doctors', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});
adminrouter.delete('/doctors/:id', async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: 'Doctor deleted' });
});

// Appointments CRUD
adminrouter.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find().populate('patient doctor');
  res.json(appointments);
});
adminrouter.delete('/appointments/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Appointment deleted' });
});

export default adminrouter;
