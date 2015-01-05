/* global velocity */

import Em from 'ember';
import insert from '../utils/computed/insert';
import Queue from '../queue';

export default Em.Component.extend({

  /* Options */

  className: 'flash_queue',
  interval: Em.computed.alias('queue.interval'),

  /* Properties */

  animationDuration: Em.computed.alias('queue.animationDuration'),
  attributeBindings: ['dataTest:data-test'],
  classNameBindings: ['className'],
  currentMessage: Em.computed.oneWay('queue.currentMessage'),
  dataTest: 'flash-queue',
  shouldShow: Em.computed.or('currentMessage', 'untimedMessages.length'),
  untimedMessages: Em.computed.oneWay('queue.untimedMessages'),

  queue: function() {
    return Queue;
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
