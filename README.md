# Object Shape Validator
Object shape validator inspired by React.js prop-types

## Installation
Use the [npm](https://www.npmjs.com/get-npm) to install the module

```bash
npm install object-shape-validator
```

## Usage
Creating basic shape and validate it:
```js
import ObjectShape from 'object-shape-validator';

const shape = new ObjectShape({
  title: ObjectShape.string,
  tags: ObjectShape.arrayOf(ObjectShape.string),
  published: ObjectShape.bool
});

const object = {
  title: 'Example title',
  tags: ['news', 'advertisement'],
  published: false
};

const errors = shape.validate(object);
console.log(errors);
```

Validate with static method:
```js
const errors = ObjectShape.validate(shape, object);

console.log(errors);
```

## Options argument

You can also pass additional parameters as the last argument to validation function

```js
const errors = shape.validate(object, {
  suppressOwnPropertiesValidation: true
});

console.log(errors);
```

## List of options

- **suppressOwnPropertiesValidation**: Disable validation for own properties. Useful when is needed to validate just few properties of an object to match the shape

## Build-in types
``ObjectShape.string`` - validates if value is string
```javascript
const shape = new ObjectShape({
  title: ObjectShape.string
});
```
``ObjectShape.number`` - validates if value is number
```javascript
const shape = new ObjectShape({
  age: ObjectShape.number
});
```
``ObjectShape.func`` - validates if value is func
```javascript
const shape = new ObjectShape({
  test: ObjectShape.func
});
```
``ObjectShape.bool`` - validates if value is boolean
```javascript
const shape = new ObjectShape({
  published: ObjectShape.bool
});
```
``ObjectShape.array`` - validates if value is array
```javascript
const shape = new ObjectShape({
  items: ObjectShape.array
});
```
``ObjectShape.object`` - validates if value is object
```javascript
const shape = new ObjectShape({
  user: ObjectShape.object
});
```
``ObjectShape.instanceOf`` - validates if value is instanceof class
```javascript
class Animal {
  constuctor(type) {
    this.type = type;
  }
}

class Dog extends Animal {
  constructor() {
    super('dog');
  }
}

const shape = new ObjectShape({
  pet: ObjectShape.instanceOf(Dog)
});
```
``ObjectShape.oneOf`` - validates if value is equal to one of the values
```javascript
const shape = new ObjectShape({
  value: ObjectShape.oneOf(['First', 'Second'])
});
```
``ObjectShape.oneOfType`` - validates if value is one of the types
```javascript
const shape = new ObjectShape({
  value: ObjectShape.oneOfType([
    ObjectShape.string,
    ObjectShape.bool
  ])
});
```
``ObjectShape.arrayOf`` - validates if value is array of type
```javascript
const shape = new ObjectShape({
  items: ObjectShape.arrayOf(ObjectShape.string)
});
```
``ObjectShape.objectOf`` - validates if value is a valid shape
```javascript
const shape = new ObjectShape({
  user: {
    fname: ObjectShape.string,
    lname: ObjectShape.string,
    age: ObjectShape.number 
  }
});
```
``ObjectShape.custom`` - custom validator function
```javascript
const shape = new ObjectShape({
  value: ObjectShape.custom((value, key) => value === 'test' || `${key} is not equals to 'test'`)
});
```
or
```javascript
const shape = new ObjectShape({
  value: (value, key) => value === 'test' || `${key} is not equals to 'test'`,
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
