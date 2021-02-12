import React from "react";
import { Icon, Card, List } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import DiagnosisList from "./DiagnosisList";

const HealthCheckEntryDetails: React.FC<({ entry: HealthCheckEntry })> = ({ entry }) => {

  const heartIcon = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy: return <Icon color = "green" name = "heart" />;
      case HealthCheckRating.LowRisk: return <Icon color = "yellow" name = "heart" />;
      case HealthCheckRating.HighRisk: return <Icon color = "orange" name = "heart" />;
      case HealthCheckRating.CriticalRisk: return <Icon color = "red" name = "heart" />;
      default: return null;
    }
  };
  
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}{" "}<Icon name = "user md" size = "large" />
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
          <List>
            <List.Item>
              <List.Icon>
                {heartIcon()}
              </List.Icon>
            </List.Item>
          </List>
        </Card.Content>  
      </Card>
    </Card.Group>      
  );
  
};

export default HealthCheckEntryDetails;