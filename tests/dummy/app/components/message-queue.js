import MessageQueueComponent from 'ember-flash-messages/components/message-queue';

export default MessageQueueComponent.extend({

  /* If an action is goign to be called in the component,
  bubble it up */

  actions: {
    testMessageAction() {
      this.sendAction();
    },
  },

});
