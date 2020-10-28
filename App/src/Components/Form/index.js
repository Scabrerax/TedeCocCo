import React, { Fragment } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Col, Form as BootstrapForm, FormLabel } from "react-bootstrap";
import {
  Card,
  ButtonToggle,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import "./index.css";
import { useForm } from "react-hook-form";
import { takeRight } from "lodash-es";
import { parseRules } from "./utils";

const getFieldWithOptions = (options, label, controller) => ({
  radio: (
    <BootstrapForm.Group key={label}>
      <CardText>
        <FormLabel>{label}:</FormLabel>
        <Col sm={10}>
          {options.map((option) => (
            <BootstrapForm.Check
              key={option}
              type="radio"
              ref={controller.register()}
              label={option}
              value={option}
              name={label}
            />
          ))}
        </Col>
      </CardText>
    </BootstrapForm.Group>
  ),
  checkbox: (
    <BootstrapForm.Group key={label}>
      <CardText>
        <FormLabel>{label}:</FormLabel>
        <Col sm={10}>
          {options.map((option) => (
            <BootstrapForm.Check
              key={option}
              name={label}
              ref={controller.register()}
              type="checkbox"
              value={option}
              label={option}
            />
          ))}
        </Col>
      </CardText>
    </BootstrapForm.Group>
  ),
  select: (
    <BootstrapForm.Group key={label}>
      <CardText>
        <FormLabel>{label}:</FormLabel>
        <BootstrapForm.Control
          name={label}
          ref={controller.register()}
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
  ),
});

export const Form = ({ data }) => {
  const [title, ...subSections] = data;

  const { handleSubmit, errors, register } = useForm();
  const onSubmit = async (data) => {
    fetch("http://localhost:9000/submit", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: title, fields: data }),
    }).then(() => alert("Tus datos fueron enviados"));
  };

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto header">
      <Card className="card-signin my-5">
        <CardBody>
          <Fragment>
            <CardTitle className="text-center">
              <h1>{title.replace("_", " ")}</h1>
            </CardTitle>
            <BootstrapForm
              onSubmit={handleSubmit(onSubmit)}
              className="form-signin"
            >
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

                      const [_, rulesString] = takeRight(element.split(" "), 2);
                      const hasRules = /regla/i.exec(_) ? true : false;
                      const rulesObject = hasRules
                        ? parseRules(rulesString.split("-"))
                        : undefined;

                      if (type === "textarea") {
                        return (
                          <BootstrapForm.Group key={label}>
                            <CardText>
                              <FormLabel>{label}:</FormLabel>
                              <BootstrapForm.Control
                                name={label}
                                ref={register()}
                                as="textarea"
                              />
                            </CardText>
                          </BootstrapForm.Group>
                        );
                      }

                      if (
                        type !== "radio" &&
                        type !== "checkbox" &&
                        type !== "select"
                      ) {
                        return (
                          <BootstrapForm.Group key={label}>
                            <CardText>
                              <FormLabel>{label}:</FormLabel>
                            </CardText>
                            <BootstrapForm.Control
                              ref={register(rulesObject)}
                              as="input"
                              name={label}
                              type={type}
                              step={type === "number" ? "0.01" : undefined}
                            />
                            <div className="errorsito">
                              <ErrorMessage
                                errors={errors}
                                name={label}
                                message={errors[label]}
                              />
                            </div>
                          </BootstrapForm.Group>
                        );
                      }

                      const options = hasRules
                        ? element
                            .split(" ")
                            .slice(4, element.split(" ").length - 2)
                        : element.split(" ").slice(4);

                      return getFieldWithOptions(options, label, { register })[
                        type
                      ];
                    })}
                  </Fragment>
                );
              })}
              <ButtonToggle
                type="submit"
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
