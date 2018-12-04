'use strict';

function formatData(schema, data) {
  if (!schema) return data;
  if (schema.type === 'array') {
  	const children = (data || []).map(item => formatData(schema.items, item));
    return children.length ? children : undefined;
  }
  else if (schema.type === 'object') {
    data = data || {};
    const child = Object.keys(schema.properties).reduce((formatted, key) => {
      const value = formatData(schema.properties[key], data[key]);
      if (value !== undefined) formatted[key] = value;
      return formatted;
    }, {});
    return Object.keys(child).length ? child : undefined;
  }

  return data === undefined ? schema.default : data;
}

module.exports = formatData;
