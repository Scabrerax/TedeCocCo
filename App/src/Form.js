import React, { Fragment } from "react";
import { Col, Form as BootstrapForm, FormLabel } from "react-bootstrap";

export const Form = ({ data }) => {
  const [title, ...subSections] = data;

  return (
    <Fragment>
      <h2>{title.replace("_", " ")}</h2>
      <BootstrapForm>
        {subSections.map((subSection) => {
          const [subTitle, ...elements] = subSection;

          return (
            <Fragment key={subTitle}>
              <h3>{subTitle.replace("_", " ")}</h3>
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
                        <FormLabel>{label}</FormLabel>
                        <Col sm={10}>
                          {options.map((option) => (
                            <BootstrapForm.Check
                              key={option}
                              type="radio"
                              label={option}
                              name={label}
                            />
                          ))}
                        </Col>
                      </BootstrapForm.Group>
                    );
                  case "checkbox":
                    return (
                      <BootstrapForm.Group key={label}>
                        <FormLabel>{label}</FormLabel>
                        <Col sm={10}>
                          {options.map((option) => (
                            <BootstrapForm.Check
                              key={option}
                              type="checkbox"
                              label={option}
                              name={label}
                            />
                          ))}
                        </Col>
                      </BootstrapForm.Group>
                    );
                  case "select":
                    return (
                      <BootstrapForm.Group key={label}>
                        <FormLabel>{label}</FormLabel>
                        <BootstrapForm.Control as="select">
                          {options.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </BootstrapForm.Control>
                      </BootstrapForm.Group>
                    );
                  default:
                    return <Fragment key={label} />;
                }
              })}
            </Fragment>
          );
        })}
      </BootstrapForm>
    </Fragment>
  );
};
