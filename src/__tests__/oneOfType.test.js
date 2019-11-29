import ObjectShape from '../';

describe('oneOfType', () => {
  const shape = new ObjectShape({
    item: ObjectShape.oneOfType([
      ObjectShape.string,
      ObjectShape.bool
    ])
  });

  it('should return true', () => {
    const object = {
      item: 'test'
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      item: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
