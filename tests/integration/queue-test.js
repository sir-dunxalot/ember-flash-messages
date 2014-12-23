import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Queue from 'em-notify/queue';

var message = {
  content: 'congratulations',
  duration: 3000, // Default
  type: 'success'
};

var App, container, controller;

module('Notify queue', {

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
    equal(Queue.get('length'), 0, 'Queue should be empty');

    controller.notify(message['type'], message['content']);

    equal(Queue.get('length'), 1, 'Queue should contain one message');

    Em.run.later(Queue, function() {
      equal(Queue.get('length'), 1, 'Message should be in queue after ' + earlyDuration + 'ms');
    }, earlyDuration);

    Em.run.later(Queue, function() {
      equal(Queue.get('length'), 0, 'Message should be removed from queue after ' + duration + 'ms');
    }, duration);

    ['content', 'duration', 'type'].forEach(function(property) {
      var report = property.capitalize() + ' should be "' + message[property] + '"';

      equal(Queue.get('currentMessage.' + property), message[property], report);
    });

  });

});
