/*
 * File: formBuilder.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Creates data and session forms for the app to use.
 */

//retrieve file containing the database schemas
const SCHEMAS = require('../../../util/inputSchemas-cjs').SCHEMAS;

/**
 * Parses and builds the schemas from the file.
 * @return the constructed schema.
 */
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

/**
 * Builds a data form.
 * @return the completed data form.
 */
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

/** 
 * Builds a session form.
 * @return the completed session form.
 */
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
