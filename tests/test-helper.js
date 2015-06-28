import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

window.QUnit.extend(window.QUnit, {

  contains: function(arrayOrString, item, message) {
    Em.assert('QUnit.contains\' first argument must be an array or string',
      arrayOrString.indexOf);

    ok(arrayOrString.indexOf(item) > -1, message);
  },

  isFunction: function(name, message) {
    equal(Em.typeOf(name), 'function', message);
  },

  typeOf: function(name, type, message) {
    equal(Em.typeOf(name), type, message);
  },

});

setResolver(resolver);
