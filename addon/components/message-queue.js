/* global velocity */

import Em from 'ember';
import Queue from '../queue';
import Animations from '../mixins/animations';

export default Em.Component.extend(
  Animations, {

  /* Options */

  classPrefix: 'flash',
  interval: Em.computed.alias('queue.interval'),

  /* Properties */

  animationDuration: Em.computed.alias('queue.animationDuration'),
  attributeBindings: ['dataTest:data-test'],
  // classNameBindings: ['className'],
  classNames: ['flash_queue'],
  currentMessage: Em.computed.oneWay('queue.currentMessage'),
  dataTest: 'flash-queue',
  shouldShow: Em.computed.or('currentMessage', 'untimedMessages.length'),
  untimedMessages: Em.computed.oneWay('queue.untimedMessages'),

  // className: function() {
  //   var type = this.get('currentMessage.type');
  //   type = type ? '-' + type : '';

  //   return this.get('classPrefix') + type;
  // }.property('currentMessage.type', 'classPrefix'),

  queue: function() {
    return Queue;
  }.property().readOnly(),

  /* Methods */

  actions: {
    removeMessage: function(message) {
      this.get('queue').removeMessage(message);
    }
  },

  getQueueLength: function() {
    return this.get('queue.timedMessages.length');
  },

  // _hideOnLoad: function() {
  //   // this.$().css('display', 'none');
  // //   var currentMessage = this.get('currentMessage');

  // //   /* When transitioning to a new route, if there is a
  // //   message being shown to the user keep it shown with
  // //   no animation until the interval time has ellapsed.
  // //   Otherwise, hide view so we can slide down the message. */

  //   if (!this.get('shouldShow')) {
  //     this.hide();
  //   }

  // //   // this._showOrHide();
  // }.on('didInsertElement'),

  // _showOrHide: function() {
  //   if (this.get('shouldShow')) {
  //     // console.log(this.get('currentMessage'));
  //     this.show();
  //   } else {
  //     // console.log(this.get('currentMessage'));
  //     this.hide();
  //   }
  // }.observes('currentMessage', 'untimedMessages.length'),

});
