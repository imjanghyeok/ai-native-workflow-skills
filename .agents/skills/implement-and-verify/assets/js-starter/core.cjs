'use strict';

function analyze(input) {
  if (!input || !Array.isArray(input.records) || input.records.some(
    record => !record || typeof record !== 'object' || Array.isArray(record)
  )) {
    throw new Error('records must be an array of objects');
  }
  // Replace this example rule with the actual task requirements.
  return { recordCount: input.records.length };
}

module.exports = { analyze };
