import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-flash-messages/tests/helpers/start-app';

var application;

module('Acceptance | actions', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(true);
  });
});
