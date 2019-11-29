import ObjectShape from '../';

describe('cusom', () => {
  const validator = (prop, value) => value === 'test' || `'${prop} is not equals to 'test'`;

  const shape = new ObjectShape({
    value: ObjectShape.custom(validator)
  });

  it('should return true', () => {
    const object = {
      value: 'test'
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      value: 'custom'
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
