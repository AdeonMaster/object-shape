import ObjectShape from '../';

describe('func', () => {
  const shape = new ObjectShape({
    test: ObjectShape.func,
  });

  it('should return true', () => {
    const object = {
      test: () => {},
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      test: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
