/* global velocity */

import Em from 'ember';
import Queue from '../queue';

export default Em.Component.extend({
  // Animations, {

  /* Options */

  classPrefix: 'flash',
  interval: Em.computed.alias('queue.interval'),

  /* Properties */

  animationDuration: Em.computed.alias('queue.animationDuration'),
  attributeBindings: ['dataTest:data-test'],
  classNames: ['flash_queue'],
  currentMessage: Em.computed.oneWay('queue.currentMessage'),
  dataTest: 'flash-queue',
  shouldShow: Em.computed.or('currentMessage', 'untimedMessages.length'),
  untimedMessages: Em.computed.oneWay('queue.untimedMessages'),

  queue: function() {
    return Queue; // The magic
  }.property().readOnly(),

  /* Methods */

  actions: {
    removeMessage: function(message) {
      this.get('queue').removeMessage(message);
    }
  },

  clear: function() {
    this.get('queue').clear();
  },

  getQueueLength: function() {
    return this.get('queue.timedMessages.length');
  },

});
