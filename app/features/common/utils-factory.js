var app = angular.module('torbitFeApp');

app.factory('$u', function() {

  var factory = {};

  factory.empty = function(obj) {
    if(_.isArray(obj)) {
      obj.splice(0, obj.length);
    } else if (_.isObject(obj)) {
      _.each(_.keys(obj), function(key) { delete obj[key]; });
    } else {
      throw('empty() only supports objects and arrays');
    }
    return obj;
  };

  factory.merge = function(objA, objB) {
    if (_.isArray(objA) && _.isArray(objB)) {
      _.each(objB, function(item) {
        objA.push(item);
      });
    } else if(_.isObject(objA) && _.isObject(objB) &&
      !_.isArray(objA) && !_.isArray(objB)) {
      _.each(_.keys(objB), function(key) {
        objA[key] = objB[key];
      });
    } else {
      throw('merge() only supports two objects or two arrays');
    }
    return objA;
  };

  factory.overwrite = function(objA, objB) {
    factory.empty(objA);
    factory.merge(objA, objB);
    return objA;
  };

  factory.remove = function(ary, searchObj) {
    // basic type checking
    if(!_.isArray(ary) || !_.isObject(searchObj) || _.isArray(searchObj)) {
      throw('You invoked this method with invalid types. Should be remove(array, object)');
    }

    var index = _.findIndex(ary, searchObj);
    if(!_.isUndefined(index)) {
      ary.splice(index, 1);
    }
    return ary;
  };

  // Returns a new object with any keys containing
  // empty strings, nulls, or undefined being removed
  // Does not mutate the original object
  factory.rejectEmptyKeys = function(obj) {
    var out = {};
    _.each(_.keys(obj), function(key) {
      if(obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
        out[key] = obj[key];
      }
    });
    return out;
  };

  return factory;

});
