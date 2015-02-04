import Em from 'ember';
import Message from './models/message';
import defaultFor from './utils/default-for';

export default Em.ArrayProxy.extend(
  Em.Evented, {

  /* Options */

  animationDuration: 500,
  interval: 3000,

  /* Properties */

  content: Em.A(),
  currentMessage: Em.computed.oneWay('timedMessages.firstObject'),
  untimedMessages: Em.computed.filterBy('content', 'timed', false),
  timedMessages: Em.computed.filterBy('content', 'timed', true),

  /* We declare the private properties on the queue so the
  class can be extended easily */

  _hider: Em.Object.create(),
  _remover: Em.Object.create(),

  /* Public methods */

  clear: function() {
    this.set('content', Em.A());
  },

  pushMessage: function(messageProperties) {
    var message, newDuration, multiplier;

    /* Allow message to be passed as an object */

    ['content', 'type'].forEach(function(property) {
      var propertyExists = !!messageProperties[property];

      Em.assert('You must pass the ' + property + ' property to flashMessage', propertyExists);
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

  createID: function(message) {
    return message.get('content').dasherize()/* + Date.now()*/;
  },

  removeMessage: function(message) {

    /* If the message is in the timed queue and it's being
    removed by an early click, cancel the timers that would
    have eventually removed the message from the queue */

    if (this.indexOf(message) > -1) {
      this.removeObject(Message.create(message));

      if (message.get('timed')) {
        Em.run.cancel(
          this.get('_hider.' + this.createID(message))
        );

        Em.run.cancel(
          this.get('_remover.' + this.createID(message))
        );
      }
    } else {
      Em.warn('Message not found in message queue: ' +
        JSON.stringify(message)
      );
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

      this.set('_hider.' + this.createID(currentMessage),
        Em.run.later(this, function() {
          this.trigger('willHideQueue');
        }, earlyDuration)
      );

      /* Schedule the timed message to be removed from the queue */

      this.set('_remover.' + this.createID(currentMessage),
        Em.run.later(this, function() {
          this.removeMessage(currentMessage);
        }, duration)
      );
    }
  }.observes('currentMessage'),

}).create(); /* Creates a singleton */
