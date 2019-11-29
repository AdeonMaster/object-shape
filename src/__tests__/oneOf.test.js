import ObjectShape from '../';

describe('oneOf', () => {
  const shape = new ObjectShape({
    item: ObjectShape.oneOf(['test', true])
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
