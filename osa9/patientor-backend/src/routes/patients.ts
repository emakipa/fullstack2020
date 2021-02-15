import express from 'express';
import patientService from '../services/patientService';
import { 
  toNewEntry,  
  toNewPatient
} from '../utils';

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

// Add a patient
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

// Add entry for a patient
router.post('/:id/entries', (req, res) => {
  // Find patient by patient id
  const patient = patientService.getOnePatient(req.params.id);

  if (patient) {
    try {
      // Validate new entry
      const newEntry = toNewEntry(req.body);

      // Add entry to patient
      const patientWithAddedEntry = patientService.addEntry(patient, newEntry);
      res.json(patientWithAddedEntry);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(error.message);
    }
  } else {
    res.status(400).send({ error: 'Patient with given id does not exist' });
  }  
});

export default router;