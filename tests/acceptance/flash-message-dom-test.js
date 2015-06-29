import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-flash-messages/tests/helpers/start-app';

var application;

module('Acceptance | flash message dom', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /flash-message-dom', function(assert) {
  visit('/flash-message-dom');

  andThen(function() {
    assert.equal(currentURL(), '/flash-message-dom');
  });
});
