import Ember from 'ember';

export default Ember.Controller.extend({
  examples: Ember.A([
    {
      type: 'success',
      content: 'This is the first message'
    }, {
      type: 'error',
      content: 'This is the second message'
    }, {
      type: 'success',
      content: 'This is a message than will not show for long',
      duration: 1000
    }, {
      type: 'success',
      content: 'This is a message will show for as long as you want!',
      duration: 0
    }, {
      type: 'warning',
      content: 'This is a message will also show for as long as you want!',
      duration: 0
    }, {
      type: 'success',
      content: '<div>This <i>message</i> has <strong>HTML</strong></div>',
    }, {
      type: 'success',
      content: "{{#link-to 'index'}}Go home{{/link-to}}",
    }, {
      // See what happens with no arguments
    }
  ]),

  actions: {
    showMessage: function(index) {
      this.flashMessage(this.get('examples').objectAt(index));
    }
  }

});
