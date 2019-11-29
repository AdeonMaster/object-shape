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