var expect = require('chai').expect;

before(function(){
  console.log("outer2: before");
});

beforeEach(function(){
  console.log("outer2: beforeEach");
});

after(function(){
  console.log("outer2: after")
});

afterEach(function(){
  console.log("outer2: afterEach")
});

describe('Inner2', function(){

  before(function(){
    console.log("inner2: before");
  });

  beforeEach(function(){
    console.log("inner2: beforeEach");
  });

  after(function(){
    console.log("inner2: after")
  });

  afterEach(function(){
    console.log("inner2: afterEach")
  });

  it('should return a list of projects2', function(){
    expect([1,2,3].indexOf(5)).to.equal(-1);
  })
});
