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

    /* Covers cases with no duration and duration of zero */

    if (!message.duration) {
      message.duration = defaultFor(message.duration, this.get('interval'));
    }

    /* Add animation time to message duration */

    if (message.duration !== 0) {
      message.duration += this.get('animationDuration') * 2;
    }

    console.log('pushing', message);

    this.pushObject(Message.create(message));
  },

  removeMessage: function(message) {
    message = defaultFor(message, this.get('currentMessage'));

    console.log('removing', message);

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
