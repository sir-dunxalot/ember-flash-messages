import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

const { run } = Ember;

/* First test message */

const expectedContent = 'This is the first message';
const expectedDuration = 3000; // Default
const expectedType = 'success';
const expectedMessage = {
  content: expectedContent,
  duration: expectedDuration,
  type: expectedType,
};

/* Second test message */

const expectedContentTwo = 'This is the second message';
const expectedDurationTwo = 2000;
const expectedTypeTwo = 'error';
const expectedMessageTwo = {
  content: expectedContentTwo,
  duration: expectedDurationTwo,
  type: expectedTypeTwo,
};

let animationDuration,
    application,
    container,
    content,
    beforeRemovalTime,
    expectedRemovalTime,
    queue;

module('Acceptance | flash message queue', {
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

test('Messages should be pushed to the queue', function(assert) {
  visit('/');

  andThen(function() {
    const route = container.lookup('route:application');

    assert.expect(9);

    /* Flash a message and check it's added to the queue */

    assert.equal(content.get('length'), 0,
      'The queue should be empty');

    route.flashMessage(expectedType, expectedContent);

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

      equal(content.get('length'), 1,
        `Message should still be in queue after ${beforeRemovalTime}ms`);

    }, expectedDuration + beforeRemovalTime);

    /* Then check that it's removed at the correct time */

    run.later(this, function() {

      equal(content.get('length'), 0,
        `Message should be removed from queue after ${expectedRemovalTime} ms`);

    }, expectedDuration + expectedRemovalTime);

  });
});

test('Multiple timed messages', function(assert) {
  visit('/');

  andThen(function() {
    const route = container.lookup('route:application');

    assert.expect(7);

    /* Flash a message and check it's added to the queue */

    assert.equal(content.get('length'), 0,
      'The queue should be empty');

    /* Push two timed messages */

    route.flashMessage(expectedMessage);
    route.flashMessage(expectedMessageTwo);

    assert.equal(content.get('length'), 2,
      'The queue should contain two messages');

    assert.equal(queue.get('untimedMessages.length'), 0,
      'The untimed message queue should not contain any messages');

    assert.equal(queue.get('timedMessages.length'), 1,
      'The timed message queue should contain two messages');

    checkCurrentMessage(assert, expectedMessage);

  });
});



test('Untimed messages', function(assert) {
  visit('/');

  andThen(function() {
    const route = container.lookup('route:application');
    const untimedMessage = {
      duration: 0,
      content: expectedContent,
      type: expectedType,
    };

    assert.expect(7);

    /* Flash a message and check it's added to the queue */

    assert.equal(content.get('length'), 0,
      'The queue should be empty');

    /* Push the first untimed message */

    route.flashMessage(untimedMessage);

    assert.equal(content.get('length'), 1,
      'The queue should contain one message');

    assert.equal(queue.get('timedMessages.length'), 0,
      'The timed message queue should not contain any messages');

    assert.equal(queue.get('untimedMessages.length'), 1,
      'The untimed message queue should contain one message');

    /* Push the second untimed message */

    route.flashMessage(untimedMessage);

    assert.equal(content.get('length'), 2,
      'The queue should contain one message');

    assert.equal(queue.get('timedMessages.length'), 0,
      'The timed message queue should not contain any messages');

    assert.equal(queue.get('untimedMessages.length'), 2,
      'The untimed message queue should contain two messages');

  });
});

