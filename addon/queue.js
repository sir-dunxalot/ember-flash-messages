import Em from 'ember';
import Message from './models/message';
import defaultFor from './utils/default-for';

export default Em.ArrayProxy.extend(
  Em.Evented, {

  animationDuration: 500,
  content: Em.A(),
  currentMessage: Em.computed.oneWay('timedMessages.firstObject'),
  interval: 3000, // Duration to show each message
  untimedMessages: Em.computed.filterBy('content', 'timed', false),
  timedMessages: Em.computed.filterBy('content', 'timed', true),

  /* Public methods */

  clear: function() {
    this.set('content', Em.A());
  },

  pushMessage: function(type, content, duration) {
    duration = defaultFor(duration, this.get('interval'));

    /* Add animation time to message duration */

    duration += this.get('animationDuration') * 2;

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

    // We could implement Em.run.cancel here to cancel the run.later call ni _queueDidChange but it's a lot of overhead

    if (this.indexOf(message) > -1) {
      this.removeObject(message);
    } else {
      Em.warn('Message not found in message queue: ' + JSON.stringify(message));
    }
  },

  /* Private methods */

  _queueDidChange: function() {
    var currentMessage = this.get('currentMessage');
    var duration, earlyDuration;

    if (currentMessage) {
      duration = currentMessage.get('duration');
      earlyDuration = duration - this.get('animationDuration');

      /* Schedule the timed message to be visually hidden */

      Em.run.later(this, this.trigger, 'willChangeMessage', earlyDuration);

      /* Schedule the timed message to be removed from the queue */

      Em.run.later(this, this.removeMessage, currentMessage, duration);
    }
  }.observes('currentMessage'),

}).create(); /* The magic */
