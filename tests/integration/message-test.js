import Em from 'ember';
import { test, log } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Queue from 'em-notify/queue';

var App, container, controller;

module('Notify messages', {

  setup: function() {
    App = startApp();
    container = App.__container__;
    controller = container.lookup('controller:index');
  },

  teardown: function() {
    Em.run(App, 'destroy');
  }

});

test('Notify component should display', function() {

  visit('/');

  andThen(function() {
    var components = find('.notify');
    var notify = Em.$(components[0]);

    equal(notify.length, 1, 'Notify component should render on the page');
    equal(notify.text().trim(), '', 'Notify component should render empty');
  });

});

test('Message should be pushed to queue content', function() {
  var type = 'success';
  var message = 'congratulations';

  visit('/');

  andThen(function() {
    controller.notify(type, message);

    Em.run(function() {
      equal(Queue.get('currentMessage.message'), message, 'Queue\'s current message should be set to "' + message + '"');
    });
  });

});
