import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App, container;

module('Flash messages - inject method', {

  setup: function() {
    App = startApp();
    container = App.__container__;
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});



test('flashMessage method should be on routes', function() {
  var route = container.lookup('route:index');

  ok(route.flashMessage);
});



test('flashMessage method should be on controllers', function() {
  var controller = container.lookup('controller:index');

  ok(controller.flashMessage);
});



test('flashMessage method should be on views', function() {
  var view = container.lookup('view:index');

  ok(view.flashMessage);
});
