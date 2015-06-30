import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../helpers/start-app';

const { isFunction } = window.QUnit;

let application, container;

module('Acceptance | initializers/ember flash messages', {
  beforeEach: function() {
    application = startApp();
    container = application.__container__;
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Injections on Ember classes', function(assert) {
  visit('/');

  andThen(function() {
    const component = container.lookup('component:test-for-injection');
    const controller = container.lookup('controller:application');
    const route = container.lookup('route:application');
    const view = container.lookup('view:test-for-injection');

    assert.expect(8);

    [component, controller, route, view].forEach(function(instance) {
      const name = instance.get('constructor').toString();

      assert.ok(!!instance.get('flashMessageQueue'),
        `The queue should exist on the ${name} instance as flashMessageQueue`);

      isFunction(instance.flashMessage,
        `The flashMessage helper function should exist on the ${name} instance`);

    });

  });
});
