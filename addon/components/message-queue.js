/* global velocity */

import Em from 'ember';
import Queue from '../queue';
import Animations from '../mixins/animations';

export default Em.Component.extend(
  Animations, {

  attributeBindings: ['dataTest:data-test'],
  classNameBindings: ['className'],
  classPrefix: 'flash',
  currentMessage: Em.computed.oneWay('queue.currentMessage'),
  customHideMethod: null,
  customShowMethod: null,
  dataTest: 'flash-queue',
  interval: Em.computed.alias('queue.interval'),
  nonTimedMessages: Em.computed.oneWay('queue.nonTimedMessages'),

  className: function() {
    var type = this.get('currentMessage.type');
    type = type ? '-' + type : '';

    return this.get('classPrefix') + type;
  }.property('currentMessage.type', 'classPrefix'),

  queue: function() {
    return Queue;
  }.property().readOnly(),

  actions: {
    removeMessage: function(message) {
      console.log('Action received');
      this.get('queue').removeMessage(message);
    }
  },

  _hideOnLoad: function() {
    var currentMessage = this.get('currentMessage');

    /* When transitioning to a new route, if there is a
    message being shown to the user keep it shown with
    no animation until the interval time has ellapsed.
    Otherwise, hide view so we can slide down the message. */

    if (!currentMessage) {
      this.hide();
    }

    this._showOrHide();
  }.on('didInsertElement'),

  _showOrHide: function() {
    if (this.get('currentMessage') || this.get('nonTimedMessages.length')) {
      this.show();
    } else {
      this.hide();
    }
  }.observes('currentMessage', 'nonTimedMessages.length'),

});
