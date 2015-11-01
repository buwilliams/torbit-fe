describe('$u', function($u) {

  var $u;

  beforeEach(module('torbitFeApp'));

  beforeEach(inject(function($injector) {
    $u = $injector.get('$u');
  }));

  describe('empty', function() {
    it('should take a existing array and empty the contents', function() {
      var ary = [0, 1, 2, 3];
      $u.empty(ary);
      expect(ary.length).toEqual(0);
    });

    it('should take a existing object and empty the contents', function() {
      var obj = { a: 1, b: 2, c: 3 };
      $u.empty(obj);
      expect(_.keys(obj).length).toEqual(0);
    });

    it('should throw an excpetion when a primitive is passed in', function() {
      expect(function() { $u.empty('a'); }).toThrow();
    });
  });

  describe('merge', function() {
    it('should merge the contents of array B into the array A', function() {
      var aryA = [0, 1];
      var aryB = [2, 3];
      $u.merge(aryA, aryB);
      expect(aryA).toEqual([0, 1, 2, 3]);
    });

    it('should merge the contents of obj B into the obj A', function() {
      var objA = { a: 1, b: 2 };
      var objB = { c: 3, d: 4 };
      $u.merge(objA, objB);
      expect(objA).toEqual({ a: 1, b: 2, c: 3, d: 4});
    });

    it('should merge the contents of obj B into the obj A', function() {
      var objA = { a: 1, b: 2 };
      var objB = { c: 3, d: 4 };
      $u.merge(objA, objB);
      expect(objA).toEqual({ a: 1, b: 2, c: 3, d: 4});
    });

    it('should throw an excpetion when a primitive is passed in', function() {
      expect(function() { $u.merge('a', 'a'); }).toThrow();
      expect(function() { $u.merge([], 'a'); }).toThrow();
      expect(function() { $u.merge('a', []); }).toThrow();
      expect(function() { $u.merge({}, 'a'); }).toThrow();
      expect(function() { $u.merge('a', {}); }).toThrow();
    });

    it('should throw an excpetion when either object doesn\'t match the type of the other', function() {
      expect(function() { $u.merge([], {}); }).toThrow();
      expect(function() { $u.merge({}, []); }).toThrow();
    });
  });

  describe('overwrite', function() {
    it('should take array A and overwrite it with array B', function() {
      var aryA = [0, 1];
      var aryB = [2, 3];
      $u.overwrite(aryA, aryB);
      expect(aryA).toEqual([2, 3]);
    });

    it('should take array A and overwrite it with array B', function() {
      var objA = { a: 1, b: 2 };
      var objB = { c: 3, d: 4 };
      $u.overwrite(objA, objB);
      expect(objA).toEqual({ c: 3, d: 4});
    });
  });

  describe('remove', function() {
    it('should remove the node which matches the key', function() {
      var ary = [{id:1}, {id:2}, {id:3}];
      $u.remove(ary, {id:2});
      expect(ary).toEqual([{id:1}, {id:3}]);
    });

    it('should remove only first array node which matches the key', function() {
      var ary = [{id:1}, {id:2}, {id:3}, {id:2}];
      $u.remove(ary, {id:2});
      expect(ary).toEqual([{id:1}, {id:3}, {id:2}]);
    });

    it('should throw an exception when bad parameters are passed in', function() {
      expect(function() { $u.remove('a', 'a'); }).toThrow();
      expect(function() { $u.remove('a', {}); }).toThrow();
      expect(function() { $u.remove({}, 'a'); }).toThrow();
      expect(function() { $u.remove([], 'a'); }).toThrow();
      expect(function() { $u.remove('a', []); }).toThrow();
      expect(function() { $u.remove([], []); }).toThrow();
      expect(function() { $u.remove({}, {}); }).toThrow();
      expect(function() { $u.remove({}, []); }).toThrow();
    });
  });

});
