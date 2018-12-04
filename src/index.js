'use strict';

function formatData(schema, data) {
  if (!schema) return data;
  if (schema.type === 'array') return (data || []).map(item => formatData(schema.items, item));
  else if (schema.type === 'object') {
    data = data || {};
    return Object.keys(schema.properties).reduce((formatted, key) => {
      if (!data[key]) return formatted;
      const value = formatData(schema.properties[key], data[key]);
      if (value !== undefined) formatted[key] = value;
      return formatted;
    }, {});
  }

  return data === undefined ? schema.default : data;
}

module.exports = formatData;
