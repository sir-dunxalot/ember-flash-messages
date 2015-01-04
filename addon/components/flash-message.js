/* global velocity */

import Em from 'ember';
import insert from '../utils/computed/insert';
import Animations from '../mixins/animations';
import Message from '../models/message';

export default Em.Component.extend(
  Animations, {

  action: null,
  attributeBindings: ['dataTest:data-test'],
  classNamesBindings: ['className'],
  classPrefix: 'flash',
  content: null,
  contentClass: insert('classPrefix', '{{value}}-content'),
  dataTest: 'flash-message',
  iconClassFormat: 'icon-{{type}}',
  message: null,
  tagName: 'dl',
  type: null,
  typeClass: insert('classPrefix', '{{value}}-type'),

  className: function() {
    return this.get('classPrefix') + '_message-' + this.get('type');
  }.property('classPrefix', 'type'),

  iconClass: function() {
    this.get('iconClassFormat').replace('{{type}}', this.get('type'));
  }.property('iconClassFormat', 'type'),

  click: function() {
    var _this = this;

    /* Remove message visually... */

    _this._handleClick().then(function() {
      if (_this.get('action')) {

        /* ... Then remove message from queue(s) */

        _this.sendAction('action', _this.get('message')); // Only runs if action is set
      }
    });
  },

  handleClick: function(resolve) {
    var parentView = this.get('parentView');
    var parentViewName = parentView.get('constructor').toString();
    var queueLength;

    if (parentViewName.indexOf('message-queue') > -1) {
      queueLength = this.get('parentView').getQueueLength();

      if (queueLength > 1) {
        resolve();
      } else {
        this.hide();

        Em.run.later(this, resolve, this.get('animationDuration'));
      }
    } else {
      this.removeFromParent();
      resolve();
    }
  },

  _handleClick: function() {
    var _this = this;

    return new Em.RSVP.Promise(function(resolve /*, reject */) {
      _this.handleClick(resolve);
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

});
