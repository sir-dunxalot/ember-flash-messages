/* global velocity */

import Em from 'ember';
import defaultFor from '../utils/default-for';
import insert from '../utils/computed/insert';
import Message from '../models/message';

export default Em.Component.extend({

  /* Options */

  action: null,
  classPrefix: 'flash',
  content: null,
  message: null,
  type: null,

  /* Properties */

  attributeBindings: ['dataTest:data-test'],
  classNames: ['flash_message'],
  contentClass: insert('classPrefix', '{{value}}-content'),
  dataTest: 'flash-message',
  iconClassFormat: 'icon-{{type}}',
  inQueue: Em.computed.bool('parentView.queue'),
  tagName: 'dl',
  typeClass: insert('classPrefix', '{{value}}-type'),

  animationDuration: function() {
    return defaultFor(this.get('parentView.animationDuration'), 500);
  }.property('parentView.animationDuration'),

  iconClass: function() {
    this.get('iconClassFormat').replace('{{type}}', this.get('type'));
  }.property('iconClassFormat', 'type'),

  /* Methods */

  click: function() {
    var _this = this;

    /* Remove message visually... */

    _this._handleClick().then(function() {
      if (_this.get('action')) {

        /* ... Then remove message from queue(s) */

        _this.sendAction('action', _this.get('message')); // Only runs if action is set
      }
    }, function() {
      Em.warn('handleClick returned a rejection');
    });
  },

  handleClick: function(resolve, reject) {
    var parentView = this.get('parentView');
    var inQueue = this.get('inQueue');

    /* If message is in the queue, see if the queue should remain visible... */

    if (inQueue && parentView.getQueueLength() > 1) {
      resolve();
    } else {
      this.hide();

      Em.run.later(this, function() {
        if (!inQueue) {
          this.removeFromParent();
        }

        resolve();
      }, this.get('animationDuration'));
    }
  },

  /* Animation methods */

  setVisibility: function(shouldShow) {
    var animationMethod = shouldShow ? 'slideDown' : 'slideUp';

    if (this.get('_state') === 'inDOM') {
      this.$()[animationMethod](this.get('animationDuration'));
    }
  },

  show: function() {
    this.setVisibility(true);
  },

  hide: function() {
    this.setVisibility(false);
  },

  /* Private methods */

  _handleClick: function() {
    var _this = this;

    return new Em.RSVP.Promise(function(resolve, reject) {
      _this.handleClick(resolve, reject);
    });
  },

  _hideEndingQueue: function() {
    var _this = this;
    var queue = _this.get('parentView.queue');

    /* If this message is in the timed queue we might need to hide the message before it's removed from the queue, but only if there are no other messages in the queue. */

    if (_this.get('message.timed')) {
      queue.on('willHideQueue', function() {
        var queueLength = queue.get('timedMessages.length');

        /* If there is not another message queued, start hiding the queue */

        if (queueLength === 1) {
          _this.hide();
        }

        /* However, check to see if another message has been added in the interim and, if so, cancel the hiding of the queue */

        Em.run.later(this, function() {
          if (queueLength > 1) {
            _this.show();
          }
        }, this.get('animationDuration') * 0.9); // Allows for small margin of error
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

  _willShow: function() {
    this.show();
  }.on('didInsertElement'),

  _willHide: function() {
    this.hide();
  }.on('willDestroyElement'),

});
