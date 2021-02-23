import React from "react";
import { Field } from "formik";
import {
  NumberField,
  TextField
} from "../AddPatientModal/FormField";
import { EntryType } from "../types";

const EntryTypeSpecificFields: React.FC<({ entryType: EntryType })> = ({ entryType }) => {

  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health check rating"
          placeholder="Health check rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
      case EntryType.Hospital:
        return (
          <div>
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </div>
        );
      case EntryType.OccupationalHealthCare:
        return (
          <div>
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </div>
        ); 
    default:
      return null;  
  }  
};

export default EntryTypeSpecificFields;