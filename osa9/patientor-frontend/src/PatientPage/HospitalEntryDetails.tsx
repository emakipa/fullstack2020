import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
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
          {entry.discharge && (
            <List>
              <List.Item>
                <List.Header>
                  Discharge
                </List.Header>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Description>
                    {entry.discharge.date}{" "}{entry.discharge.criteria}
                  </List.Description>
                </List.Content> 
              </List.Item>
            </List>
          )}
        </Card.Content>  
      </Card>
    </Card.Group>      
  );
};

export default HospitalEntryDetails;