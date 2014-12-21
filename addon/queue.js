import Em from 'ember';
import Message from 'em-notify/message';
import defaultFor from 'em-notify/utils/default-for';

export default Em.ArrayProxy.extend({
  content: Em.A(),
  currentMessage: Em.computed.oneWay('content.firstObject'),
  interval: 3000, // Duration to show each message

  pushMessage: function(type, message, duration) {
    duration = defaultFor(duration, this.get('interval'));

    this.pushObject(
      Message.create({
        duration: duration,
        message: message,
        type: type
      })
    );
  },

  removeMessage: function(message) {
    message = defaultFor(message, this.get('currentMessage'));

    if (this.indexOf(message) > -1) {
      this.removeObject(message);
    } else {
      Em.warn('Message not found in notify queue: ' + JSON.stringify(message));
    }
  },

  _queueDidChange: function() {
    var messageDuration = this.get('currentMessage.duration');
    var duration = defaultFor(messageDuration, this.get('interval'));

    Em.run.throttle(this, this._middleman, duration, duration);
  }.observes('content.[]'),

  _middleman: function(duration) {
    Em.run.later(this, this.removeMessage, duration);
  },

}).create();
