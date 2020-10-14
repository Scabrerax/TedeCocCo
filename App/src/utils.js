const rules = {
  "*": { required: true },
  ">": (minValue) => ({ minLength: Number.parseInt(minValue) }),
  "<": (maxValue) => ({ maxLength: Number.parseInt(maxValue) }),
  U: { pattern: /[[:upper:]]+/g },
  L: { pattern: /[[:lower:]]+/g },
};

export const parseRules = (rulesArray) =>
  rulesArray.reduce((rulesObject, ruleString) => {
    if (ruleString.length > 1) {
      const [actualRule, ...value] = ruleString;
      return { ...rulesObject, ...rules[actualRule](value) };
    }

    return { ...rulesObject, ...rules[ruleString] };
  }, {});
