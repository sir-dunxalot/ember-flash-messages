import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import selectorFor from '../../helpers/selector-for';

const { RSVP, run } = Ember;
const { isFunction, typeOf } = window.QUnit;

let component, set;

function setProperties(properties) {
  run(function() {
    component.setProperties(properties);
  });
}

moduleForComponent('flash-message', 'Unit | Component | flash message', {
  unit: true,

  beforeEach: function() {
    component = this.subject();
  },

});

/* Test the correct data attribtues are set on the component for testing */

test('Data test attributes', function(assert) {

  assert.ok(component.get('dataTest'),
    'Component should have a dataTest property');

  assert.equal(this.$().attr('data-test'), 'flash-message',
    'Component should have a data-test attribute');

  ['button', 'content', 'icon'].forEach(function(name) {

    assert.ok(this.$().find(selectorFor(name)).length,
      'Component layout should have an element for the ' + name);

  }, this);

});

/* Default component functionality */

test('Default properties and methods', function(assert) {
  const className = 'new-class';
  const type = 'success';

  const required = [
    'className',
    'iconClassFormat',
  ];

  const shouldBeNull = [
    'action',
    'content',
    'type',
  ];

  /* Check properties */

  required.forEach(function(property) {

    assert.ok(component.get(property),
      'Component should have a default value for ' + property);

  });

  shouldBeNull.forEach(function(property) {

    assert.strictEqual(component.get(property), null,
      property + ' should be defined but not set (equal to null)');

  });

  assert.ok(this.$().hasClass(component.get('className')),
    'Component element should have the default class name');

  typeOf(component.get('inQueue'), 'boolean',
    'inQueue should be a boolean property');

  assert.strictEqual(component.get('visible'), false,
    'visible should be false');

  assert.ok(!this.$().hasClass('visible'),
    'Component element should not initially have a visible class');

  /* Test changing the properties */

  setProperties({ className });

  assert.ok(this.$().hasClass(className),
    'Component element should have new class name');

  setProperties({ type });

  assert.ok(this.$().hasClass(className + '-' + type),
    'Component element should have new type class name');

  /* Check methods */

  ['hide', 'show', 'setVisibility'].forEach(function(method) {

    isFunction(component[method],
      'Component should have a ' + method + ' method');

  });

});

test('Message property', function(assert) {
  const newMessage = {
    action: 'someAction',
    content: 'Oh no, that is an error!',
    duration: 2023,
    type: 'error',
  };

  const message = component.get('message');

  assert.expect(8);

  for (let property in newMessage) {
    assert.strictEqual(message.get(property), null,
      `The message property should contain a ${property} property but it should not be set`);
  }

  setProperties({
    message: newMessage
  });

  for (let property in newMessage) {
    assert.equal(component.get(property), newMessage[property],
      `The ${property} property should have updated after message was set`);
  }
});

/* Test the usability of the outputted DOM */

test('Usability', function(assert) {
  const role = 'alert';

  assert.equal(component.get('tagName'), 'dl',
    'Component element should be a definition list');

  assert.equal(component.get('role'), role,
    'Component element\'s role should be ' + role);

  assert.equal(this.$().attr('role'), role,
    'Component element should have its role attribute bound');

});

/* Test the events invoked by the app and user */

test('Event handling', function(assert) {

  assert.expect(3);

  ['click', 'handleClick'].forEach(function(method) {

    isFunction(component[method],
      'Component should have a ' + method + ' method');

  });

  /* Handle click should be a promise */

  setProperties({
    handleClick: function() {
      return new RSVP.Promise(function(resolve, reject) {

        assert.ok(true,
          'Clicking on the component should call handleClick');

      });
    },
  });

  this.$().click();

});
