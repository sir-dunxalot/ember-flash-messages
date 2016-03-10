import Ember from 'ember';
import FlashMessage from 'ember-flash-messages/models/flash-message';

const {
  Component,
  RSVP,
  computed,
  run,
  on
} = Ember;

export default Component.extend({

  /* Options */

  action: null,
  className: 'flash-message',
  content: null,
  duration: null,
  iconClassFormat: 'icon-{{type}}',
  type: null,

  message: computed({
    get() {
      return FlashMessage.create({
        action: this.get('action'),
        content: this.get('content'),
        createdAt: this.get('createdAt'),
        duration: this.get('duration'),
        type: this.get('type'),
      });
    },
    set(key, value) {
      this.setProperties(value);
    }
  }),

  /* Properties */

  animationDuration: computed.oneWay('flashMessageQueue.animationDuration'),
  attributeBindings: ['role'],
  classNameBindings: ['className', 'typeClass', 'visible'],
  createdAt: null,
  dataTest: 'flash-message',
  inQueue: computed.bool('parentView.isMessageQueueComponent'),
  removeMessageAction: null,
  role: 'alert',
  tagName: 'dl',
  visible: false,

  iconClass: computed('iconClassFormat', 'type', function() {
    const format = this.get('iconClassFormat');

    return format.replace('{{type}}', this.get('type'));
  }),

  typeClass: computed('className', 'type', function() {
    const { className, type } = this.getProperties(
      [ 'className', 'type' ]
    );
    const affix = type ? '-' + type : '';

    return `${className}${affix}`;
  }),

  /* Event handling */

  click() {

    /* Remove message visually... */

    this.handleClick().then(function() {
      const message = this.get('message') || this.get('attrs.message.value');

      /* this.sendAction('action') is automatically run here */

      /* ... Then remove message from queue(s) */

      this.sendAction('removeMessageAction', message);
    }.bind(this));
  },

  handleClick() {
    const { inQueue, parentView } = this.getProperties(
      [ 'inQueue', 'parentView' ]
    );

    return new RSVP.Promise(function(resolve /*, reject */) {

      /* If message is in the queue, see if the queue should remain visible... */

      if (inQueue && parentView.getQueueLength() > 1) {
        resolve();
      } else {
        this.setVisibility(false);

        Ember.run.later(this, function() {
          if (!inQueue) {
            this.removeFromParent();
          }

          resolve();
        }, this.get('animationDuration'));
      }

    }.bind(this));
  },

  /* Animation methods */

  hide() {
    this.$().slideUp(this.get('animationDuration'));
  },

  show() {
    this.$().slideDown(this.get('animationDuration'));
  },

  setVisibility(shouldShow) {
    var method = shouldShow ? 'show' : 'hide';

    if (!this.get('isDestroying')) {

      /* Enough time to invoke CSS transitions */

      run.later(this, function() {
        if (!this.get('isDestroying')) {
          this.set('visible', shouldShow);
        }
      }, 100);

      this[method]();
    }
  },

  /* Private methods */

  _hideEndingQueue: Ember.on('willInsertElement', function() {
    const queue = this.get('flashMessageQueue');

    /* If this message is in the timed queue we might
    need to hide the message before it's removed from
    the queue, but only if there are no other messages
    in the queue. */

    if (queue && this.get('message.timed')) {
      queue.on('willHideQueue', this, function() {
        const queueLength = queue.get('timedMessages.length');

        /* If there is not another message queued, start
        hiding the queue */

        if (queueLength === 1) {
          this.setVisibility(false);
        }

        /* However, check to see if another message has been
        added in the interim and, if so, cancel the hiding of
        the queue */

        /* TODO - Remove 0.9, which allows for small margin for error */

        run.later(this, function() {
          if (queueLength > 1) {
            this.setVisibility(true);
          }
        }, this.get('animationDuration') * 0.9);
      });
    }
  }),

  _showOnRender: on('didInsertElement', function() {

    /* Assert the required properties are passed. Don't check
    for the content property because this could be used as a
    block helper */

    this.setVisibility(true);
  }),

  _hideOnDestroy: on('willDestroyElement', function() {
    this.setVisibility(false);
  }),

});
