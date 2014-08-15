var _ = {
  isFunction: function(obj) {
	  return typeof obj === 'function';
	},
  identity: function () {return arguments[0];},
  first: function () {
	if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].constructor === Array && arguments.length === 1) {
		return arguments[0][0];
	} else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].constructor === Array && arguments.length > 1 
			   && typeof arguments[1] === "number" && arguments[1] <= arguments[0].length) {
		var arr = [];
		for (var i = 0; i < arguments[1]; i++){
			arr.push(arguments[0][i]);
		}
		return arr;
	} else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].constructor === Array && arguments.length > 1 
			   && typeof arguments[1] === "number" && arguments[1] > arguments[0].length) {
		return arguments[0];
	}
  },
  last: function () {
	if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].constructor === Array && arguments.length === 1) {
		console.log(arguments[0][arguments[0].length - 1]);
		return arguments[0][arguments[0].length - 1];
	} 
	// if no index value is passed
	else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].constructor === Array && arguments.length > 1 
			&& typeof arguments[1] === "number" && arguments[1] <= arguments[0].length) {
		var arr = [];
		for (var i = 0; i < arguments[1]; i++){
			arr.unshift(arguments[0][arguments[0].length - 1 - i]);
		}
		return arr;
	} 
	// if index value is greater than array
	else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].constructor === Array && arguments.length > 1 
			&& typeof arguments[1] === "number" && arguments[1] > arguments[0].length) {
		return arguments[0];
	}
  },
  extend: function () {
  
	var numArgs = arguments.length,
		nullCounter = 0;
	
	for (var i = 0; i < numArgs; i++) {

			(arguments[i] && Object.keys(arguments[i]).length === 0 ? nullCounter += 1 : nullCounter);
	}
	
	if (nullCounter === numArgs) {return arguments[0];}
	
	if (nullCounter !== numArgs){
		var newObj = {};
		
		for (var i = 0; i < numArgs; i++) {
			for (var ii in arguments[i]) {
				newObj[ii] = arguments[i][ii];
			}
		}
		return newObj;
	}
  },
  invoke: function (obj, method) {
    var args = Array.prototype.slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  },
  each: function (obj,callback,thisObj) {  
	// Arrays
	if (obj && typeof obj === 'object' && obj.constructor === Array) {
		for (var i = 0; i < obj.length; i++) {
			callback.call(thisObj,obj[i],i,obj);
		}
	}
	// Objects
	else if (obj && typeof obj === 'object' && obj.constructor === Object) {
		for (var i in obj) {
			callback.call(thisObj, obj[i], i, obj);
		}
	}
  },
  map: function (obj,callback,thisObj) {
	var results = [];
	for (var i = 0; i < arguments[0].length; i++) {
		results.push( callback.call(thisObj,arguments[0][i]) );
	}
	return results;
  },
  reduce: function (array,cb,base) {
  
	if (arguments.length < 3) {
		base = array[0]; 
	} 
	_.each(array, function (current) {
		base = cb(current,base);
	});
	return base;
  },
  filter: function(obj, callback, thisObj) { // this = thisObj; callback = filter callback that returns Boolean -- passes filter if callback returns true
    console.log('filter ',obj);
	var results = [];
    if (obj == null) return results;
    if (Array.prototype.filter && obj.filter === Array.prototype.filter) return obj.filter(callback, thisObj);
    _.each(obj, function(value, index, list) {
		if (callback.call(thisObj, value, index, list)) results.push(value);
    });
    return results;
  },
  reject: function(obj, callback, thisObj) {
		return _.filter(obj, function (value,index,list){
			return !callback.call(thisObj,value,index,list);
		},thisObj);
	},
  indexOf: function (array,index){
	if (!arguments[1]) return array;
	
	if (arguments[0] && typeof arguments[0] === 'object' && array.constructor === Array) {
		var counter = 0;
		for (var i = 0; i < array.length; i++) {
			if (array[i] === index) {return i;}
			counter++;
		}
		if (counter === array.length) {return -1;}
		
	}
  },
  pluck: function (obj,prop) {
	var result = [], i, ii;
	if (typeof obj !== 'object') {return -1;}
	if (obj && typeof obj === 'object' && obj.constructor === Array) { 
		for (i = 0; i < obj.length; i++) {
			for (ii in obj[i]) {
				if (prop == ii) {result.push( obj[i][ii] )}
			}
		}	
		return result;
	}
  },
  contains: function (obj,val) {
	var ii,i;
	if (typeof obj !== 'object') {return -1;}
	if (obj && typeof obj === 'object' && obj.constructor === Array) {
		for (i = 0; i < obj.length; i++) {
			if (val === obj[i]) {return true;}
		}
		return false;
	}
	
	if (obj && typeof obj === 'object' && obj.constructor === Object) {
		for (ii in obj) {
		console.log(ii);
			if (obj[ii] === val) {return true;}
		}
		return false;
	}
  },
  uniq: function (arr) {
	var result = [],i;
	for (i = 0; i < arr.length; i++) {
		if ( !_.contains(result,arr[i]) ) {
			result.push(arr[i]);
		}
	}
	return result;
  },
  every: function (obj,callback,thisObj) {
	var objLen = obj.length, results;
	if (obj.length === 0 || obj.length === undefined || callback === undefined) {return true;}
	results = _.filter(obj,callback,thisObj);
	return (results.length === objLen ? true : false);
  },
  some: function (obj,callback,thisObj) {
	callback = callback || _.identity;
	var results, strTest = 0;
	if (obj.length === 0 || obj.length === undefined || callback === undefined) {console.log('---','epic fail','---');return false;}
	results = _.filter(obj,callback,thisObj);
	console.log('results ',results);
	if (results.length > 0) {
console.log('PASS');	
		console.log('------------');
		return true; 
	} else if (results.length === 0) {
	console.log('NO');
			console.log('------------');
		return false;
	}
  },
  shuffle: function(array) {
    var randNum,
    index = 0,
    newArray = [];
	
    _.each(array, function(value) {
	
      randNum = _.random(index++); // make a random number and iterate index
	console.log(randNum);  
      newArray[index - 1] = newArray[randNum]; 
    
	  newArray[randIndex] = value;  // pushes array value to random place in newArray
	  
	console.log('newArray',newArray);
    });
    return newArray;
  },
  defaults: function(newObj) { // newObj is object that represents default properties, which are not updated by elem
    
	_.each(Array.prototype.slice.call(arguments, 1), function(elem) {
      if (elem) { // tests whether any additional objects were passed
	  
        for (var property in elem) {
		
          if (newObj[property] === undefined) {
			newObj[property] = elem[property]; // copies elem properties to newObj props
		  }
        }
      }
    });
	
    return newObj;
  },
  once: function (func) { // closure allows us to save value of hasRun
	var hasRun = false, result;
	return function () {
		if (hasRun) {return result;}
		result = func.apply(arguments) // use apply for arguments pseudo - array
		hasRun = true;
		func = null; // destroy the function
		return result;
	}
  },
  memoize: function (func) {
  
  var memo = {};
	console.log(memo);
  return function() {
    var args = Array.prototype.slice.call(arguments);

    if (args in memo)
      return memo[args];
    else
      return memo[args] = func.apply(this, args);

  }
},
delay: function(func, delay) {
    var args = Array.prototype.slice.call(arguments,2);
    return setTimeout(function(){ 
		return func.apply(this, args); 
	}, delay);
  }
};

//////////////////////////////////////////
describe('identity', function() {
  var uniqueObject = {};
  
  it('should return whatever value is passed into it', function() {
    expect(_.identity(1)).to.equal(1);

    expect(_.identity('string')).to.equal('string');

    expect(_.identity(false)).to.equal(false);

    expect(_.identity(uniqueObject)).to.equal(uniqueObject);
  });
});

describe('first', function() {
  it('should be able to pull out the first element of an array', function() {
    expect(_.first([1,2,3])).to.equal(1);
  });

  it('should be able to accept a user-defined index', function() {
    expect(_.first([1,2,3], 0)).to.eql([]);
    expect(_.first([1,2,3], 2)).to.eql([1, 2]);
    expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
  });
});

describe('last', function() {
  it('should pull the last element from an array', function() {
    expect(_.last([1,2,3])).to.equal(3);
  });

  it('should accept an index argument', function() {
    expect(_.last([1,2,3], 2)).to.eql([2, 3]);
  });

  it('should return nothing if zero is passed in as the index', function() {
    expect(_.last([1,2,3], 0)).to.eql([]);
  });

  it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
    expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
  });
});

describe('each', function() {
  it('should iterate over arrays, providing access to the element, index, and array itself', function() {
    var animals = ['ant', 'bat', 'cat'];
    var iterationInputs = [];

    _.each(animals, function(animal, index, list) {
      iterationInputs.push([animal, index, list]);
    });

    expect(iterationInputs).to.eql([
      ['ant', 0, animals],
      ['bat', 1, animals],
      ['cat', 2, animals]
    ]);
  });

  it('should only iterate over the array elements, not properties of the array', function() {
    var animals = ['ant', 'bat', 'cat'];
    var iterationInputs = [];

    animals.shouldBeIgnored = 'Ignore me!';

    _.each(animals, function(animal, index, list) {
      iterationInputs.push([animal, index, list]);
    });

    expect(iterationInputs).to.eql([
      ['ant', 0, animals],
      ['bat', 1, animals],
      ['cat', 2, animals]
    ]);
  });

  it('should iterate over objects, providing access to the element, index, and object itself', function() {
    var animals = { a: 'ant', b: 'bat', c: 'cat' };
    var iterationInputs = [];

    _.each(animals, function(animal, key, object) {
      iterationInputs.push([animal, key, object]);
    });

    expect(iterationInputs).to.eql([
      ['ant', 'a', animals],
      ['bat', 'b', animals],
      ['cat', 'c', animals]
    ]);
  });
});

describe('indexOf', function() {
  it('should have 40 in the list', function() {
    var numbers = [10, 20, 30, 40, 50];

    expect(_.indexOf(numbers, 40)).to.be(3);
  });

  it('should be able to compute indexOf even when the native function is undefined', function() {
    var numbers = [10, 20, 30];

    // If the browser provides a native indexOf array method, disable it
    numbers.indexOf = null;

    expect(_.indexOf(numbers, 20)).to.be(1);
  });

  it('returns -1 when the target cannot be found not in the list', function() {
    var numbers = [10, 20, 30, 40, 50];

    expect(_.indexOf(numbers, 35)).to.be(-1);
  });

  it('returns the first index that the target can be found at when there are multiple matches', function() {
    var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

    expect(_.indexOf(numbers, 40)).to.be(1);
  });
});

describe('filter', function() {
  it('should return all even numbers in an array', function() {
    var isEven = function(num) { return num % 2 === 0; };
    var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

    expect(evens).to.eql([2, 4, 6]);
  });

  it('should return all odd numbers in an array', function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

    expect(odds).to.eql([1, 3, 5]);
  });
});

describe('reject', function() {
  it('should reject all even numbers', function() {
    var isEven = function(num) { return num % 2 === 0; };
    var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

    expect(odds).to.eql([1, 3, 5]);
  });

  it('should reject all odd numbers', function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

    expect(evens).to.eql([2, 4, 6]);
  });
});

describe('uniq', function() {
  it('should return all unique values contained in an unsorted array', function() {
    var list = [1, 2, 1, 3, 1, 4];

    expect(_.uniq(list)).to.eql([1, 2, 3, 4]);
  });

  it('should handle iterators that work with a sorted array', function() {
    var iterator = function(value) { return value +1; };
    var list = [1, 2, 2, 3, 4, 4];

    expect(_.uniq(list, true, iterator)).to.eql([1, 2, 3, 4]);
  });
});

describe('map', function() {
  it('should apply a function to every value in an array', function() {
    var doubled = _.map([1, 2, 3], function(num) {
      return num * 2;
    });

    expect(doubled).to.eql([2, 4, 6]);
  });
});

describe('pluck', function() {
  it('should return values contained at a user-defined property', function() {
    var people = [
      {name : 'moe', age : 30},
      {name : 'curly', age : 50}
    ];

    expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
  });
});

describe('invoke, when provided a function reference', function() {
  it('runs the input function on each item in the array, and returns a list of results', function() {
    var reverse = function(){
      return this.split('').reverse().join('');
    };

    var reversedStrings = _.invoke(['dog', 'cat'], reverse);

    expect(reversedStrings).to.eql(['god', 'tac']);
  });
});

describe('invoke, when provided a method name', function() {
  it('runs the specified method on each item in the array, and returns a list of results', function() {
    var upperCasedStrings = _.invoke(['dog', 'cat'], 'toUpperCase');

    expect(upperCasedStrings).to.eql(['DOG', 'CAT']);
  });
});

describe('reduce', function() {
  it('should be able to sum up an array', function() {
    var add = function(tally, item) {return tally + item; };
    var total = _.reduce([1, 2, 3], add, 0);

    expect(total).to.equal(6);
  });
  
  it('should default to the first item in the array', function() {
    var add = function(tally, item) {return tally + item; };
    var total = _.reduce([1, 2, 3], add);

    expect(total).to.equal(7);
  });

});

describe('contains', function() {
  it('should return false if a collection does not contain a user-specified value', function() {
    expect(_.contains([4,5,6], 2)).to.equal(false);
  });

  it('should return true if a collection contains a user-specified value', function() {
    expect(_.contains([  4,   5,   6], 5)).to.equal(true);
  });

  it('can operate on objects', function(){
    expect(_.contains({a:4, b:5, c:6}, 5)).to.equal(true);
  });
});

describe('every', function() {
  it('passes by default for an empty collection', function() {
    expect(_.every([], _.identity)).to.equal(true);
  });

  it('passes for a collection of all-truthy results', function() {
    expect(_.every([true, {}, 1], _.identity)).to.equal(true);
  });

  it('fails for a collection of all-falsy results', function() {
    expect(_.every([null, 0, undefined], _.identity)).to.equal(false);
  });

  it('fails for a collection containing mixed falsy and truthy results', function() {
    expect(_.every([true, false, 1], _.identity)).to.equal(false);
  });

  it('handles callbacks that do work on the input', function() {
    var isEven = function(num) { return num % 2 === 0; };

    expect(_.every([0, 10, 28], isEven)).to.equal(true);
    expect(_.every([0, 11, 28], isEven)).to.equal(false);
  });

  it('casts the result to a boolean', function() {
    expect(_.every([1], _.identity)).to.equal(true);
    expect(_.every([0], _.identity)).to.equal(false);
  });

  it('treats each item as as a callback result when no callback is provided', function() {
    expect(_.every([true, true, true])).to.equal(true);
  });

  it('works when provded a collection containing undefined values', function() {
    expect(_.every([undefined, undefined, undefined], _.identity)).to.equal(false);
  });
});

describe('some', function() {
  var nativeSome = Array.prototype.some;
  var isEven = function(number){
    return number % 2 === 0;
  };

  beforeEach(function() {
    Array.prototype.some = null;
  });

  afterEach(function() {
    Array.prototype.some = nativeSome;
  });

  it('returns false for an empty list, when using the implied truth check', function() {
    expect(_.some([])).to.equal(false);
  });

  it('returns true for a collection of all-truthy results', function() {
    expect(_.some([true, {}, 1], _.identity)).to.equal(true);
  });

  it('fails for a collection of all-falsy results', function() {
    expect(_.some([null, 0, undefined], _.identity)).to.equal(false);
  });

  it('passes for a collection containing mixed falsy and truthy results', function() {
    expect(_.some([true, false, 1], _.identity)).to.equal(true);
  });

  it('passes for a set containing one truthy value that is a string', function() {
    expect(_.some([null, 0, 'yes', false])).to.equal(true);
  });

  it('fails for a set containing no matching values', function() {
    expect(_.some([1, 11, 29], isEven)).to.equal(false);
  });

  it('passes for a collection containing one matching value', function() {
    expect(_.some([1, 10, 29], isEven)).to.equal(true);
  });

  it('casts the result to a boolean', function() {
    expect(_.some([1], _.identity)).to.equal(true);
    expect(_.some([0], _.identity)).to.equal(false);
  });
});

describe('extend', function() {
  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var extended = _.extend(to, from);

    expect(extended).to.equal(to);
  });

  it('should extend an object with the attributes of another', function() {
    var to = {};
    var from = {a:'b'};
    var extended = _.extend(to, from);

    expect(extended.a).to.equal('b');
  });

  it('should override properties found on the destination', function() {
    var to = {a:'x'};
    var from = {a:'b'};
    var extended = _.extend(to, from);

    expect(extended.a).to.equal('b');
  });

  it('should not override properties not found in the source', function() {
    var to = {x:'x'};
    var from = {a:'b'};
    var extended = _.extend(to, from);

    expect(extended.x).to.equal('x');
  });

  it('should extend from multiple source objects', function() {
    var extended = _.extend({x:1}, {a:2}, {b:3});

    expect(extended).to.eql({x:1, a:2, b:3});
  });

  it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
    var extended = _.extend({x:'x'}, {a:'a', x:2}, {a:1});

    expect(extended).to.eql({x:2, a:1});
  });

  it('should copy undefined values', function() {
    var extended = _.extend({}, {a: void 0, b: null});

    expect('a' in extended && 'b' in extended).to.be(true);
  });
});

describe('defaults', function() {
  var options;

  beforeEach(function() {
    options = {zero: 0, one: 1, empty: '', nan: NaN, string: 'string'};
    _.defaults(options, {zero: 1, one: 10, twenty: 20}, {empty: 'full'}, {nan: 'nan'}, {word: 'word'}, {word: 'dog'});
  });

  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var defaulted = _.defaults(to, from);

    expect(defaulted).to.equal(to);
  });

  it('should copy a property if that key is already set on the target', function() {
    var to = {};
    var from = {a:1};
    var defaulted = _.defaults(to, from);

    expect(defaulted.a).to.equal(1);
  });

  it('should not copy a property if that key is already set on the target', function() {
    var to = {a:10};
    var from = {a:1};
    var defaulted = _.defaults(to, from);

    expect(defaulted.a).to.equal(10);
  });

  it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', function() {
    var to = {a: '', b: NaN};
    var from = {a: 1, b: 2};
    var defaulted = _.defaults(to, from);

    expect(defaulted.a).to.equal('');
    expect(isNaN(defaulted.b)).to.equal(true);
  });

  it('prefers the first value found, when two objects are provided with properties at the same key', function() {
    var to = {};
    var from = {a: 1};
    var alsoFrom = {a: 2};
    var defaulted = _.defaults(to, from, alsoFrom);

    expect(defaulted.a).to.equal(1);
  });
});

describe('once', function() {
  it('should only run a user-defined function if it hasn\'t been run before', function() {
    var num = 0;
    var increment = _.once(function() {
      num += 1;
    });

    increment();
    increment();

    expect(num).to.equal(1);
  });
});

describe('memoize', function() {
  var fib, fastFib, timeCheck, fastTime, wait;

  beforeEach(function() {
    fib = function(n) {
      if(n < 2){ return n; }
      return fib(n - 1) + fib(n - 2);
    };
    fastFib = _.memoize(fib);

    timeCheck = function(str) { return str + Date.now(); };
    fastTime = _.memoize(timeCheck);

    // Synchronous sleep: terrible for web development, awesome for testing _.memoize
    wait = function(t) {
      var start = Date.now();
      while ((Date.now() - start) < t){}
    };
  });

  it('a memoized function should produce the same result when called with the same arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it('should give different results for different arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
    expect(fastFib(7)).to.equal(13);
  });

  it('should not run the function twice for the same given argument', function() {
    var firstTime = timeCheck('shazaam!');
    wait(5);
    var secondTime = fastTime('shazaam!');
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTime('shazaam!')).to.equal(secondTime);
  });
});

describe('delay', function() {
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it('should only execute the function after the specified wait time', function() {
    var callback = sinon.spy();
    _.delay(callback, 100);

    clock.tick(99);

    expect(callback.notCalled).to.be(true);

    clock.tick(1);

    expect(callback.calledOnce).to.be(true);
  });

  it('should have successfully passed function arguments in', function() {
    var callback = sinon.spy();

    _.delay(callback, 100, 1, 2);
    clock.tick(100);

    expect(callback.calledWith(1, 2)).to.be(true);
  });
});

describe('shuffle', function() {
  it('should not modify the original object', function() {
    var numbers = [4, 5, 6];
    var shuffled = _.shuffle(numbers).sort();

    expect(shuffled).to.not.equal(numbers);
    expect(numbers).to.eql([4, 5, 6]);
  });

  it('should return an object with the same elements', function() {
    var numbers = [4, 5, 6];
    var shuffled = _.shuffle(numbers).sort();

    expect(JSON.stringify(shuffled)).to.equal(JSON.stringify(numbers));
  });

  it('should be in a different order', function() {
    var numbers = [4, 5, 6, 7, 8, 9, 10];
    var shuffled = _.shuffle(numbers);

    expect(JSON.stringify(shuffled)).to.not.equal(JSON.stringify(numbers));
  });
});

describe('sortBy', function() {
  it('should sort by age', function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person) {
      return person.age;
    });

    expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
  });

  it('should handle undefined values', function() {
    var list = [undefined, 4, 1, undefined, 3, 2];
    var result = _.sortBy(list, function(i) { return i; });

    expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
  });

  it('should sort by length', function() {
    var list = ['one', 'two', 'three', 'four', 'five'];
    var sorted = _.sortBy(list, 'length');

    expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);
  });

  it('should produce results that change the order of the list as little as possible', function() {
    function Pair(x, y) {
      this.x = x;
      this.y = y;
    }

    var collection = [
      new Pair(1, 1), new Pair(1, 2),
      new Pair(1, 3), new Pair(1, 4),
      new Pair(1, 5), new Pair(1, 6),
      new Pair(2, 1), new Pair(2, 2),
      new Pair(2, 3), new Pair(2, 4),
      new Pair(2, 5), new Pair(2, 6),
      new Pair(undefined, 1), new Pair(undefined, 2),
      new Pair(undefined, 3), new Pair(undefined, 4),
      new Pair(undefined, 5), new Pair(undefined, 6)
    ];

    var actual = _.sortBy(collection, function(pair) {
      return pair.x;
    });

    expect(actual).to.eql(collection);
  });
});

describe('flatten', function() {
  it('can flatten nested arrays', function() {
    var nestedArray = [1, [2], [3, [[[4]]]]];

    expect(_.flatten(nestedArray)).to.eql([1,2,3,4]);
  });
});

describe('zip', function() {
  it('should zip together arrays of different lengths', function() {
    var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];

    expect(_.zip(names, ages, leaders)).to.eql([
      ['moe', 30, true],
      ['larry', 40, undefined],
      ['curly', 50, undefined]
    ]);
  });
});

describe('intersection', function() {
  it('should take the set intersection of two arrays', function() {
    var stooges = ['moe', 'curly', 'larry'];
    var leaders = ['moe', 'groucho'];

    expect(_.intersection(stooges, leaders)).to.eql(['moe']);
  });
});

describe('difference', function() {
  it('should return the difference between two arrays', function() {
    var diff = _.difference([1,2,3], [2,30,40]);

    expect(diff).to.eql([1,3]);
  });

  it('should return the difference between three arrays', function() {
    var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

    expect(result).to.eql([3, 4]);
  });
});

describe("throttle", function() {
  it('throttled functions should only be able to be called again after the specified time', function(done) {
    var counter = 0;
    var incr = function() {
      counter++;
    };
    var throttledIncr = _.throttle(incr, 32);
    throttledIncr();
    throttledIncr();

    expect(counter).to.eql(1);
    setTimeout(function() {
      expect(counter).to.eql(2);
      done();
    }, 64);
  });

  it("throttled functions return their value", function(done) {
    var counter = 0;
    var incr = function() {
      return ++counter;
    };
    var throttledIncr = _.throttle(incr, 32);
    var result = throttledIncr();
    setTimeout(function() {
      expect(result).to.eql(1);
      expect(counter).to.eql(1);
      done();
    }, 64);
  });

  it("throttled functions called repeatedly should adhere to time limitations", function(done) {
    var counter = 0;
    var incr = function() {
      return ++counter;
    };
    var throttledIncr = _.throttle(incr, 64);
    var results = [];
    var saveResult = function() {
      results.push(throttledIncr());
    };
    saveResult();
    saveResult();
    setTimeout(saveResult, 32);
    setTimeout(saveResult, 80);
    setTimeout(saveResult, 96);
    setTimeout(saveResult, 144);
    setTimeout(function() {
      expect(results[0]).to.eql(1);
      expect(results[1]).to.eql(1);
      expect(results[2]).to.eql(1);
      expect(results[3]).to.eql(2);
      expect(results[4]).to.eql(2);
      expect(results[5]).to.eql(3);
      done();
    }, 192);
  })
});

/*
///////////////////////////
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);
/////////////////////
*/