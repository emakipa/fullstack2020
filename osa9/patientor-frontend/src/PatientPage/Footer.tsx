import React from "react";
import { Container, Icon } from "semantic-ui-react";

const Footer: React.FC = () => {

  return (
    <div>
      <Container textAlign="left">
        <div>
        <br/>
          Health check{" "}<Icon name = "user md" />{" "}Hospital{" "}<Icon name = "hospital" />{" "}Occupational health care{" "}<Icon name = "stethoscope" />
        </div>
      </Container>      
    </div>
  );
};

export default Footer;