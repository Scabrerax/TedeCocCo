import React from "react";
import { Form } from "./Form";
import { Container } from "react-bootstrap";
import data from "./config.json";

export const App = () => (
  <Container>
    <Form data={data} />
  </Container>
);
