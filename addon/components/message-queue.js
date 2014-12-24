/* global velocity */

import Em from 'ember';
import Queue from '../queue';

export default Em.Component.extend({
  animationLibrary: 'jQuery',
  attributeBindings: ['dataTest:data-test'],
  classNameBindings: ['className'],
  classPrefix: 'flash',
  currentMessage: Em.computed.oneWay('queue.currentMessage'),
  customHideMethod: null,
  customShowMethod: null,
  dataTest: 'flash-queue',
  interval: Em.computed.alias('queue.interval'),

  className: function() {
    var type = this.get('currentMessage.type');
    type = type ? '-' + type : '';

    return this.get('classPrefix') + type;
  }.property('currentMessage.type', 'classPrefix'),

  queue: function() {
    return Queue;
  }.property().readOnly(),

  show: function() {
    this.setVisibility(true);
  },

  hide: function() {
    this.setVisibility(false);
  },

  setVisibility: function(shouldShow) {
    var lib = this.get('animationLibrary');
    var animationMethod = shouldShow ? 'slideDown' : 'slideUp';
    var customHideMethod = this.get('customHideMethod');
    var customShowMethod = this.get('customShowMethod');

    if (this.get('_state') === 'inDOM') {
      if (shouldShow && customShowMethod) {
        this.get('customShowMethod')(this);
      } else if (customHideMethod) {
        this.get('customHideMethod')(this);
      } else if (lib === 'jQuery') {
        this.$()[animationMethod]('fast');
      } else if (lib === 'velocity') {
        if (Em.$) {
          this.$().velocity(animationMethod);
        } else {
          Em.run.bind(this, function() {
            velocity('#' + this.get('elementId'), animationMethod);
          });
        }
      } else {
        this.set('isVisible', shouldShow);
      }
    }
  },

  _checkForVendor: function() {
    var lib = this.get('animationLibrary');

    Em.warn('The ' + lib + ' library has not been loaded. Please specify a different value for the animationLibrary option on {{message-queue}}', window[lib]);
  }.observes('animationLibrary'),

  _hideOnLoad: function() {
    var currentMessage = this.get('currentMessage');

    /* When transitioning to a new route, if there is a
    message being shown to the user keep it shown with
    no animation until the interval time has ellapsed.
    Otherwise, hide view so we can slide down the message. */

    if (!currentMessage) {
      this.hide();
    }

    this._showOrHide();
  }.on('didInsertElement'),

  _showOrHide: function() {
    if (this.get('currentMessage')) {
      this.show();
    } else {
      this.hide();
    }
  }.observes('currentMessage'),

});
