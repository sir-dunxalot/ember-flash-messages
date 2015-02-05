import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';
import queue from 'ember-flash-messages/queue';

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

module('Flash messages - Queue', {

  setup: function() {

  },

  teardown: function() {
    Em.run(function() {
      queue.clear();
    });
  }

});



test('Queue construction', function() {

  contains(queue.get('constructor').toString(), 'Array',
    'Queue should be constructed from an array class');

  typeOf(queue, 'instance',
    'Queue should be an instance, not a class');

  typeOf(queue.get('content'), 'array',
    'Queue content should be an array');

  strictEqual(queue.get('length'), 0,
    'Queue content should be an empty array');

  typeOf(queue.get('untimedMessages'), 'array',
    'Queue untimed messages array should be an array');

  strictEqual(queue.get('untimedMessages.length'), 0,
    'Queue untimed messages array should be an empty array');

  typeOf(queue.get('timedMessages'), 'array',
    'Queue timed messages array should be an array');

  strictEqual(queue.get('timedMessages.length'), 0,
    'Queue timed messages array should be an empty array');

});



test('Default properties and methods', function() {

  ok(queue.get('animationDuration'),
    'Queue should have a default animation duration');

  ok(queue.get('interval'),
    'Queue should have a default interval');

  isFunction(queue.clear,
    'The queue should have a public clear() method');

  isFunction(queue.pushMessage,
    'The queue should have a public pushMessage() method');

  isFunction(queue.removeMessage,
    'The queue should have a public removeMessage() method');

});



test('Default properties and methods', function() {

  ok(queue.get('animationDuration'),
    'Queue should have a default animation duration');

  ok(queue.get('interval'),
    'Queue should have a default interval');

  isFunction(queue.clear,
    'The queue should have a public clear() method');

  isFunction(queue.pushMessage,
    'The queue should have a public pushMessage() method');

  isFunction(queue.removeMessage,
    'The queue should have a public removeMessage() method');

});



test('Pushing messages', function() {
  var untimedMessage = {
    content: 'This is the first message',
    duration: 0, // Untimed
    type: 'success'
  };

  Em.run(function() {
    queue.pushMessage({
      content: 'This is the first message',
      duration: 3000,
      type: 'success'
    });
  });

  strictEqual(queue.get('length'), 1,
    'Queue content should have one message');

  strictEqual(queue.get('timedMessages.length'), 1,
    'Queue timed messages array should have one message');

  Em.run(function() {
    queue.clear();
  });

  strictEqual(queue.get('length'), 0,
    'Calling clear() should clear the queue content');

  strictEqual(queue.get('length'), 0,
    'Calling clear() should clear the timed messages array');

  Em.run(function() {
    queue.pushMessage(untimedMessage);
  });

  strictEqual(queue.get('length'), 1,
    'Queue content should have one message');

  strictEqual(queue.get('untimedMessages.length'), 1,
    'Queue untimed messages array should have one message');

  Em.run(function() {
    queue.clear();
  });

  strictEqual(queue.get('length'), 0,
    'Calling removeMessage() should clear the queue content');

  strictEqual(queue.get('untimedMessages.length'), 0,
    'Calling removeMessage() should clear the untimed messages array');

});
