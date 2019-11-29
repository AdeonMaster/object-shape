# Description
Object shape validator inspired by React.js prop-types

# Usage
Creating basic shape:
```js
import ObjectShape from 'object-shape-validator';

const shape = new ObjectShape({
  title: ObjectShape.string,
  tags: ObjectShape.arrayOf(ObjectShape.string),
  published: ObjectShape.bool
});
```
Validate object:
```js
const object = {
  title: 'Example title',
  tags: ['news', 'advertisement'],
  published: false
};

console.log(shape.validate(object));
```

# Build-in types
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
``ObjectShape.custom`` - custom validator function
```javascript
const shape = new ObjectShape({
  value: ObjectShape.custom((key, value) => value === 'test' || `${key} is not equals to 'test'`)
});
```
