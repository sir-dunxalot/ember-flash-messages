/* global velocity */

import Em from 'ember';
import insert from '../utils/computed/insert';
import Animations from '../mixins/animations';
import Message from '../message';

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

  // Explanation for why not using a CP

  click: function() {
    this.handleClick();
    if (this.get('action')) {
      this.sendAction('action', this.get('message')); // Only runs if action is set
    }
  },

  handleClick: function() {
    // this.hide();

    // Em.run.later(this, function() {
    //   this.removeFromParent();
    // }, 500);
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


// With promises:

// click: function() {
//   var _this = this;

//   _this._handleClick().then(function() {
//     _this.sendAction();
//   });
// },

// handleClick: function(resolve) {
//   Em.run.later(this, function() {
//     resolve();
//   }, 1000);
// },

// _handleClick: function() {
//   var _this = this;

//   return new Em.RSVP.Promise(function(resolve /*, reject */) {
//     _this.handleClick(resolve);
//   });
// },
