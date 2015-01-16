import Em from 'ember';
import Message from './models/message';
import defaultFor from './utils/default-for';

// TODO - Currently the queue can't be extended.

var hider, timer;

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
    var message, newDuration, multiplier;

    console.log(messageProperties);

    /* Allow message to be passed as an object */

    ['content', 'type'].forEach(function(property) {
      var propertyExists = !!messageProperties[property];

      Em.assert('Flash message must have ' + property, propertyExists);
    });

    /* Covers cases with no duration and duration of zero */

    if (!messageProperties.duration) {
      messageProperties.duration = defaultFor(
        messageProperties.duration,
        this.get('interval')
      );
    }

    message = Message.create(messageProperties);

    /* Add animation time to message duration */

    if (message.get('timed')) {
      multiplier = this.get('timedMessages.length') > 0 ? 1 : 2;
      newDuration = this.get('animationDuration') * multiplier;

      message.incrementProperty('duration', newDuration);
    }

    this.pushObject(message);
  },

  removeMessage: function(message) {
    if (this.indexOf(message) > -1) {
      Em.run.cancel(timer);
      Em.run.cancel(hider);
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

      hider = Em.run.later(this, function() {
        this.trigger('willHideQueue');
      }, earlyDuration);

      /* Schedule the timed message to be removed from the queue */

      timer = Em.run.later(this, function() {
        this.removeMessage(currentMessage);
      }, duration);
    }
  }.observes('currentMessage'),

}).create(); /* Creates a singleton */
