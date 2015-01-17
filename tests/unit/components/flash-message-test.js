import Em from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import message from '../../helpers/message';

var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

var component;

moduleForComponent('flash-message', 'Flash messages - Flash message component', {

  setup: function() {
    component = this.subject();
  },

  teardown: function() {
    // Em.run(function() {
    //   component.clear();
    // });
  }
});


test('Data test attribute', function() {

  ok(component.get('dataTest'),
    'Component should have a dataTest property');

  equal(this.$().attr('data-test'), 'flash-message',
    'Component should have a data-test attribute');

});


test('Default properties and methods', function() {
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
    'Component element\'s role should be ' + alert);

  equal(this.$().attr('role'), role,
    'Component element should have its role attribteu bound');

});
