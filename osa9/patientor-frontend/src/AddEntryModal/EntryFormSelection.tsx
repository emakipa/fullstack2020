import React, { useState } from "react";
import {
  Dropdown,
  DropdownProps,
  Form
} from "semantic-ui-react";
import {
  EntryType,
  NewBaseEntry,
  NewEntry
} from "../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

// Options for selecting new entry type
const entryTypeOptions = [
  {
    key: EntryType.HealthCheck,
    text: "Health check",
    value: EntryType.HealthCheck,
    icon: "user md"
  },
  {
    key: EntryType.Hospital,
    text: "Hospital",
    value: EntryType.Hospital,
    icon: "hospital"
  },
  {
    key: EntryType.OccupationalHealthCare,
    text: "Occupational health care",
    value: EntryType.OccupationalHealthCare,
    icon: "stethoscope"
  },
];

// Initial values for the forms
const baseEntryFormInitialValues: NewBaseEntry = {
  date: "",
  description: "",
  specialist: "",
  diagnosisCodes: [],
};

const healthCheckEntryFormInitialValues: NewEntry = {
  type: EntryType.HealthCheck,
  ...baseEntryFormInitialValues,
  healthCheckRating: 0,
};

const hospitalEntryFormInitialValues: NewEntry = {
  type: EntryType.Hospital,
  ...baseEntryFormInitialValues,
  discharge: { 
    date: "",
    criteria: "",
  }
};

const occupationalHealthCareEntryFormInitialValues: NewEntry = {
  type: EntryType.OccupationalHealthCare,
  ...baseEntryFormInitialValues,
  employerName: "",
  sickLeave: { 
    startDate: "",
    endDate: "",
  }
};

export const EntryFormSelection: React.FC<Props> = ({ onSubmit, onCancel }) => {
  
  // Selected entry type
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleEntryTypeChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ): void => {
    value && setEntryType(value as EntryType);
  };

  const EntryTypeForm = () => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckEntryFormInitialValues}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={hospitalEntryFormInitialValues}
            onSubmit={onSubmit}
            onCancel={onCancel} 
          />
        );
        case EntryType.OccupationalHealthCare:
        return (
          <AddEntryForm
            initialValues={occupationalHealthCareEntryFormInitialValues}
            onSubmit={onSubmit}
            onCancel={onCancel} 
          />
        );
      default:
        return null;     
    }
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Entry type</label>
          <Dropdown
            fluid
            selection
            options={entryTypeOptions}
            onChange={handleEntryTypeChange}
            value={entryType} 
          />
        </Form.Field>
      </Form>
      <EntryTypeForm />
    </div>
  );
};

export default EntryFormSelection;