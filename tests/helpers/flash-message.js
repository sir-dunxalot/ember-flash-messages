import Em from 'ember';

export default Em.Test.registerAsyncHelper('flashMessage',
  function(app, instance, messageProperties) {
    console.log(argument);

    instance.flashMessage(message);

    // return app.testHelpers.wait();
  }
);
