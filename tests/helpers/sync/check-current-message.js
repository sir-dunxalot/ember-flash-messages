import Ember from 'ember';

export default Ember.Test.registerHelper('checkCurrentMessage',
  function(app, assert, expectedMessage) {
    const queue = app.__container__.lookup('service:flash-message-queue');
    const animationDuration = queue.get('animationDuration');

    ['content', 'duration', 'type'].forEach(function(property) {
      const capitalizedProperty = Ember.String.capitalize(property);

      let expectedValue = expectedMessage[property];

      if (property === 'duration') {
        expectedValue += animationDuration * 2;
      }

      equal(queue.get('currentMessage.' + property), expectedValue,
        `${capitalizedProperty} should be ${expectedValue}`);

    });
  }
);
