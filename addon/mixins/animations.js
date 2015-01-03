import Em from 'ember';

export default Em.Mixin.create({
  animationLibrary: 'jQuery',

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

});
