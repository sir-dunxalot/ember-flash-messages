import Em from 'ember';

export default Em.ObjectController.extend({

  actions: {
    showMessage: function(type, content, duration) {
      this.flashMessage(type, content, duration);
    }
  }

});
