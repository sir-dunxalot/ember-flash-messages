/* global velocity */

import Ember from 'ember';
// import Queue from '../queue';
import insert from 'ember-flash-messages/utils/computed/insert';
import layout from 'ember-flash-messages/templates/components/message-queue';

export default Ember.Component.extend({

  /* Options */

  className: 'flash_queue',
  interval: Ember.computed.alias('queue.interval'),

  /* Properties */

  animationDuration: Ember.computed.alias('queue.animationDuration'),
  attributeBindings: ['dataTest:data-test'],
  classNameBindings: ['className'],
  currentMessage: Ember.computed.oneWay('queue.currentMessage'),
  dataTest: 'flash-queue',
  layout: layout,
  shouldShow: Ember.computed.or('currentMessage', 'untimedMessages.length'),
  untimedMessages: Ember.computed.oneWay('queue.untimedMessages'),

  queue: Ember.computed(function() {
    return {}; // TODO
  }),

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
