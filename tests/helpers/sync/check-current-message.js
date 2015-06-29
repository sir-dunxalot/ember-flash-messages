import Ember from 'ember';

export default Ember.Test.registerHelper('checkCurrentMessage',
  function(app, assert, expectedMessage, firstMessage = true) {
    const queue = app.__container__.lookup('service:flash-message-queue');
    const animationDuration = queue.get('animationDuration');

    ['content', 'duration', 'type'].forEach(function(property) {
      const capitalizedProperty = Ember.String.capitalize(property);

      let expectedValue = expectedMessage[property];

      /* If it's the first message then double the animation because
      we're expecting to show and hide the message. Else, just use one
      animationDuration because we're only expecting to hide the
      message - the queue is already showing */

      if (property === 'duration') {
        const multiplier = firstMessage ? 2 : 1;

        expectedValue += animationDuration * multiplier;
      }

      equal(queue.get('currentMessage.' + property), expectedValue,
        `The current message ${capitalizedProperty} property should be ${expectedValue}`);

    });
  }
);
