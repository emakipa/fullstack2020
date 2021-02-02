import patientData from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

// Get non-sensitive patient data (ssn is not included)
const getPatients = (): NonSensitivePatientData[]=> {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// Add new patient
const addPatient = (patient: NewPatientEntry): Patient => {

  const newPatientEntry = {
    id: uuid(),
    ...patient
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};