import ObjectShape from '../';

describe('object', () => {
  const shape = new ObjectShape({
    user: ObjectShape.object,
  });

  it('should return true', () => {
    const object = {
      user: {
        name: 'Andy',
      },
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {};

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
