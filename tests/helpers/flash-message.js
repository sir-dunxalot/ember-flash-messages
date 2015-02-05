import Em from 'ember';

export default Em.Test.registerAsyncHelper('flashMessage',
  function(app, instance, message) {

    instance.flashMessage(message);

    // Use if async functionality is added
    // return app.testHelpers.wait();
  }
);
