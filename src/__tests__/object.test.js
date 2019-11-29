import ObjectShape from '../';

describe('object', () => {
  const shape = new ObjectShape({
    user: ObjectShape.object
  });

  it('should return true', () => {
    const object = {
      user: {
        name: 'Andy'
      }
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = [];

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
