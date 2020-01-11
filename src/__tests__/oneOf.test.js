import ObjectShape from '../';

describe('oneOf validator creator', () => {
  it('should return false on invalidly created validator', () => {
    const shape = new ObjectShape({
      item: ObjectShape.oneOf({ value: 2 }),
    });

    const object = {
      item: ['First', 'Second'],
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});

describe('oneOf', () => {
  const shape = new ObjectShape({
    item: ObjectShape.oneOf(['test', true]),
  });

  it('should return true', () => {
    const object = {
      item: 'test',
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      item: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
