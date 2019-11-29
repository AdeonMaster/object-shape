import ObjectShape from '../';

describe('bool', () => {
  const shape = new ObjectShape({
    published: ObjectShape.bool
  });

  it('should return true', () => {
    const object = {
      published: true
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      published: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
