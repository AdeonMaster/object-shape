import ObjectShape from '../';

describe('instanceOf', () => {
  class Dog {
    constructor() {
      this.type = 'dog';
    }
  }

  const shape = new ObjectShape({
    pet: ObjectShape.instanceOf(Dog)
  });

  it('should return true', () => {
    const object = {
      pet: new Dog()
    };

    const result = shape.validate(object);

    expect(result).toEqual(true);
  });

  it('should return false', () => {
    const object = {
      pet: null
    };

    const result = shape.validate(object);

    expect(result).toEqual(false);
  });
});
