const rules = {
  "*": { required: true },
  ">": (minLength) => ({ minLength: Number.parseInt(minLength) }),
  "<": (maxLength) => ({ maxLength: Number.parseInt(maxLength) }),
};

export const parseRules = (rulesArray) =>
  rulesArray.reduce((rulesObject, ruleString) => {
    if (ruleString.length >= 2) {
      const [actualRule, ...value] = ruleString;
      return { ...rulesObject, ...rules[actualRule](value.join("")) };
    }

    return { ...rulesObject, ...rules[ruleString] };
  }, {});
