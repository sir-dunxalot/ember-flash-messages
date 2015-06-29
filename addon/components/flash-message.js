/* global velocity */

import Ember from 'ember';
import Message from '../models/message';
import defaultFor from '../utils/default-for';
import insert from 'ember-flash-messages/utils/computed/insert';
import layout from 'ember-flash-messages/templates/components/flash-message';

export default Ember.Component.extend({

  /* Options */

  action: null,
  className: 'flash_message',
  content: null,
  iconClassFormat: 'icon-{{type}}',
  message: null,
  type: null,

  message: Ember.computed({
    get() {
      return {
        action: this.get('action'),
        content: this.get('content'),
        duration: this.get('duration'),
        type: this.get('type'),
      }
    },
    set(key, value) {
      this.setProperties(value);
    }
  }),

  /* Properties */

  animationDuration: Ember.computed.oneWay('flashMessageQueue.animationDuration'),
  attributeBindings: ['dataTest:data-test', 'role'],
  classNameBindings: ['className', 'typeClass', 'visible'],
  dataTest: 'flash-message',
  inQueue: Ember.computed.bool('parentView.isMessageQueueComponent'),
  layout: layout,
  removeMessageAction: 'removeMessage',
  role: 'alert',
  tagName: 'dl',
  visible: false,

  iconClass: Ember.computed('iconClassFormat', 'type', function() {
    var format = this.get('iconClassFormat');

    return format.replace('{{type}}', this.get('type'));
  }),

  typeClass: Ember.computed('className', 'type', function() {
    var type = this.get('type');
    var affix = type ? '-' + type : '';

    return this.get('className') + affix;
  }),

  /* Event handling */

  click: function() {
    var _this = this;

    /* Remove message visually... */

    _this.handleClick().then(function() {
      var message = _this.get('message');

      if (_this.get('action')) {

        /* ... Then remove message from queue(s) */

        _this.sendAction('action', message); // Only runs if action is set
      }

      _this.sendAction('removeMessageAction', message);
    });
  },

  handleClick: function() {
    var inQueue = this.get('inQueue');
    var parentView = this.get('parentView');

    return new Ember.RSVP.Promise(function(resolve, reject) {

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

  hide: function() {
    this.$().slideUp(this.get('animationDuration'));
  },

  show: function() {
    this.$().slideDown(this.get('animationDuration'));
  },

  setVisibility: function(shouldShow) {
    var method = shouldShow ? 'show' : 'hide';

    if (!this.get('isDestroying')) {

      /* Enough time to invoke CSS transitions */

      Ember.run.later(this, function() {
        if (!this.get('isDestroying')) {
          this.set('visible', shouldShow);
        }
      }, 100);

      this[method]();
    }
  },

  /* Private methods */

  _hideEndingQueue: Ember.on('willInsertElement', function() {
    var queue = this.get('flashMessageQueue');

    /* If this message is in the timed queue we might
    need to hide the message before it's removed from
    the queue, but only if there are no other messages
    in the queue. */

    if (this.get('message.timed')) {
      queue.on('willHideQueue', this, function() {
        var queueLength = queue.get('timedMessages.length');

        /* If there is not another message queued, start
        hiding the queue */

        if (queueLength === 1) {
          this.setVisibility(false);
        }

        /* However, check to see if another message has been
        added in the interim and, if so, cancel the hiding of
        the queue */

        /* TODO - Remove 0.9, which allows for small margin for error */

        Ember.run.later(this, function() {
          if (queueLength > 1) {
            this.setVisibility(true);
          }
        }, this.get('animationDuration') * 0.9);
      });
    }
  }),

  _showOnRender: Ember.on('didInsertElement', function() {

    /* Assert the required properties are passed. Don't check
    for the content property because this could be used as a
    block helper */

    this.setVisibility(true);
  }),

  _hideOnDestroy: Ember.on('willDestroyElement', function() {
    this.setVisibility(false);
  }),

});
