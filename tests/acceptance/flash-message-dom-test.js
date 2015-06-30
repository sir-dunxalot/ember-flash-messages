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
  beforeEach: function() {

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

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Message queue component element', function(assert) {

  assert.expect(3);

  visit('/');

  andThen(function() {
    const queueComponent = container.lookup('component:message-queue');
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

  assert.expect(12);

  visit('/');

  flashMessage(expectedMessage);

  andThenAfterRender(function() {
    checkMessageDom(assert, inspect('message'), expectedMessage);
  });
});

test('Multiple timed messages in queue component element', function(assert) {

  assert.expect(24);

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

/* Untimed messages */

test('Untimed message in queue component element', function(assert) {

  assert.expect(13);

  visit('/');

  flashMessage(untimedMessage);

  andThenAfterRender(function() {
    checkMessageDom(assert, inspect('message'), untimedMessage);
  });
});

/* Timed and untimed messages */

test('Timed message and untimed message in queue component element', function(assert) {

  assert.expect(25);

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
