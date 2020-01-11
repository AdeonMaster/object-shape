import ObjectShape from '../';

describe('custom validator creator', () => {
  it('should return false on invalidly created validator', () => {
    const shape = new ObjectShape({
      value: ObjectShape.custom(2),
    });

    const object = {
      value: 'test',
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});

describe('custom', () => {
  const validator = (value, prop) => value === 'test' || `'${prop} is not equals to 'test'`;

  const shape = new ObjectShape({
    value: ObjectShape.custom(validator),
  });

  it('should return true', () => {
    const object = {
      value: 'test',
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      value: 'custom',
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
