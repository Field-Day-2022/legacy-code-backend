const SCHEMAS = require('../../../util/inputSchemas-cjs').SCHEMAS;

const parseInput = line => {
  const split = line.trim().split('|');
  const input = {
    name: split[0],
    type: split[1],
  };
  const hasOptions = SCHEMAS[input.type].options;
  if (hasOptions) {
    input.options = split[2].split(',');
  }
  return input;
};

module.exports.createDataForm = fixture => {
  const lines = fixture.split('\n');

  const form = {
    name: lines[0],
    id: lines[0].substring(0, lines[0].indexOf(' ')).toLowerCase(),
    inputs: [],
  };

  const inputLines = lines.splice(1);
  inputLines.forEach(line => {
    form.inputs.push(parseInput(line));
  });

  return form;
};

module.exports.createSessionForm = fixture => {
  const lines = fixture.split('\n');

  const form = {
    name: lines[0],
    id: lines[0].substring(0, lines[0].indexOf(' ')).toLowerCase(),
    initialInputs: [],
    finalInputs: [],
  };

  let initial = true;
  lines.splice(1).forEach(line => {
    if (line === '') {
      initial = false;
    } else {
      form[initial ? 'initialInputs' : 'finalInputs'].push(parseInput(line));
    }
  });

  return form;
};
