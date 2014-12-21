import Em from 'ember';

export default Em.ObjectController.extend({

  actions: {
    showMessage: function(type, message) {
      this.notify(type, message);
    }
  }

});
