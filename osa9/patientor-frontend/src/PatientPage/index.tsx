import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import Footer from "./Footer";

const PatientPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient.id !== id) { 
      fetchPatient();
    }
  }, [id, dispatch, patient]);

  if (!patient) {
    return null;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Male: return <Icon name = "mars" />;
      case Gender.Female: return <Icon name = "venus" />;
      case Gender.Other: return <Icon name = "genderless" />;
      default: return null;
    }
  };
 
  return (
    <div className="App">
      <Container textAlign="left">
        <div>
          <h2>{patient.name} {genderIcon()}</h2>
          <b>SSN:</b>{' '}{patient.ssn}
          <br />
          <b>Occupation:</b>{' '}{patient.occupation}
        </div>
        {patient.entries.length > 0 ? <h3>Entries</h3> : <h3>No entries</h3>}
        <div>
          {patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} /> 
          ))}
        </div>
        {patient.entries.length > 0 && <Footer />}
      </Container>      
    </div>
  );
};

export default PatientPage;