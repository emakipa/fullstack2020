import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
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
          {entry.sickLeave && (
            <List>
              <List.Item>
                <List.Header>
                  Sick leave
                </List.Header>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Description>
                    {`Start date: ${entry.sickLeave.startDate}`}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content> 
                  <List.Description>
                    {`End date: ${entry.sickLeave.endDate}`}
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

export default OccupationalHealthCareEntryDetails;