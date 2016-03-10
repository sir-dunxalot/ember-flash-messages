import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import {
  expectedContent,
  expectedDuration,
  expectedType,
  expectedMessage,

  // expectedContentTwo,
  // expectedDurationTwo,
  // expectedTypeTwo,
  expectedMessageTwo,

  // untimedMessageDuration,
  // untimedMessageContent,
  // untimedMessageType,
  untimedMessage,
} from '../fixtures/messages';

const { run } = Ember;

let animationDuration,
    application,
    container,
    content,
    interval,
    queue;

module('Acceptance | flash message queue', {

  beforeEach() {

    /* Setup the app */

    application = startApp();
    container = application.__container__;

    /* Set the helper properties */

    queue = container.lookup('service:flash-message-queue');

    Ember.run(function() {
      queue.clear();
    });

    animationDuration = queue.get('animationDuration');
    interval = queue.get('interval');
    content = queue.get('content');
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },

});

test('Messages should be pushed to the queue', function(assert) {

  assert.expect(9);

  visit('/');

  andThen(function() {

    /* Flash a message and check it's added to the queue */

    assert.equal(content.get('length'), 0,
      'The queue should be empty');

  });

  flashMessage(expectedType, expectedContent);

  andThen(function() {
    const timeBeforeRemoval = interval + animationDuration * 2;

    assert.equal(content.get('length'), 1,
      'The queue should contain one message');

    assert.equal(queue.get('untimedMessages.length'), 0,
      'The untimed message queue should not contain any messages');

    assert.equal(queue.get('timedMessages.length'), 1,
      'The timed message queue should contain one message');

    /* Check the currentMessage property */

    checkCurrentMessage(assert, expectedMessage);

    /* Check the message timing */

    run.later(this, function() {

      assert.equal(content.get('length'), 1,
        `Message should still be in queue after ${timeBeforeRemoval - 100}ms`);

    }, timeBeforeRemoval - 100);

    /* Then check that it's removed at the correct time */

    run.later(this, function() {

      assert.equal(content.get('length'), 0,
        `Message should be removed from queue after ${timeBeforeRemoval} ms`);

    }, timeBeforeRemoval);

  });
});

test('Multiple timed messages', function(assert) {

  assert.expect(10);

  visit('/');

  andThen(function() {

    assert.equal(content.get('length'), 0,
      'The queue should be empty');

  });

  /* Push two timed messages */

  flashMessage(expectedMessage);
  flashMessage(expectedMessageTwo);

  andThen(function() {

    assert.equal(content.get('length'), 2,
      'The queue should contain two messages');

    assert.equal(queue.get('untimedMessages.length'), 0,
      'The untimed message queue should not contain any messages');

    assert.equal(queue.get('timedMessages.length'), 2,
      'The timed message queue should contain two messages');

    checkCurrentMessage(assert, expectedMessage);

    run.later(this, function() {
      checkCurrentMessage(assert, expectedMessageTwo, false);
    }, expectedDuration + animationDuration * 2);

  });
});

test('Untimed messages', function(assert) {

  assert.expect(7);

  visit('/');

  andThen(function() {

    /* Flash a message and check it's added to the queue */

    assert.equal(content.get('length'), 0,
      'The queue should be empty');

  });

  /* Push the first untimed message */

  flashMessage(untimedMessage);

  andThen(function() {

    assert.equal(content.get('length'), 1,
      'The queue should contain one message');

    assert.equal(queue.get('timedMessages.length'), 0,
      'The timed message queue should not contain any messages');

    assert.equal(queue.get('untimedMessages.length'), 1,
      'The untimed message queue should contain one message');

  });

  /* Push the second untimed message */

  flashMessage(untimedMessage);

  andThen(function() {

    assert.equal(content.get('length'), 2,
      'The queue should contain one message');

    assert.equal(queue.get('timedMessages.length'), 0,
      'The timed message queue should not contain any messages');

    assert.equal(queue.get('untimedMessages.length'), 2,
      'The untimed message queue should contain two messages');

  });
});

