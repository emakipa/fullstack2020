import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { OccupationalHealthCareEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

const OccupationalHealthCareEntryDetails: React.FC<({ entry: OccupationalHealthCareEntry })> = ({ entry }) => {
  
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}{" "}<Icon name = "stethoscope" size = "large" />{" "}{entry.employerName}
          </Card.Header>
          <Card.Meta>
            by {entry.specialist}
            </Card.Meta>
          <Card.Description>
            <i color = "grey">{entry.description}</i> 
          </Card.Description>
          {entry.diagnosisCodes && (
            <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
          )}
          <div>
            <h5>{entry.sickLeave && "Sick leave"}</h5>
          </div>
          <Card.Description>
            {entry.sickLeave && `Start date:  ${entry.sickLeave.startDate} End date:  ${entry.sickLeave.endDate}`}
          </Card.Description>
        </Card.Content>  
      </Card>
    </Card.Group>      
  );
};

export default OccupationalHealthCareEntryDetails;