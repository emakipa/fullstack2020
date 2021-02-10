import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

const HospitalEntryDetails: React.FC<({ entry: HospitalEntry })> = ({ entry }) => {
  
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}{" "}<Icon name = "hospital" size = "large" />
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
            <h5>{entry.discharge && "Discharge"}</h5>
          </div>
          <Card.Description>
            {entry.discharge && entry.discharge.date}{" "}{entry.discharge && entry.discharge.criteria}
          </Card.Description>
        </Card.Content>  
      </Card>
    </Card.Group>      
  );
};

export default HospitalEntryDetails;