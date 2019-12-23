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

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      item: null
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
