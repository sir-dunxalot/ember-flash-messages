import Em from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

var isFunction = QUnit.isFunction;

var component;

moduleForComponent('message-queue', 'Flash messages - Message queue component', {
  needs: ['component:flash-message'],

  setup: function() {
    component = this.subject();
  },

  teardown: function() {
    Em.run(function() {
      component.clear();
    });
  }
});


test('Data test attribute', function() {

  ok(component.get('dataTest'),
    'Component should have a dataTest property');

  equal(this.$().attr('data-test'), 'flash-queue',
    'Component should have a data-test attribute');

});


test('Default properties and methods', function() {

  /* Check properties */

  var required = ['className', 'interval', 'queue'];

  required.forEach(function(property) {

    ok(component.get(property),
      'Component should have a default value for ' + property);

  });

  ok(this.$().hasClass(component.get('className')),
    'Component element should have default class name');

  strictEqual(component.get('shouldShow'), false,
    'shouldShow should be false by default');

  /* Check methods */

  ['clear', 'getQueueLength'].forEach(function(method) {

    isFunction(component[method],
      'Component should have a ' + method + ' method');

  });

});
