import Ember from 'ember';

export default Ember.Test.registerHelper('checkMessageDom',
  function(app, assert, element, expectedMessage) {
    const isJqueryObject = element instanceof Ember.$;
    const expectedType = expectedMessage.type;

    let animationDuration, className, container, iconClassFormat, flashMessageComponent;

    assert.notEqual(element.length, 0,
      'The jquery element passed into checkMessageDom should exist');

    Ember.assert('It looks like you passed a DOM element to the checkMessageDom helper. The helper expects a jQuery element.', isJqueryObject);

    /* Allow default values to be overridden */

    className = expectedMessage.className;
    iconClassFormat = expectedMessage.iconClassFormat;

    container = app.__container__;
    flashMessageComponent = container.lookup('component:flash-message');
    animationDuration = flashMessageComponent.get('animationDuration');
    iconClassFormat = flashMessageComponent.get('iconClassFormat');

    if (!className) {
      className = flashMessageComponent.get('className');
    }

    if (!iconClassFormat) {
      iconClassFormat = flashMessageComponent.get('iconClassFormat');
    }

    /* Inspect child elements */

    const buttonElement = inspect('button', element);
    const contentElement = inspect('content', element);
    const iconElement = inspect('icon', element);
    const typeElement = inspect('type', element);

    /* Check the wrapping element */

    assert.equal(element.length, 1,
      'The jquery element passed into checkMessageDom should be unique');

    assert.ok(element.hasClass(className),
      'The message element should have the class name bound');

    assert.ok(element.hasClass(`${className}-${expectedMessage.type}`),
      'The message element should have the correct type class bound');

    Ember.run.later(this, function() {

      assert.ok(element.hasClass('visible'),
        'The message element should have the visible class bound');

    }, animationDuration);

    assert.equal(element.attr('role'), 'alert',
      'The message element should have the ARIA role bound');

    /* Then check the button element */

    if (expectedMessage.duration === 0) {

      assert.ok(buttonElement.length,
        'The button element should be present in the message');

    }

    /* Then check the content element */

    assert.ok(contentElement.length,
      'The content element should be present in the message');

    assert.equal($.trim(contentElement[0].textContent), expectedMessage.content,
      'The type element should contain the message content');

    /* Then check the icon element */

    assert.ok(iconElement.length,
      'The icon element should be present in the message');

    assert.ok(iconElement.hasClass(iconClassFormat.replace('{{type}}', expectedType)),
      'The icon element should have the icon class containing the correct message type');

    /* Then check the type */

    assert.ok(typeElement.length,
      'The type element should be present in the message');

    assert.ok(typeElement.hasClass('hidden'),
      'The type element should have the hidden class');

    assert.equal(typeElement.html().trim(), expectedType,
      'The type element should contain the message type');

  }
);
