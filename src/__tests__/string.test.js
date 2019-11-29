import ObjectShape from '../';

describe('string', () => {
  const shape = new ObjectShape({
    title: ObjectShape.string
  });

  it('should return true', () => {
    const object = {
      title: 'Example title'
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      title: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
