const isString = value => typeof (value) === 'string';
const isNumber = value => typeof (value) === 'number';
const isFunction = value => typeof (value) === 'function';
const isBoolean = value => typeof (value) === 'boolean';
const isArray = value => Array.isArray(value);
const isObject = value => (typeof (value) === 'object' && !(value instanceof Array));

const formatMatchingErrorMessage = prop => `Value of "${prop}" is not matching the shape`;
const shapeValidatorCreateError = 'Error while creating shape validator';

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
        errors.push(`${formatMatchingErrorMessage(shapeKey)}: Object does not contain "${shapeKey}" property`);
        continue;
      }

      const validator = shape[shapeKey];

      if (!isFunction(validator)) {
        errors.push(`${formatMatchingErrorMessage(shapeKey)}: "${shapeKey}" is not a valid validator function`);
        continue;
      }

      const value = object[shapeKey];
      const result = validator(value, shapeKey);

      if (result !== true) {
        errors.push(typeof(result) === 'string'
          ? result
          : formatMatchingErrorMessage(shapeKey)
        );
      }
    }

    return errors;
  }

  validate(object) {
    return ObjectShape.validate(this.shape, object);
  }
}

// simple validators
ObjectShape.string = (value, prop) => isString(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not a string`;
ObjectShape.number = (value, prop) => isNumber(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not a number`;
ObjectShape.func = (value, prop) => isFunction(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not a function`;
ObjectShape.bool = (value, prop) => isBoolean(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not a boolean`;
ObjectShape.array = (value, prop) => isArray(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not an array`;
ObjectShape.object = (value, prop) => isObject(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not an object`;

// validator creators (complex validators)
ObjectShape.instanceOf = classInstance => (value, prop) => {
  if (!isFunction(classInstance)) {
    return `${shapeValidatorCreateError}: "instanceOf" first argument is not a valid instance of class`;
  }

  return value instanceof classInstance || `${formatMatchingErrorMessage(prop)}: "${prop}" is not instanceof "${classInstance}"`;
}

ObjectShape.oneOf = array => (value, prop) => {
  if (!isArray(array)) {
    return `${shapeValidatorCreateError}: "oneOf" first argument is not an array`;
  }

  return array.includes(value) || `${formatMatchingErrorMessage(prop)}: "${prop}" is not included in array`;
}

ObjectShape.oneOfType = arrayOfTypes => (value, prop) => {
  if (!isArray(arrayOfTypes)) {
    return `${shapeValidatorCreateError}: "oneOfType" first argument is not an array`;
  }

  for (let i = 0, len = arrayOfTypes.length; i < len; ++i) {
    const validator = arrayOfTypes[i];

    if (validator(value, prop) === true) {
      return true;
    }
  }

  return `${formatMatchingErrorMessage(prop)}: "${prop}" is not a valid type`;
}

ObjectShape.arrayOf = validator => (value, prop) => {
  if (!isFunction(validator)) {
    return `${shapeValidatorCreateError} "arrayOf" first argument is not a function`;
  }

  if (!Array.isArray(value)) {
    return `${formatMatchingErrorMessage(prop)}: "${prop}" is not an array`;
  }

  return (value.length && value.every(item => validator('', item) === true)) || `${formatMatchingErrorMessage(prop)}: Not every element of "${prop}" passes condition`;
}

ObjectShape.objectOf = shape => (value, prop) => {
  if (!isObject(shape)) {
    return `${shapeValidatorCreateError}: "objectOf" first argument is not an object`;
  }

  if (!isObject(value)) {
    return `${formatMatchingErrorMessage(prop)}: "${prop}" is not an object`;
  }

  const errors = new ObjectShape(shape).validate(value);
  if (errors.length) {
    return `${formatMatchingErrorMessage(prop)}: "${prop}" shape didn't passed the validation (${errors.join(', ')})`
  }

  return true;
}

ObjectShape.custom = validator => validator;

export default ObjectShape;
