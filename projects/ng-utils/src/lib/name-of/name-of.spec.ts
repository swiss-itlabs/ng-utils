import { NameOf } from './name-of';

describe('NameOf.property', () => {

  class MyDemoTestClass {
    /** test */
    public myPublicProperty: number;
  }

  it('public properties works', () => {
    expect(NameOf.property<MyDemoTestClass>('myPublicProperty')).toEqual('myPublicProperty');
  });

});
