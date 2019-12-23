const matchingError = prop => `Value of "${prop}" is not matching the shape`;

class ObjectShape {
  constructor(shape) {
    this.shape = shape;
  }

  static validate(shape, object) {
    const shapeKeys = Object.keys(shape);
    const shapeKeysLen = shapeKeys.length;
    const errors = [];

    for (let i = 0; i < shapeKeysLen; ++i) {
      const shapeKey = shapeKeys[i];

      if (!Object.prototype.hasOwnProperty.call(object, shapeKey)) {
        errors.push(`${matchingError(shapeKey)}: Object does not contain "${shapeKey}" property`);
        continue;
      }

      const validator = shape[shapeKey];
      const value = object[shapeKey];
      const result = validator(value, shapeKey);

      if (result !== true) {
        errors.push(typeof(result) === 'string'
          ? result
          : matchingError(shapeKey)
        );
      }
    }

    return errors;
  }

  validate(object) {
    return ObjectShape.validate(this.shape, object);
  }
}

ObjectShape.string = (value, prop) => typeof (value) === 'string' || `${matchingError(prop)}: "${prop}" is not a string`;
ObjectShape.number = (value, prop) => typeof (value) === 'number' || `${matchingError(prop)}: "${prop}" is not a number`;
ObjectShape.func = (value, prop) => typeof (value) === 'function' || `${matchingError(prop)}: "${prop}" is not a function`;
ObjectShape.bool = (value, prop) => typeof (value) === 'boolean' || `${matchingError(prop)}: "${prop}" is not a boolean`;
ObjectShape.array = (value, prop) => Array.isArray(value) || `${matchingError(prop)}: "${prop}" is not an array`;
ObjectShape.object = (value, prop) => (typeof (value) === 'object' && !(value instanceof Array)) || `${matchingError(prop)}: "${prop}" is not an object`;

ObjectShape.instanceOf = classInstance => (value, prop) => value instanceof classInstance || `${matchingError(prop)}: "${prop}" is not instanceof "${classInstance}"`;
ObjectShape.oneOf = array => (value, prop) => array.includes(value) || `${matchingError(prop)}: "${prop}" is not included in array`;
ObjectShape.oneOfType = arrayOfTypes => (value, prop) => {
  for (let i = 0, len = arrayOfTypes.length; i < len; ++i) {
    const validator = arrayOfTypes[i];

    if (validator(value, prop) === true) {
      return true;
    }
  }
  
  return `${matchingError(prop)}: "${prop}" is not a valid type`;
} 
ObjectShape.arrayOf = validator => (value, prop) => {
  if (!Array.isArray(value)) {
    return `${matchingError(prop)}: "${prop}" is not an array`;
  }

  return (value.length && value.every(item => validator('', item) === true)) || `${matchingError(prop)}: Not every element of "${prop}" passes condition`;
}

ObjectShape.custom = validator => validator;

export default ObjectShape;
