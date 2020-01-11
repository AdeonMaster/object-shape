import ObjectShape from '../';

describe('bool', () => {
  const shape = new ObjectShape({
    published: ObjectShape.bool,
  });

  it('should return true', () => {
    const object = {
      published: true,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      published: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
