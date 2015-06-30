import Ember from 'ember';
import { module, test } from 'qunit';
import selectorFor from '../helpers/selector-for';
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
    interval,
    queue;

module('Acceptance | flash message dom', {

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

test('Message queue component element', function(assert) {

  assert.expect(3);

  visit('/');

  andThen(function() {
    const queueComponent = container.lookup('component:flash-message-queue');
    const queueElement = inspect('message-queue');
    const className = queueComponent.get('className');

    assert.ok(!!queueElement,
      'The component should render on the page');

    assert.equal(queueElement.text().trim(), '',
      'The component should render empty');

    assert.ok(queueElement.hasClass(className),
      'The component should have the bound className');

  });
});

/* Timed messages */

test('Timed message in queue component element', function(assert) {

  assert.expect(13);

  visit('/');

  flashMessage(expectedMessage);

  andThenAfterRender(function() {
    checkMessageDom(assert, inspect('message'), expectedMessage);
  });
});

test('Multiple timed messages in queue component element', function(assert) {

  assert.expect(26);

  visit('/');

  flashMessage(expectedMessage);
  flashMessage(expectedMessageTwo);

  andThenAfterRender(function() {
    checkMessageDom(assert, inspect('message'), expectedMessage);

    Ember.run.later(this, function() {
      checkMessageDom(assert, inspect('message'), expectedMessageTwo);
    }, expectedDuration + animationDuration * 2);
  });
});

/* Clicking timed messages */

test('Clicking timed message', function(assert) {

  assert.expect(14);

  visit('/');

  flashMessage(expectedMessage);

  andThenAfterRender(function() {
    const message = inspect('message');

    checkMessageDom(assert, message, expectedMessage);

    /* Click to remove */

    // asyncClick('message');
  });

  andThenAfterRender(function() {

    assert.ok(!inspect('message').length,
      'The message should be removed from the DOM after being clicked');

  });
});


/* Untimed messages */

test('Untimed message in queue component element', function(assert) {

  assert.expect(14);

  visit('/');

  flashMessage(untimedMessage);

  andThenAfterRender(function() {
    checkMessageDom(assert, inspect('message'), untimedMessage);
  });
});

/* Clicking untimed messages */

test('Clicking untimed message', function(assert) {

  assert.expect(16);

  visit('/');

  flashMessage(untimedMessage);

  andThenAfterRender(function() {
    checkMessageDom(assert, inspect('message'), untimedMessage);
  });

  /* Click to remove */

  asyncClick('message');

  /* Then check the message has been removed */

  andThenAfterRender(function() {
    const message = inspect('message');

    assert.ok(!message.hasClass('visible'),
      'The message should not have the visible class after being clicked');

    Ember.run.later(this, function() {

      assert.ok(!message.length,
        'The message should be removed from the DOM after the animation duration has passed');

    }, animationDuration);

  });
});


/* Timed and untimed messages */

test('Timed message and untimed message in queue component element', function(assert) {

  assert.expect(27);

  visit('/');

  flashMessage(expectedMessageTwo);
  flashMessage(untimedMessage);

  andThenAfterRender(function() {
    const flashMessageComponent = container.lookup('component:flash-message');
    const className = flashMessageComponent.get('className');
    const messageSelector = selectorFor('message');

    const untimedMessageSelector = `${messageSelector}.${className}-${untimedMessageType}`;
    const expectedMessageSelector = `${messageSelector}.${className}-${expectedTypeTwo}`;

    checkMessageDom(assert, find(untimedMessageSelector), untimedMessage);
    checkMessageDom(assert, find(expectedMessageSelector), expectedMessageTwo);
  });
});
