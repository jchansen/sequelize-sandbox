var expect = require('chai').expect;

before(function(){
  console.log("outer: before");
});

beforeEach(function(){
  console.log("outer: beforeEach");
});

after(function(){
  console.log("outer: after")
});

afterEach(function(){
  console.log("outer: afterEach")
});

describe('Middle', function(){

  before(function(){
    console.log("middle: before");
  });

  beforeEach(function(){
    console.log("middle: beforeEach");
  });

  after(function(){
    console.log("middle: after")
  });

  afterEach(function(){
    console.log("middle: afterEach")
  });

  describe('Inner', function(){

    before(function(){
      console.log("inner: before");
    });

    beforeEach(function(){
      console.log("inner: beforeEach");
    });

    after(function(){
      console.log("inner: after")
    });

    afterEach(function(){
      console.log("inner: afterEach")
    });

    it('should return a list of projects', function(){
      expect([1,2,3].indexOf(5)).to.equal(-1);
    })
  })

});
