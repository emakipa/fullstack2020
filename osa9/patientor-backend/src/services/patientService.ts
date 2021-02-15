import patientData from '../../data/patients';
import {
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient
} from '../types';
import { v1 as uuid } from 'uuid';

// Get non-sensitive patient data (ssn is not included)
const getPatients = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// Get all information for one patient
const getOnePatient = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};

// Add new patient
const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

// Add entry for a patient
const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {

  // Create entry with id
  const entry =  {
    id: uuid(),
    ...newEntry
  };

  // Add new entry to patient's entries
  patient.entries.unshift(entry);

  return patient;
};

export default {
  getPatients,
  getOnePatient,
  addPatient,
  addEntry
};