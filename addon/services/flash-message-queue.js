import Ember from 'ember';
import Message from '../models/message';
import defaultFor from '../utils/default-for';

export default Ember.Service.extend(
  Ember.Evented, {

  /* Options */

  animationDuration: 500,
  interval: 3000,

  /* Properties */

  content: Ember.A(),
  currentMessage: Ember.computed.oneWay('timedMessages.firstObject'),
  untimedMessages: Ember.computed.filterBy('content', 'timed', false),
  timedMessages: Ember.computed.filterBy('content', 'timed', true),

  /* We declare the private properties on the queue so the
  class can be extended easily */

  _hider: Ember.Object.create(),
  _remover: Ember.Object.create(),

  /* Public methods */

  clear: function() {
    this.set('content', Ember.A());
  },

  pushMessage: function(messageProperties) {
    var message, newDuration, multiplier;

    /* Allow message to be passed as an object */

    ['content', 'type'].forEach(function(property) {
      var propertyExists = !!messageProperties[property];

      Ember.assert('You must pass the ' + property + ' property to flashMessage', propertyExists);
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

    this.get('content').pushObject(message);
  },

  removeMessage: function(message) {
    const content = this.get('content');

    /* If the message is in the timed queue and it's being
    removed by an early click, cancel the timers that would
    have eventually removed the message from the queue */

    if (content.indexOf(message) > -1) {
      content.removeObject(message);

      if (message.get('timed')) {
        Ember.run.cancel(
          this.get('_hider.' + message.get('createdAt'))
        );

        Ember.run.cancel(
          this.get('_remover.' + message.get('createdAt'))
        );
      }
    } else {
      Ember.warn('Message not found in message queue: ' +
        JSON.stringify(message)
      );
    }
  },

  /* Private methods */

  _queueDidChange: Ember.observer('currentMessage', function() {
    var currentMessage = this.get('currentMessage');
    var duration, earlyDuration;

    if (currentMessage) {
      duration = currentMessage.get('duration');
      earlyDuration = duration - this.get('animationDuration');

      /* Schedule the timed message to be visually hidden */

      this.set('_hider.' + currentMessage.get('createdAt'),
        Ember.run.later(this, function() {
          this.trigger('willHideQueue');
        }, earlyDuration)
      );

      /* Schedule the timed message to be removed from the queue */

      this.set('_remover.' + currentMessage.get('createdAt'),
        Ember.run.later(this, function() {
          this.removeMessage(currentMessage);
        }, duration)
      );
    }
  }),
});
