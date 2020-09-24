import React from "react";
import { Form } from "./Form";
import { Container, Row } from "react-bootstrap";
import data from "./config.json";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const App = () => (
  <div>
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <Form data={data} />
      </Row>
    </Container>
    <Footer />
  </div>
);
