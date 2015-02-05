/* global velocity */

import Em from 'ember';
import defaultFor from '../utils/default-for';
import insert from '../utils/computed/insert';
import Message from '../models/message';

export default Em.Component.extend({

  /* Options */

  action: null,
  className: 'flash_message',
  content: null,
  iconClassFormat: 'icon-{{type}}',
  message: null,
  type: null,

  /* Properties */

  attributeBindings: ['dataTest:data-test', 'role'],
  classNameBindings: ['typeClass', 'visible'],
  classNames: ['flash_message'],
  dataTest: 'flash-message',
  inQueue: Em.computed.bool('parentView.queue'),
  removeMessageAction: 'removeMessage',
  role: 'alert',
  tagName: 'dl',
  visible: false,

  animationDuration: function() {
    return defaultFor(this.get('parentView.animationDuration'), 500);
  }.property('parentView.animationDuration'),

  iconClass: function() {
    var format = this.get('iconClassFormat');

    return format.replace('{{type}}', this.get('type'));
  }.property('iconClassFormat', 'type'),

  typeClass: function() {
    var type = this.get('type');
    var affix = type ? '-' + type : '';

    return this.get('className') + affix;
  }.property('className', 'type'),

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

  handleClick: function(resolve, reject) {
    var _this = this;
    var parentView = this.get('parentView');
    var inQueue = this.get('inQueue');

    return new Em.RSVP.Promise(function(resolve, reject) {

      /* If message is in the queue, see if the queue should remain visible... */

      if (inQueue && parentView.getQueueLength() > 1) {
        resolve();
      } else {
        _this.setVisibility(false);

        Em.run.later(_this, function() {
          if (!inQueue) {
            _this.removeFromParent();
          }

          resolve();
        }, _this.get('animationDuration'));
      }

    });
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

      Em.run.later(this, function() {
        if (!this.get('isDestroying')) {
          this.set('visible', shouldShow);
        }
      }, 100);

      this[method]();
    }
  },

  /* Private methods */

  _hideEndingQueue: function() {
    var queue = this.get('parentView.queue');

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

        Em.run.later(this, function() {
          if (queueLength > 1) {
            this.setVisibility(true);
          }
        }, this.get('animationDuration') * 0.9);
      });
    }
  }.on('willInsertElement'),

  _setMessageProperties: function() {
    var message = this.get('message');
    var keys = ['content', 'duration', 'type'];
    var changes = {};

    if (message) {
      keys.forEach(function(key) {
        var property = message.get(key);

        if (property) {
          changes[key] = property;
        }
      });

      this.setProperties(changes);
    }
  }.observes('message').on('willInsertElement'),

  _showOnRender: function() {

    /* Assert the required properties are passed. Don't check
    for the content property because this could be used as a
    block helper */

    this.setVisibility(true);
  }.on('didInsertElement'),

  _hideOnDestroy: function() {
    this.setVisibility(false);
  }.on('willDestroyElement'),

});
