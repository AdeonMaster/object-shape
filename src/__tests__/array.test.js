import ObjectShape from '../';

describe('array', () => {
  const shape = new ObjectShape({
    items: ObjectShape.array,
  });

  it('should return true', () => {
    const object = {
      items: ['First', 'Second'],
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      items: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
