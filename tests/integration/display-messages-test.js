import Em from 'ember';
import { test } from 'ember-qunit';
import message from '../helpers/message';
import startApp from '../helpers/start-app';

var secondMessage = {
  content: 'well done',
  duration: 3000, // Default
  type: 'error'
};

var App, container, controller;

module('Notify - display messages', {
  needs: ['component:notify-message'],
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
    var notify = inspect('queue');

    ok(notify, 'Notify component should render on the page');
    equal(notify.text().trim(), '', 'Notify component should render empty');

    Em.run(function() {
      controller.notify(message['type'], message['content']);
    });

    ['content', 'type'].forEach(function(property) {
      var report = 'Notify ' + property + ' should render';

      equal(inspect(property).html().trim(), message[property], report);
    });
  });

});



test('Notify component should display multiple messages in sequence', function() {

  visit('/');

  andThen(function() {
    var notify = inspect('queue');

    /* Send messages to queue */

    Em.run(function() {
      controller.notify(message['type'], message['content']);
      controller.notify(secondMessage['type'], secondMessage['content']);
    });

    /* Check first message displays */

    ['content', 'type'].forEach(function(property) {
      var report = 'Notify first message: ' + property + ' should render';

      equal(inspect(property).html().trim(), message[property], report);
    });

    Em.run.later(function() {
      ['content', 'type'].forEach(function(property) {
        var report = 'Notify first message: ' + property + ' should not have changed yet';

        notEqual(inspect(property).html().trim(), secondMessage[property], report);
      });
    }, message['duration'] - 100);

    /* Check second message displays after change */

    Em.run.later(function() {
      ['content', 'type'].forEach(function(property) {
        var report = 'Notify second message: ' + property + ' should change';

        equal(inspect(property).html().trim(), secondMessage[property], report);
      });
    }, message['duration']);
  });

});
