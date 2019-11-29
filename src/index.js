class ObjectShape {
  constructor(shape) {
    this.shape = shape;
    this.shapeKeys = Object.keys(shape);
    this.shapeKeysLen = this.shapeKeys.length;
  }
  
  validate(object) {
    for (let i = 0; i < this.shapeKeysLen; ++i) {
      const key = this.shapeKeys[i];
      
      if (!object.hasOwnProperty(key)) {
        /* eslint-disable no-console */
        console.log(`Object does not contain '${key}' property`);

        return false;
      }
      
      const validator = this.shape[key];
      const value = object[key];
      const result = validator(key, value);
      
      if (result !== true) {
        /* eslint-disable no-console */
        console.log(result);

        return false;
      }
    }
    
    return true;
  }
}

ObjectShape.string = (prop, value) => typeof (value) === 'string' || `Value of '${prop}' is not matching the shape: '${prop}' is not a string`;
ObjectShape.number = (prop, value) => typeof (value) === 'number' || `Value of '${prop}' is not matching the shape: '${prop}' is not a number`;
ObjectShape.func = (prop, value) => typeof (value) === 'function' || `Value of '${prop}' is not matching the shape: '${prop}' is not a function`;
ObjectShape.bool = (prop, value) => typeof (value) === 'boolean' || `Value of '${prop}' is not matching the shape: '${prop}' is not a boolean`;
ObjectShape.array = (prop, value) => Array.isArray(value) || `'Value of '${prop}' is not matching the shape: ${prop}' is not an array`;
ObjectShape.object = (prop, value) => (typeof (value) === 'object' && !(value instanceof Array)) || `'Value of '${prop}' is not matching the shape: ${prop}' is not an object`;

ObjectShape.instanceOf = classInstance => (prop, value) => value instanceof classInstance || `Value of '${prop}' is not matching the shape: '${prop}' is not instanceof '${classInstance}'`;
ObjectShape.oneOf = array => (prop, value) => array.includes(value) || `'Value of '${prop}' is not matching the shape: ${prop}' is not included in array`;
ObjectShape.oneOfType = arrayOfTypes => (prop, value) => {
  for (let i = 0, len = arrayOfTypes.length; i < len; ++i) {
    const validator = arrayOfTypes[i];
    
    if (validator('', value) === true) {
      return true;
    }
  }
  
  return `Value of '${prop}' is not matching the shape: '${prop}' is not a valid type`;
} 
ObjectShape.arrayOf = validator => (prop, value) => (value.length && value.every(item => validator('', item) === true)) || `Value of '${prop}' is not matching the shape: Not every element of '${prop}' passes condition`;

ObjectShape.custom = validator => validator;

export default ObjectShape;
