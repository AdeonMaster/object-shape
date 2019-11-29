import ObjectShape from '../';

describe('func', () => {
  const shape = new ObjectShape({
    test: ObjectShape.func
  });

  it('should return true', () => {
    const object = {
      test: () => {}
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      test: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
