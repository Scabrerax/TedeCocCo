const printAsMarkup = (tagsArray) => {
  const numOfTags = tagsArray.length;

  const parseAsMarkup = (tags) => {
    const [head, ...tail] = tags;
    const whiteSpace = " ".repeat(numOfTags - tail.length);

    if (tags.length === 1) {
      return ` <${head}>\n${whiteSpace}</${head}>`;
    }

    return ` <${head}>\n${whiteSpace}${parseAsMarkup(tail)}\n${whiteSpace}</${head}>`;
  };

  console.log(parseAsMarkup(tagsArray));
};

printAsMarkup([1, 2, 3, 4, 5, 6]);
