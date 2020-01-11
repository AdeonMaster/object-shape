import ObjectShape from '../';

describe('string', () => {
  const shape = new ObjectShape({
    title: ObjectShape.string,
  });

  it('should return true', () => {
    const object = {
      title: 'Example title',
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      title: null,
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
