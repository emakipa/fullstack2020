/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions */
import { 
  Diagnosis,
  Discharge,
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  SickLeave
} from './types';

// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Type guard, string validation function
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// To check valid date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Type guard, Gender validation function
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// Type guard, health check rating validation function
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// Type guard, Entry type validation function
const isEntryType = (param: any): param is Entry => {
  return Object.values(EntryType).includes(param.type);
};

// Parse name
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

// Parse SSN
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }
  return ssn;
};

// Parse date
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of birth: ${date}`);
  }
  return date;
};

// Parse occupation
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

// Parse gender
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

// Parse entry type
const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isEntryType(entry)) {
    throw new Error(`Incorrect or missing entry: ${entry}`);
  }
  return entry;
};

// Parse description
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

// Parse specialist
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

// Parse diagnosis codes
const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!diagnosisCodes) return diagnosisCodes;

  if (Array.isArray(diagnosisCodes) && diagnosisCodes.every((code: any) => isString(code))) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnosisCodes;
  } else {
    throw new Error("Invalid diagnosis code(s)");
  }
};

// Parse health check rating
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === null || healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

// Parse discharge
const parseDischarge = (discharge: any): Discharge => {
  return {
    date: parseDate(discharge.date),
    criteria: parseName(discharge.criteria),
  };
};

// Parse employer name
const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  }
  return employerName;
};

// Parse sick leave
const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  const entry = parseEntry(object);

  const newEntry: NewBaseEntry = {
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
  
  switch (entry.type) {
    case EntryType.HealthCheck:
      return {
        ...newEntry,
        type: entry.type,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case EntryType.Hospital:
      return { 
        ...newEntry,
        type: entry.type,
        discharge: parseDischarge(entry.discharge) 
      };
    case EntryType.OccupationalHealthCare:
      return {
        ...newEntry,
        type: entry.type,
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),
      };
    default:
      return assertNever(entry);
  }
};