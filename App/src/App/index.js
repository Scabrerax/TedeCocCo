import React from "react";
import { Form } from "../Components/Form";
import { Container } from "react-bootstrap";
import jsonGeneratedData from "../config.json";

export const App = () => (
  <Container>
    <Form data={jsonGeneratedData} />
  </Container>
);
