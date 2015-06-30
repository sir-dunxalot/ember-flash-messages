import FlashMessageQueueComponent from 'ember-flash-messages/components/flash-message-queue';

export default FlashMessageQueueComponent.extend({

  /* If an action is goign to be called in the component,
  bubble it up */

  actions: {
    testMessageAction() {
      this.sendAction();
    },
  },

});
