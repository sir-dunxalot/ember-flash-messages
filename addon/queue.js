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
    var message;

    /* Allow message to be passed as an object */

    if (typeof type === 'object') {
      message = type;
    } else {
      message = {
        type: type,
        content: content,
        duration: duration
      }
    }

    Em.assert('Flash message must have a type', message.type);
    Em.assert('Flash message must have content', message.content);

    /* Covers cases with no duration and duration of zero */

    if (!message.duration) {
      message.duration = defaultFor(message.duration, this.get('interval'));
    }

    /* Add animation time to message duration */

    if (message.duration !== 0) {
      message.duration += this.get('animationDuration') * 2;
    }

    this.pushObject(Message.create(message));
  },

  removeMessage: function(message) {
    message = defaultFor(message, this.get('currentMessage'));

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

    // console.log(currentMessage);

    if (currentMessage) {
      duration = currentMessage.get('duration');
      earlyDuration = duration - this.get('animationDuration');

      /* Schedule the timed message to be visually hidden */

      Em.run.later(this, this.trigger, 'willHideQueue', earlyDuration);

      /* Schedule the timed message to be removed from the queue */

      Em.run.later(this, this.removeMessage, currentMessage, duration);
    }
  }.observes('currentMessage'),

}).create(); /* The magic */
