import Em from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import selectorFor from '../../helpers/selector-for';

var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

var component, set;

moduleForComponent('flash-message', 'Flash messages - Flash message component', {

  setup: function() {
    component = this.subject();

    set = function(key, value) {
      Em.run(function() {
        component.set(key, value);
      });
    };
  },

  teardown: function() {
    // Em.run(function() {
    //   component.clear();
    // });
  }
});


test('Data test attributes', function() {
  var _this = this;

  ok(component.get('dataTest'),
    'Component should have a dataTest property');

  equal(_this.$().attr('data-test'), 'flash-message',
    'Component should have a data-test attribute');

  ['button', 'content', 'icon'].forEach(function(name) {

    ok(_this.$().find(selectorFor(name)).length,
      'Component layout should have an element for the ' + name);

  });

});


test('Default properties and methods', function() {
  var className = 'new-class';
  var type = 'success';

  var required = [
    'animationDuration',
    'className',
    'iconClassFormat'
  ];

  var shouldBeNull = [
    'action',
    'content',
    'message',
    'type'
  ];

  /* Check properties */

  required.forEach(function(property) {

    ok(component.get(property),
      'Component should have a default value for ' + property);

  });

  shouldBeNull.forEach(function(property) {

    strictEqual(component.get(property), null,
      property + ' should be defined but not set (equal to null)');

  });

  ok(this.$().hasClass(component.get('className')),
    'Component element should have the default class name');

  typeOf(component.get('inQueue'), 'boolean',
    'inQueue should be a boolean property');

  strictEqual(component.get('visible'), false,
    'visible should be false');

  ok(!this.$().hasClass('visible'),
    'Component element should not initially have a visible class');

  /* Test changing the properties */

  set('className', className);

  ok(this.$().hasClass(className),
    'Component element should have new class name');

  set('type', type);

  ok(this.$().hasClass(className + '-' + type),
    'Component element should have new type class name');

  /* Check methods */

  ['hide', 'show', 'setVisibility'].forEach(function(method) {

    isFunction(component[method],
      'Component should have a ' + method + ' method');

  });

});


test('Usability', function() {
  var role = 'alert';

  equal(component.get('tagName'), 'dl',
    'Component element should be a definition list');

  equal(component.get('role'), role,
    'Component element\'s role should be ' + role);

  equal(this.$().attr('role'), role,
    'Component element should have its role attribute bound');

});


test('Event handling', function() {

  expect(3);

  ['click', 'handleClick'].forEach(function(method) {

    isFunction(component[method],
      'Component should have a ' + method + ' method');

  });

  set('handleClick', function() {

    ok(true,
      'Clicking on the component should call handleClick');

  });



});
