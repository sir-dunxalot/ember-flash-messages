import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Queue from 'ember-flash-messages/queue';

var message = {
  content: 'This is the first message',
  duration: 3000,
  type: 'success'
};

var App, container, controller;

module('Flash Messages - manage queue', {

  setup: function() {
    App = startApp();
    container = App.__container__;
    controller = container.lookup('controller:index');
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});



test('Message should be pushed to queue', function() {
  var duration = message['duration'];
  var earlyDuration = duration - 100;

  visit('/');

  andThen(function() {
    var queueComponent = container.lookup('component:message-queue');
    var animationDuration = queueComponent.get('animationDuration');

    equal(Queue.get('length'), 0, 'Queue should be empty');

    controller.flashMessage(message['type'], message['content']);

    equal(Queue.get('length'), 1, 'Queue should contain one message');

    Em.run.later(Queue, function() {
      equal(Queue.get('length'), 1, 'Message should be in queue after ' + earlyDuration + 'ms');
    }, earlyDuration + animationDuration * 2);

    Em.run.later(Queue, function() {
      equal(Queue.get('length'), 0, 'Message should be removed from queue after ' + duration + 'ms');
    }, duration + animationDuration * 2);

    ['content', 'duration', 'type'].forEach(function(property) {
      var expectedValue = message[property];

      if (property === 'duration') {
        expectedValue += animationDuration * 2;
      }

      equal(Queue.get('currentMessage.' + property), expectedValue,
        property.capitalize() + ' should be "' + expectedValue + '"');
    });

  });

});
