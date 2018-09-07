'use strict';

function formatData(schema, data) {
  if (!schema || data === undefined || data === null) return data;

  if (schema.type === 'array') return data.map(item => formatData(schema.items, item));
  else if (schema.type === 'object') {
    return Object.keys(schema.properties).reduce((formatted, key) => {
      const value = formatData(schema.properties[key], data[key]);
      if (value !== undefined) formatted[key] = value;
      return formatted;
    }, {});
  }
  return data;
}

module.exports = formatData;
