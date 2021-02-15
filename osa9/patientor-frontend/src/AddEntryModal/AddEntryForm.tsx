import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { SelectField, EntryTypeOption } from "./FormField";
import { HealthCheckEntry, EntryType } from "../types";
import { useStateValue } from "../state";
import { isDate, isHealthCheckRating } from "../utils";

/*
 * use type HealthCheckEntry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const invalidFormatError = "Invalid format";
        const errors: { [field: string]: string } = {};
        if (!isDate(values.date)) {
          errors.date = invalidFormatError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!isHealthCheckRating(values.healthCheckRating)) {
          errors.healthCheckRating = invalidFormatError;
        }
        if (values.healthCheckRating.toString() === "" ) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
               setFieldValue={setFieldValue}
               setFieldTouched={setFieldTouched}
               diagnoses={Object.values(diagnoses)}
            />   
            <Field
              label="Health check rating"
              placeholder="Health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
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