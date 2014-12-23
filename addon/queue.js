import Em from 'ember';
import Message from 'em-notify/message';
import defaultFor from 'em-notify/utils/default-for';

export default Em.ArrayProxy.extend({
  content: Em.A(),
  currentMessage: Em.computed.oneWay('firstObject'),
  interval: 3000, // Duration to show each message

  pushMessage: function(type, content, duration) {
    duration = defaultFor(duration, this.get('interval'));

    this.pushObject(
      Message.create({
        content: content,
        duration: duration,
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
    var duration = this.get('currentMessage.duration');

    Em.run.throttle(this, this._delayRemoval, duration, duration);
  }.observes('currentMessage'),

  _delayRemoval: function(duration) {
    Em.run.later(this, this.removeMessage, duration);
  },

}).create();
