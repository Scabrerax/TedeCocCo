import React, { Fragment } from "react";
import { Form as BootstrapForm, FormLabel } from "react-bootstrap";

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
                //const type = element.split(" ")[2];

                switch (type) {
                  case "input": {
                    return (
                      <BootstrapForm.Group key={label}>
                        <FormLabel>{label}</FormLabel>
                        <BootstrapForm.Control type="text" />
                      </BootstrapForm.Group>
                    );
                  }
                  case "password": {
                    return (
                      <BootstrapForm.Group key={label}>
                        <FormLabel>{label}</FormLabel>
                        <BootstrapForm.Control type="password" placeholder="Password" />n
                      </BootstrapForm.Group>
                    );
                  }
                  case "mail": {
                    return (
                      <BootstrapForm.Group key={label}>
                        <FormLabel>{label}</FormLabel>
                        <BootstrapForm.Control type="email" placeholder="name@example.com" />
                      </BootstrapForm.Group>
                    );
                  }
                  case "option": {
                    return (
                      <BootstrapForm.Group key={label}>
                        <FormLabel>{label}</FormLabel>
                        <Form.Control as="select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </Form.Control>
                      </BootstrapForm.Group>
                    );
                  }
                  default:
                    return <React.Fragment key={label}></React.Fragment>;
                }
              })}
            </Fragment>
          );
        })}
      </BootstrapForm>
    </Fragment>
  );
};
