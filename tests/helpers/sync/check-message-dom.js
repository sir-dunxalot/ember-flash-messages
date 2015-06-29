import Ember from 'ember';

function inspectWithin(name, context) {

}

export default Ember.Test.registerHelper('checkMessageDom',
  function(app, assert, expectedMessage, jqueryElement) {
    let className = expectedMessage.className

    if (!className) {
      const flashMessageComponent = app.__container__.lookup('component:flash-message');

      className = flashMessageComponent.get('className');
    }

    /* Check the wrapping element */

    assert.notEqual(jqueryElement.length, 0,
      'The jquery element passed into checkMessageDom should exist');

    assert.ok(jqueryElement.length, 1,
      'The jquery element passed into checkMessageDom should be unique');

    assert.ok(jqueryElement.hasClass(className),
      'The message element should have the class name bound');

    assert.ok(jqueryElement.hasClass(`${className}-${expectedMessage.type}`),
      'The message element should have the correct type class bound');

    assert.equal(jqueryElement.attr('role'), 'alert',
      'The message element should have the ARIA role bound');

    /* Then check the icon */

    // assert.ok(inspect('icon'))

  }
);
