/* global velocity */

import Em from 'ember';
import Queue from 'em-notify/queue';
import insert from 'em-notify/utils/computed/insert';

export default Em.Component.extend({
  animationLibrary: 'jQuery',
  classNameBindings: ['typeClass'],
  classPrefix: 'notify',
  currentMessage: Em.computed.oneWay('queue.currentMessage'),
  customHideMethod: null,
  customShowMethod: null,
  hiddenClass: insert('classPrefix', '{{value}}-hidden'),
  interval: Em.computed.alias('queue.interval'),
  tagName: 'dl',

  typeClass: function() {
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
    var customHideMethod = this.get('customHideMethod');
    var customShowMethod = this.get('customShowMethod');
    var animationMethod = shouldShow ? 'slideDown' : 'slideUp';

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
  },

  /* You can use any type (e.g. error, warning, etc) with notify,
  but this is an example of how you can use Notify with pre-determined
  message types, each with their own icon */

  icons: {
  //   error: 'icon-incorrect',
  //   info: 'icon-info',
  //   success: 'icon-correct',
  //   warning: 'icon-warning',
  },

  _checkForVendor: function() {
    var lib = this.get('animationLibrary');

    Em.assert('The ' + lib + ' library has not been loaded. Please specify a different value for em-notify\'s animationLibrary option.', window[lib]);
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

  _setIconClass: function() {
    var icons = this.get('icons');
    var type = this.get('currentMessage.type');
    var className = icons[type];

    if (type && className) {
      this.set('currentMessage.iconClass', className);
    }
  }.observes('currentMessage.type'),

  _showOrHide: function() {
    if (this.get('currentMessage')) {
      this.show();
    } else {
      this.hide();
    }
  }.observes('currentMessage'),

});
