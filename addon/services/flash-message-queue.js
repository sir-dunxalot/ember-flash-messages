import Ember from 'ember';
import Message from 'ember-flash-messages/models/message';
import defaultFor from 'ember-flash-messages/utils/default-for';

const {
  A,
  Evented,
  Service,
  computed,
  observer,
  run,
} = Ember;

export default Service.extend(
  Evented, {

  /* Options */

  animationDuration: 500,
  interval: 3000,

  /* Properties */

  content: A(),
  currentMessage: computed.oneWay('timedMessages.firstObject'),
  untimedMessages: computed.filterBy('content', 'timed', false),
  timedMessages: computed.filterBy('content', 'timed', true),

  /* We declare the private properties on the queue so the
  class can be extended easily */

  _hider: Ember.Object.create(),
  _remover: Ember.Object.create(),

  /* Public methods */

  clear() {
    this.set('content', A());
  },

  pushMessage(messageProperties) {
    let message;

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
      const multiplier = this.get('timedMessages.length') > 0 ? 1 : 2;
      const newDuration = this.get('animationDuration') * multiplier;

      message.incrementProperty('duration', newDuration);
    }

    this.get('content').pushObject(message);
  },

  removeMessage(message) {
    const content = this.get('content');

    /* If the message is in the timed queue and it's being
    removed by an early click, cancel the timers that would
    have eventually removed the message from the queue */

    if (content.indexOf(message) > -1) {
      content.removeObject(message);

      if (message.get('timed')) {
        run.cancel(
          this.get('_hider.' + message.get('createdAt'))
        );

        run.cancel(
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

  _queueDidChange: observer('currentMessage', function() {
    const currentMessage = this.get('currentMessage');

    if (currentMessage) {
      const duration = currentMessage.get('duration');
      const earlyDuration = duration - this.get('animationDuration');

      /* Schedule the timed message to be visually hidden */

      this.set('_hider.' + currentMessage.get('createdAt'),
        run.later(this, function() {
          this.trigger('willHideQueue');
        }, earlyDuration)
      );

      /* Schedule the timed message to be removed from the queue */

      this.set('_remover.' + currentMessage.get('createdAt'),
        run.later(this, function() {
          this.removeMessage(currentMessage);
        }, duration)
      );
    }
  }),
});
