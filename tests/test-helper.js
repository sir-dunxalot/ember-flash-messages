import Ember from 'ember';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

const { typeOf } = Ember;

window.QUnit.extend(window.QUnit, {

  contains: function(arrayOrString, item, message) {
    Ember.assert('QUnit.contains\' first argument must be an array or string',
      arrayOrString.indexOf);

    ok(arrayOrString.indexOf(item) > -1, message);
  },

  isFunction: function(name, message) {
    equal(typeOf(name), 'function', message);
  },

  typeOf: function(name, type, message) {
    equal(typeOf(name), type, message);
  },

});

setResolver(resolver);
