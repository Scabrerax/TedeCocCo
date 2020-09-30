import React, { Fragment } from "react";
import { Col, Form as BootstrapForm, FormLabel } from "react-bootstrap";
import {
  Card,
  ButtonToggle,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import { useSetState } from "./useSetState";
import "./Form.css";

export const Form = ({ data }) => {
  const [title, ...subSections] = data;
  const [state, setState] = useSetState({});

  function handleSubmit(event) {
    event.preventDefault();

    // This will be the form put request.
    fetch("http://localhost:9000/submit", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: title, fields: state }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  function handleChange(event) {
    console.log(event.target.name);
    setState({ [event.target.name]: event.target.value });
  }
  function handleCheckboxChange(event) {
    if (state[event.target.name] !== undefined) {
      setState({
        [event.target.name]: [...state[event.target.name], event.target.value],
      });
    }
    setState({
      [event.target.name]: [event.target.value],
    });
  }

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto header">
      <Card className="card-signin my-5">
        <CardBody>
          <Fragment>
            <CardTitle className="text-center">
              <h1>{title.replace("_", " ")}</h1>
            </CardTitle>
            <BootstrapForm className="form-signin">
              {subSections.map((subSection) => {
                const [subTitle, ...elements] = subSection;
                return (
                  <Fragment key={subTitle}>
                    <br />
                    <CardSubtitle>
                      <h2>{subTitle.replace("_", " ")}</h2>
                    </CardSubtitle>
                    {elements.map((element) => {
                      const label = element.split(" ")[0].replace("_", " ");
                      const type = element.split(" ")[2];

                      if (
                        !(
                          type === "radio" ||
                          type === "checkbox" ||
                          type === "select"
                        )
                      ) {
                        return (
                          <BootstrapForm.Group key={label}>
                            <CardText>
                              <FormLabel>{label}:</FormLabel>
                            </CardText>
                            <BootstrapForm.Control
                              onChange={handleChange}
                              as="input"
                              name={label}
                              type={type}
                            />
                          </BootstrapForm.Group>
                        );
                      }

                      if (
                        !(
                          type === "radio" ||
                          type === "checkbox" ||
                          type === "select"
                        )
                      ) {
                        return (
                          <BootstrapForm.Group key={label}>
                            <FormLabel>{label}</FormLabel>
                            <BootstrapForm.Control as="input" type={type} />
                          </BootstrapForm.Group>
                        );
                      }

                      const options = element.split(" ").slice(4);

                      switch (type) {
                        case "radio":
                          return (
                            <BootstrapForm.Group key={label}>
                              <CardText>
                                <FormLabel>{label}:</FormLabel>
                                <Col sm={10}>
                                  {options.map((option) => (
                                    <BootstrapForm.Check
                                      key={option}
                                      type="radio"
                                      onChange={handleChange}
                                      label={option}
                                      name={label}
                                    />
                                  ))}
                                </Col>
                              </CardText>
                            </BootstrapForm.Group>
                          );
                        case "checkbox":
                          return (
                            <BootstrapForm.Group key={label}>
                              <CardText>
                                <FormLabel>{label}:</FormLabel>
                                <Col sm={10}>
                                  {options.map((option) => (
                                    <BootstrapForm.Check
                                      key={option}
                                      onChange={handleCheckboxChange}
                                      type="checkbox"
                                      label={option}
                                      name={label}
                                    />
                                  ))}
                                </Col>
                              </CardText>
                            </BootstrapForm.Group>
                          );
                        case "select":
                          return (
                            <BootstrapForm.Group key={label}>
                              <CardText>
                                <FormLabel>{label}:</FormLabel>
                                <BootstrapForm.Control
                                  name={label}
                                  onChange={handleChange}
                                  as="select"
                                >
                                  {options.map((option) => (
                                    <option value={option} key={option}>
                                      {option}
                                    </option>
                                  ))}
                                </BootstrapForm.Control>
                              </CardText>
                            </BootstrapForm.Group>
                          );
                        default:
                          return <Fragment key={label} />;
                      }
                    })}
                  </Fragment>
                );
              })}
              <ButtonToggle
                onClick={handleSubmit}
                className="offset-9"
                size="md"
                color="primary"
              >
                Save
              </ButtonToggle>
            </BootstrapForm>
          </Fragment>
        </CardBody>
      </Card>
    </div>
  );
};
