var app = angular.module('torbitFeApp');

app.factory('$u', function() {

  var factory = {};

  factory.empty = function(obj) {
    if(_.isArray(obj)) {
      obj.splice(0, obj.length);
    } else {
      _.each(_.keys(obj), function(key) { delete obj[key]; });
    }
    return obj;
  };

  factory.merge = function(objA, objB) {
    if (_.isArray(objA)) {
      _.each(objB, function(item) {
        objA.push(item);
      });
    } else {
      _.each(_.keys(objB), function(key) {
        objA[key] = objB[key];
      });
    }
    return objA;
  };

  factory.overwrite = function(objA, objB) {
    factory.empty(objA);
    factory.merge(objA, objB);
    return objA;
  };

  factory.remove = function(ary, searchObj) {
    var index = _.findIndex(ary, searchObj);
    if(!_.isUndefined(index)) {
      ary.splice(index, 1);
    }
    return ary;
  };

  return factory;

});
