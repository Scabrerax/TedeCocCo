const rules = {
  "*": { required: "*Campo Requerido" },
  ">": (minLength) => ({ minLength:{value: Number.parseInt(minLength), message: `*Minima longitud ${minLength} caracteres`} }),
  "<": (maxLength) => ({ maxLength:{value: Number.parseInt(maxLength), message: `*Maxima longitud ${maxLength} caracteres`} }),
};

export const parseRules = (rulesArray) =>
  rulesArray.reduce((rulesObject, ruleString) => {
    if (ruleString.length >= 2) {
      const [actualRule, ...value] = ruleString;
      return { ...rulesObject, ...rules[actualRule](value.join("")) };
    }

    return { ...rulesObject, ...rules[ruleString] };
  }, {});