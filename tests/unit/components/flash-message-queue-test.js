import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;
const { isFunction } = window.QUnit;

let component;

moduleForComponent('flash-message-queue', 'Unit | Component | flash message queue component', {
  unit: true,
  needs: ['component:flash-message', 'service:flash-message-queue'],

  beforeEach() {
    component = this.subject({
      flashMessageQueue: Ember.inject.service(),
    });
  },

  afterEach() {
    run(function() {
      component.clear();
    });
  }
});

/* Test the correct data attribtues are set on the component for testing */

test('Data test attribute', function(assert) {

  assert.ok(component.get('dataTest'),
    'Component should have a dataTest property');

  assert.equal(this.$().attr('data-test'), 'flash-message-queue',
    'Component should have a data-test attribute');

});

/* Default component functionality */

test('Default properties and methods', function(assert) {

  /* Check properties */

  const required = ['className', 'interval', 'flashMessageQueue'];

  required.forEach(function(property) {

    assert.ok(!!component.get(property),
      'Component should have a default value for ' + property);

  });

  assert.ok(this.$().hasClass(component.get('className')),
    'Component element should have default class name');

  assert.notOk(component.get('shouldShow'),
    'shouldShow should be false by default');

  /* Check methods */

  ['clear', 'getQueueLength'].forEach(function(method) {

    isFunction(component[method],
      'Component should have a ' + method + ' method');

  });

});
