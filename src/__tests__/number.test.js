import ObjectShape from '../';

describe('number', () => {
  const shape = new ObjectShape({
    age: ObjectShape.number
  });

  it('should return true', () => {
    const object = {
      age: 41
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      age: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
