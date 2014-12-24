import Em from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { inspect } from '../../helpers/inspect';
import message from '../../helpers/message';

var component;

var pushMessage = function (type, message, duration) {
  Em.run(function() {
    component.get('queue').pushMessage(type, message, duration);
  });
};

var resetQueue = function() {
  Em.run(function() {
    component.get('queue').clear();
  });
};

moduleForComponent('notify-queue', 'Notify - queue component', {
  needs: ['component:notify-message'],

  setup: function() {
    component = this.subject();
  },

  teardown: function() {
    resetQueue();
  }
});



test('Default options', function() {
  var requirements = ['animationLibrary', 'classPrefix', 'iconClassFormat', 'interval'];
  var options = ['customHideMethod', 'customShowMethod'];

  requirements.forEach(function(property) {
    ok(component.get(property),
      'Notify component should have a default value for ' + property);
  });

  options.forEach(function(property) {
    ok(!component.get('property'),
      'Notify component should not have value for ' + property);
  });
});



test('classPrefix option', function() {
  var classPrefix = component.get('classPrefix');
  var newClassPrefix = 'squid';

  equal(classPrefix, component.get('className'),
    'className should equal classPrefix');

  ok(this.$().hasClass(classPrefix),
    'Component should have default class');

  /* Change classPrefix */

  Em.run(function() {
    component.set('classPrefix', newClassPrefix);
  });

  equal(component.get('classPrefix'), component.get('className'),
    'className should equal new classPrefix');

  ok(!this.$().hasClass(classPrefix),
    'Component should not have old default class');

  ok(this.$().hasClass(newClassPrefix),
    'Component should have new default class');

  /* Check component class */

  pushMessage(message['type'], message['content']);

  ok(this.$().hasClass(newClassPrefix + '-' + message['type']),
    'Component should have correct type class');

});



test('animationLibrary option', function() {
  var newAnimationLibrary = 'velocity';

  /* Change animationLibrary */

  component.set('animationLibrary', newAnimationLibrary);

  equal(component.get('animationLibrary'), newAnimationLibrary,
    'Should have new animationLibrary value');

  /* Send message */

  pushMessage(message['type'], message['content']);

  ok(this.$().hasClass('velocity-animating'),
    'Velocity should animate notify');

  // TODO - better test for whether notify shows or not

});



test('interval option', function() {
  var newInterval = 1000;

  /* Change animationLibrary */

  component.set('interval', newInterval);

  equal(component.get('interval'), newInterval,
    'Should have new interval value');

  equal(component.get('queue.interval'), newInterval,
    'Queue should have new interval value');

  /* Send message */

  pushMessage(message['type'], message['content']);

  equal(component.get('currentMessage.duration'), newInterval,
    'Pushed message should have new interval value');

});



test('customShowMethod option', function() {
  component.set('itWorked', false);

  component.set('customShowMethod', function(queueComponent) {

    equal(queueComponent.get('dataTest'), 'notify-queue',
      'Component should be passed into customShowMethod');

    component.set('itWorked', true);

  });

  this.append();

  ok(component.get('customShowMethod'), 'Component should have a customShowMethod');

  pushMessage(message['type'], message['content']);

  ok(component.get('itWorked'), 'Component should call customShowMethod');

});



test('customHideMethod option', function() {

  component.set('itWorked', false);

  component.set('customHideMethod', function(queueComponent) {

    equal(queueComponent.get('dataTest'), 'notify-queue', 'Component should be passed into customShowMethod');

    component.set('itWorked', true);
  });

  this.append();

  ok(component.get('customHideMethod'), 'Component should have a customHideMethod');

  pushMessage(message['type'], message['content']);

  ok(component.get('itWorked'), 'Component should call customHideMethod');

});
