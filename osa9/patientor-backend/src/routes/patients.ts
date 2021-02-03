import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

// Get patients
router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

// Get one patient
router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getOnePatient(req.params.id);
    res.send(patient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(404).send(error.message);
  }
});

// Add patient
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;