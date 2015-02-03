import Em from 'ember';

export default Em.Test.registerAsyncHelper('flashMessage',
  function(app, instance, message) {

    instance.flashMessage(message);

    // return app.testHelpers.wait();
  }
);
