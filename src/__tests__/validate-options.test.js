import ObjectShape from '../';

describe('validate suppressFullValidation option', () => {
  const shape = new ObjectShape({
    name: ObjectShape.string,
    age: ObjectShape.number,
    isValidated: ObjectShape.bool,
  });

  it('should return true', () => {
    const object = {
      name: 'Bob Goodfellow',
      isValidated: true,
    };

    const errors = shape.validate(object, {
      suppressOwnPropertiesValidation: true,
    });
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return false', () => {
    const object = {
      name: 'Bob Goodfellow',
      isValidated: 2,
    };

    const errors = shape.validate(object, {
      suppressOwnPropertiesValidation: true,
    });
    console.log(errors);

    expect(errors.length).toBe(1);
  });
});
