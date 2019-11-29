import ObjectShape from '../';

describe('simple shape example', () => {
  const shape = new ObjectShape({
    title: ObjectShape.string,
    tags: ObjectShape.arrayOf(ObjectShape.string),
    published: ObjectShape.bool
  });

  it('should return true', () => {
    const object = {
      title: 'Example title',
      tags: ['news', 'advertisement'],
      published: false
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      title: 'Example title',
      tags: ['news', 'advertisement', null],
      published: false
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
