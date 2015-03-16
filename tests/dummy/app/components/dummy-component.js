import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'dummy-component',
  actions: {
    showFlash: function() {
      this.flashMessage("success", "Component clicked!");
    }
  }
});
