import React from "react";
import { FormLabel, Form, Container } from "react-bootstrap";
import data from "./result.json";

function App() {
  const [title, ...subSections] = data;
  return (
    <Container>
      <h2>{title.replace("_", " ")}</h2>
      <Form>
        {subSections.map((subSection) => {
          const [subTitle, ...elements] = subSection;

          return (
            <React.Fragment key={subTitle}>
              <h3>{subTitle.replace("_", " ")}</h3>
              {elements.map((element) => {
                const label = element.split(" ")[0].replace("_", " ");
                const type = element[0].split(" ")[2];

                return (
                  <Form.Group key={subTitle}>
                    <FormLabel>{label}</FormLabel>
                    <Form.Control as={type} />
                  </Form.Group>
                );
              })}
            </React.Fragment>
          );
        })}
      </Form>
    </Container>
  );
}

export default App;
