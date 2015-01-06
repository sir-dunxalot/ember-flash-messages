import Em from 'ember';

export default Em.ObjectController.extend({

  actions: {
    showMessage: function(type, content, duration) {
      if (duration || duration === 0) {
        this.flashMessage({
          type: type,
          content: content,
          duration: duration
        });
      } else {
        this.flashMessage(type, content);
      }
    }
  }

});
