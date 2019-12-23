import ObjectShape from '../';

describe('static validate', () => {
  const shape = {
    title: ObjectShape.string,
    items: ObjectShape.arrayOf(ObjectShape.string)
  };

  it('should return true', () => {
    const object = {
      title: 'Example title',
      items: ['First', 'Second']
    };

    const errors = ObjectShape.validate(shape, object);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      title: null,
      items: []
    };

    const errors = ObjectShape.validate(shape, object);
    console.log(errors);

    expect(errors.length).toBe(2);
  });
});
