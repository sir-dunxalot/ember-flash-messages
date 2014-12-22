import Em from 'ember';
import { test, log } from 'ember-qunit';
import startApp from '../helpers/start-app';

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

test('Notify component should render', function() {

  visit('/');

  andThen(function() {
    var notifyElements = find('.notify');
    var notify = Em.$(notifyElements[0]);

    equal(notify.length, 1, 'Notify component should render on the page');
    equal(notify.text().trim(), '', 'Notify component should render empty');

    Em.run(function() {
      controller.notify(message['type'], message['content']);
    });

    equal(inspect('type').html().trim(), message['type'], 'Notify type should render');
    equal(inspect('content').html().trim(), message['content'], 'Notify content should render');
  });

});

// test('Notify component should display message', function() {

//   visit('/');

//   andThen(function() {
//     var notifyElements = find('.notify');
//     var notify = Em.$(notifyElements[0]);

//     controller.notify(message['type'], message['content']);

//     Em.run.later(controller, function() {
//       console.log(notify.html());
//     }, 500);
//   });

// });
