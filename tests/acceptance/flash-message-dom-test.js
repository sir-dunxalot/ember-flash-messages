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
    interval,
    queue;

module('Acceptance | flash message dom', {
  beforeEach: function() {

    /* Setup the app */

    application = startApp();
    container = application.__container__;

    /* Set the helper properties */

    queue = container.lookup('service:flash-message-queue');
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

test('Timed message in queue component element', function(assert) {

  visit('/');

  flashMessage(expectedMessage);

  andThen(function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      checkMessageDom(assert, inspect('message'), expectedMessage);
    });
  });
});
