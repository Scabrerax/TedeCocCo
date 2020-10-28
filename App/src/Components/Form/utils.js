const rules = {
  "*": { required: "*Campo Requerido" },
  ">": (minLength) => ({
    minLength: {
      value: Number.parseInt(minLength),
      message: `*Minima longitud ${minLength} caracteres`,
    },
  }),
  "<": (maxLength) => ({
    maxLength: {
      value: Number.parseInt(maxLength),
      message: `*Maxima longitud ${maxLength} caracteres`,
    },
  }),
  m: (max) => ({
    max: { value: Number.parseInt(max), message: `*El valor maximo es ${max}` },
  }),
  p: (min) => ({
    min: { value: Number.parseInt(min), message: `*El valor minimo es ${min}` },
  }),
  u: {
    pattern: { value: /\b[A-Z]+\b/, message: `*Solo se permiten mayusculas` },
  },
  l: {
    pattern: { value: /\b[a-z]+\b/, message: `*Solo se permiten minusculas` },
  },
  s: { pattern: { value: /^\S+$/, message: `*No se permiten espacios` } },
  t: { pattern: { value: /\b[a-zA-Z]+\b/, message: `*Solo se permite texto` } },
};

export const parseRules = (rulesArray) =>
  rulesArray.reduce((rulesObject, ruleString) => {
    if (ruleString.length >= 2) {
      const [actualRule, ...value] = ruleString;
      return { ...rulesObject, ...rules[actualRule](value.join("")) };
    }

    return { ...rulesObject, ...rules[ruleString] };
  }, {});
