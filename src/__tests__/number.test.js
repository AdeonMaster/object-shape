import ObjectShape from '../';

describe('number', () => {
  const shape = new ObjectShape({
    age: ObjectShape.number,
  });

  it('should return true', () => {
    const object = {
      age: 41,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      age: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
