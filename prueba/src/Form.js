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
                const type = element[0].split(" ")[2];

                return (
                  <BootstrapForm.Group key={subTitle}>
                    <FormLabel>{label}</FormLabel>
                    <BootstrapForm.Control as={type} />
                  </BootstrapForm.Group>
                );
              })}
            </Fragment>
          );
        })}
      </BootstrapForm>
    </Fragment>
  );
};
