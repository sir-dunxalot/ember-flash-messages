/* global velocity */

import Em from 'ember';
import insert from '../utils/computed/insert';
import Animations from '../mixins/animations';
import Message from '../models/message';

export default Em.Component.extend(
  Animations, {

  /* Options */

  action: null,
  classPrefix: 'flash',
  content: null,
  message: null,
  type: null,

  /* Properties */

  animationDuration: 500,
  attributeBindings: ['dataTest:data-test'],
  // classNamesBindings: ['className'],
  classNames: ['flash_message'],
  contentClass: insert('classPrefix', '{{value}}-content'),
  dataTest: 'flash-message',
  iconClassFormat: 'icon-{{type}}',
  inQueue: Em.computed.bool('parentView.queue'),
  tagName: 'dl',
  typeClass: insert('classPrefix', '{{value}}-type'),

  // className: function() {
  //   return this.get('classPrefix') + '_message-' + this.get('type');
  // }.property('classPrefix', 'type'),

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

    /* If message is in the queue, see if the queue should remain visible... */

    if (this.get('inQueue') && parentView.getQueueLength() > 1) {
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

  shouldShow: function() {
    this.show();
  }.on('didInsertElement'),

  shouldHide: function() {
    this.hide();
  }.on('willDestroyElement'),

  /* Private methods */

  _handleClick: function() {
    var _this = this;

    return new Em.RSVP.Promise(function(resolve, reject) {
      _this.handleClick(resolve, reject);
    });
  },

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

  _hideEndingQueue: function() {
    var _this = this;

    if (_this.get('inQueue')) {
      _this.get('parentView.queue').on('willChangeMessage', function() {
        _this.hide();
      });
    }
  }.on('willInsertElement'),

});
