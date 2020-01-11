import ObjectShape from '../';

describe('objectOf validator creator', () => {
  it('should return false on invalidly created validator', () => {
    const shape = new ObjectShape({
      author: ObjectShape.objectOf([]),
    });

    const object = {
      author: {
        name: 'Bob Goodfellow',
      },
    };

    const errors = shape.validate(object);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});

describe('objectOf', () => {
  const shape = new ObjectShape({
    title: ObjectShape.string,
    author: ObjectShape.objectOf({
      name: ObjectShape.string,
      avatar: ObjectShape.string,
    }),
  });

  it('should return true', () => {
    const article = {
      title: 'Test article',
      author: {
        name: 'Bob Goodfellow',
        avatar: '/img/basa413asd.jpg',
      },
    };

    const errors = shape.validate(article);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false on invalid objectOf type', () => {
    const article = {
      title: 'Test article',
      author: 2,
    };

    const errors = shape.validate(article);
    console.log(errors);

    expect(errors.length).toBe(1);
  });

  it('should return false on invalid property type', () => {
    const article = {
      title: 'Test article',
      author: {
        name: 'Bob Goodfellow',
        avatar: false,
      },
    };

    const errors = shape.validate(article);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});

describe('objectOf nested', () => {
  const shape = new ObjectShape({
    title: ObjectShape.string,
    author: ObjectShape.objectOf({
      name: ObjectShape.string,
      nested: ObjectShape.objectOf({
        item: ObjectShape.string,
        test: ObjectShape.number,
      }),
    }),
  });

  it('should return true', () => {
    const article = {
      title: 'Test article',
      author: {
        name: 'Bob Goodfellow',
        nested: {
          item: 'test',
          test: 2,
        },
      },
    };

    const errors = shape.validate(article);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const article = {
      title: 'Test article',
      author: {
        name: 'Bob Goodfellow',
        nested: {
          item: 3,
          test: 2,
        },
      },
    };

    const errors = shape.validate(article);
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});