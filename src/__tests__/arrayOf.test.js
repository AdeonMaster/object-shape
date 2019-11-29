import ObjectShape from '../';

describe('arrayOf', () => {
  const shape = new ObjectShape({
    items: ObjectShape.arrayOf(ObjectShape.string)
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
      items: []
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });

  it('should return false on invalid type', () => {
    const object = {
      items: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
