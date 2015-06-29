import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('flashMessage',
  function(app, instance, message) {

    instance.flashMessage(message);

    /* Use if async functionality is added */

    // return app.testHelpers.wait();
  }
);
