import Em from 'ember';
import Message from './models/message';
import defaultFor from './utils/default-for';

export default Em.ArrayProxy.extend(
  Em.Evented, {

  animationDuration: 500, // Default duration to account for animations
  content: Em.A(),
  currentMessage: Em.computed.oneWay('timedMessages.firstObject'),
  interval: 3000, // Default duration to show each message
  untimedMessages: Em.computed.filterBy('content', 'timed', false),
  timedMessages: Em.computed.filterBy('content', 'timed', true),

  /* Public methods */

  clear: function() {
    this.set('content', Em.A());
  },

  pushMessage: function(messageProperties) {
    var message, isTimed, multiplier;

    /* Allow message to be passed as an object */

    Em.assert('Flash message must have a type', messageProperties.type);
    Em.assert('Flash message must have content', messageProperties.content);

    /* Covers cases with no duration and duration of zero */

    console.log(messageProperties);

    if (!messageProperties.duration) {
      messageProperties.duration = defaultFor(messageProperties.duration, this.get('interval'));
    }

    message = Message.create(messageProperties);
    isTimed = message.get('timed');

    /* Add animation time to message duration */

    if(isTimed) {
      multiplier = this.get('timedMessages.length') > 0 ? 1 : 2;

      message.incrementProperty('duration', this.get('animationDuration') * multiplier);
    }

    this.pushObject(message);
  },

  removeMessage: function(message) {
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

      Em.run.later(this, this.trigger, 'willHideQueue', earlyDuration);

      /* Schedule the timed message to be removed from the queue */

      Em.run.later(this, this.removeMessage, currentMessage, duration);
    }
  }.observes('currentMessage'),

}).create(); /* Creates a singleton */
