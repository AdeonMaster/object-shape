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

    const result = ObjectShape.validate(shape, object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      title: null,
      items: []
    };

    const result = ObjectShape.validate(shape, object);

    expect(result).toEqual(false);
  });
});
