import React from "react";
import { Grid, Button, Divider } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { EntryType, NewEntry } from "../types";
import { isDate, isHealthCheckRating } from "../utils";
import EntryTypeSpecificFields from "./EntryTypeSpecificFields";
import BaseEntryFields from "./BaseEntryFields";

interface Props {
  initialValues: NewEntry;
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ initialValues, onSubmit, onCancel }) => {

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true} 
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const invalidFormatError = "Invalid format";
        let errors:
          | { [field: string]: string } 
          | { 
              [field: string]: { 
                [key: string]: string;
              };
            } = {};
        if (!isDate(values.date)) {
          errors.date = invalidFormatError + ", date format YYYY-MM-DD";
        }
        if (!values.date) {
          errors.date = requiredError + ", date format YYYY-MM-DD";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.HealthCheck) {
          if (!isHealthCheckRating(values.healthCheckRating)) {
            errors.healthCheckRating = invalidFormatError + ", accepted rating values: 0 - 3";
          }
          if (values.healthCheckRating.toString() === "" ) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type === EntryType.Hospital) {
          if (!values.discharge?.date && !values.discharge?.criteria) {
            errors = { ...errors, discharge: { date: requiredError, criteria: requiredError } };
          }
          if (!values.discharge?.date && values.discharge?.criteria) {
            errors = { ...errors, discharge: { date: requiredError, criteria: "" } };
          }
          if (values.discharge?.date && !values.discharge?.criteria) {
            errors = { ...errors, discharge: { date: "", criteria: requiredError } };
            if (!isDate(values.discharge?.date)) {
              errors = { ...errors, discharge: { date: invalidFormatError + ", date format YYYY-MM-DD", criteria: requiredError } };
            }
          }
          if (values.discharge?.date && values.discharge?.criteria) {
            if (!isDate(values.discharge?.date)) {
              errors = { ...errors, discharge: { date: invalidFormatError + ", date format YYYY-MM-DD", criteria: "" } };
            }
          }  
        }      
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (   
          <Form className="form ui">

            <Divider className="ui hidden divider" />

            <BaseEntryFields setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} /> 

            <Divider className="ui hidden divider" />

            <EntryTypeSpecificFields entryType={values.type}/>   
  
            <Divider className="ui hidden divider" />
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button 
                  type="button"
                  onClick={onCancel}
                  color="red"
                >
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;