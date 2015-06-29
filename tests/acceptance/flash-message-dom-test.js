import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import {
  expectedContent,
  expectedDuration,
  expectedType,
  expectedMessage,

  expectedContentTwo,
  expectedDurationTwo,
  expectedTypeTwo,
  expectedMessageTwo,

  untimedMessageDuration,
  untimedMessageContent,
  untimedMessageType,
  untimedMessage,
} from '../fixtures/messages';

let animationDuration,
    application,
    container,
    content,
    beforeRemovalTime,
    expectedRemovalTime,
    queue;

module('Acceptance | flash message dom', {
  beforeEach: function() {

    /* Setup the app */

    application = startApp();
    container = application.__container__;

    /* Set the helper properties */

    queue = container.lookup('service:flash-message-queue');
    animationDuration = queue.get('animationDuration');
    content = queue.get('content');
    expectedRemovalTime = animationDuration * 2; // Show and close animations
    beforeRemovalTime = expectedRemovalTime - 100;
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Message queue component element', function(assert) {
  visit('/');

  andThen(function() {
    var queueComponent = inspect('queue');

    assert.ok(!!queueComponent,
      'The component should render on the page');

    assert.equal(queueComponent.text().trim(), '',
      'The component should render empty');

  });
});
