import Em from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { inspect } from '../helpers/inspect';
import { resetQueue } from '../helpers/reset-queue';

var message = {
  content: 'congratulations',
  duration: 3000, // Default
  type: 'success'
};

/*
Options to test:
- interval
- classPrefix
- animationLibrary
- customShowMethod
- customHideMethod
*/

var component;

moduleForComponent('notify-queue', 'Notify options', {
  needs: ['component:notify-message'],

  setup: function() {
    component = this.subject();
  }
});

test('Notify default options', function() {
  var options = ['animationLibrary', 'classPrefix', 'interval'];

  options.forEach(function(property) {
    ok(component.get(property),
      'Notify component should have a default value for ' + property);
  });
});

test('Notify classPrefix option', function() {
  var component = this.subject();
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

  Em.run(this, function() {
    component.get('queue').pushMessage(message['type'], message['content']);
  });

  ok(this.$().hasClass(newClassPrefix + '-' + message['type']),
    'Component should have correct type class');

  resetQueue(component);

});

test('Notify animationLibrary option', function() {
  var newAnimationLibrary = 'velocity';
  var component = this.subject();

  /* Change animationLibrary */

  Em.run(this, function() {
    component.set('animationLibrary', newAnimationLibrary);
  });

  var element = this.append();

  equal(component.get('animationLibrary'), newAnimationLibrary,
    'Should have new animationLibrary value');

  /* Send message */

  Em.run(function() {
    component.get('queue').pushMessage(message['type'], message['content']);
  });

  ok(element.hasClass('velocity-animating'),
      'Velocity should animate notify');

  resetQueue(component);
});


test('Notify interval option', function() {
  var newInterval = 1000;
  var component = this.subject();
  var element = this.append();

  /* Change animationLibrary */

  Em.run(function() {
    component.set('interval', newInterval);
  });

  equal(component.get('interval'), newInterval,
    'Should have new interval value');

  equal(component.get('queue.interval'), newInterval,
    'Queue should have new interval value');

  /* Send message */

  Em.run(function() {
    component.get('queue').pushMessage(message['type'], message['content']);
  });

  equal(component.get('currentMessage.duration'), newInterval,
    'Pushed message should have new interval value');

  resetQueue(component);
});
