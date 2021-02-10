import React from "react";
import { List } from "semantic-ui-react";
import { Diagnosis } from "../types";
import { useStateValue } from "../state";

const DiagnosisList: React.FC<({ diagnosisCodes: Array<Diagnosis["code"]> })> = ({ diagnosisCodes }) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      <List.Item>
        <List.Header>
          {diagnosisCodes.length > 1 ? "Diagnoses" : "Diagnosis"}
        </List.Header>
      </List.Item>
      {diagnosisCodes.map((code) => (           
        <List.Item key={code}>
          <List.Content>
            <List.Description>
              {code} {diagnoses[code] && diagnoses[code].name}
            </List.Description>
          </List.Content> 
        </List.Item>
      ))}
    </List>
  );
};

export default DiagnosisList;