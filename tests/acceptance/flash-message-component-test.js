import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

const url = '/standalone-components';

let animationDuration,
    application,
    container,
    content,
    interval,
    queue;

module('Acceptance | flash message component', {

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

/* Test block components */

test('Standard block component', function(assert) {

  assert.expect(13);

  visit(url);

  andThen(function() {
    checkMessageDom(assert, inspect('message-block'), {
      type: 'success',
      content: 'This is the block message',
    });
  });
});

test('Block component with HTMLBars', function(assert) {

  assert.expect(13);

  visit(url);

  andThen(function() {
    checkMessageDom(assert, inspect('message-block-htmlbars'), {
      type: 'success',
      content: 'This proves that HTMLBars works!',
    });
  });
});

/* Test inline components */

test('Standard inline component', function(assert) {

  assert.expect(13);

  visit(url);

  andThen(function() {
    checkMessageDom(assert, inspect('message-inline'), {
      type: 'error',
      content: 'Some inline content',
    });
  });
});

test('Inline component with HTML', function(assert) {

  assert.expect(14);

  visit(url);

  andThen(function() {
    const message = inspect('message-inline-html');

    checkMessageDom(assert, message, {
      type: 'warning',
      content: 'Some inline content',
    });

    assert.equal(inspect('content', message).html().replace('<!---->','').trim(), 'Some inline <strong>content</strong>',
      'The component should render HTML passed by the content attribute');
  });
});

/* Test actions */

test('Block component with action', function(assert) {
  const applicationRoute = container.lookup('route:application');
  const blockSelector = 'message-block-action';
  const inlineSelector = 'message-inline-action';

  applicationRoute.reopen({
    _actions: {
      testMessageAction(message) {

        assert.ok(true,
          'The action on the route should be called after clicking the message');

        assert.ok(message.get('isFlashMessage'),
          'The message passed to the action on the route should be a flash message');

      },
    },
  });

  assert.expect(30);

  visit(url);

  andThen(function() {

    checkMessageDom(assert, inspect(blockSelector), {
      type: 'success',
      content: 'This is the block message with an action',
    });
  });

  asyncClick(blockSelector);

  andThen(function() {

    /* Wait for the actions to run */

    Ember.run.scheduleOnce('actions', this, function() {

    });
  });

  andThen(function() {

    checkMessageDom(assert, inspect(inlineSelector), {
      type: 'info',
      content: 'Some inline content with an action',
    });
  });

  asyncClick(inlineSelector);

  andThen(function() {

    /* Wait for the actions to run */

    Ember.run.scheduleOnce('actions', this, function() {

    });
  });

});

// HERE - inline components
