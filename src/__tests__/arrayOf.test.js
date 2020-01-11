import ObjectShape from '../';

describe('arrayOf validator creator', () => {
  it('should return false on invalidly created validator', () => {
    const shape = new ObjectShape({
      items: ObjectShape.arrayOf(2),
    });

    const object = {
      items: ['First', 'Second'],
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});

describe('arrayOf', () => {
  const shape = new ObjectShape({
    items: ObjectShape.arrayOf(ObjectShape.string),
  });

  it('should return true', () => {
    const object = {
      items: ['First', 'Second'],
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      items: [],
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });

  it('should return false on invalid type', () => {
    const object = {
      items: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
