import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  /* Options */

  className: 'flash-message-queue',
  interval: computed.oneWay('flashMessageQueue.interval'),

  /* Properties */

  animationDuration: computed.oneWay('flashMessageQueue.animationDuration'),
  classNameBindings: ['className'],
  currentMessage: computed.oneWay('flashMessageQueue.currentMessage'),
  dataTest: 'flash-message-queue',
  isMessageQueueComponent: true,
  shouldShow: computed.or('currentMessage', 'untimedMessages.length'),
  untimedMessages: computed.oneWay('flashMessageQueue.untimedMessages'),

  /* Methods */

  actions: {
    removeMessage: function(message) {
      this.get('flashMessageQueue').removeMessage(message);
    }
  },

  clear: function() {
    this.get('flashMessageQueue').clear();
  },

  getQueueLength: function() {
    return this.get('flashMessageQueue.timedMessages.length');
  },

});
