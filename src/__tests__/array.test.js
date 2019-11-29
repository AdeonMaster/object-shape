import ObjectShape from '../';

describe('array', () => {
  const shape = new ObjectShape({
    items: ObjectShape.array
  });

  it('should return true', () => {
    const object = {
      items: ['First', 'Second']
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      items: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
