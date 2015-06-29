import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('flashMessage',
  function(app, messageType, messageContent) {
    const container = app.__container__;
    const route = container.lookup('route:application');

    route.flashMessage(messageType, messageContent);

    /* Use if async functionality is added */

    // return app.testHelpers.wait();
  }
);
