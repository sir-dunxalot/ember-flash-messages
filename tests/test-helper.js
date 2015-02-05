import Em from 'ember';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

QUnit.extend(QUnit, {

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

QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
document.getElementById('ember-testing-container').style.visibility = containerVisibility;
