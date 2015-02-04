import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';
import queue from 'ember-flash-messages/queue';

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

module('Flash messages - Queue', {

  setup: function() {
    // controller = this.subject();
    // queue = controller.get('queue');
  },

  teardown: function() {
    // Em.run(function() {
    //   component.clear();
    // });
  }
});

test('Queue construction', function() {

  contains(queue.get('constructor').toString(), 'Array',
    'Queue should be constructed from an array class');

  // console.log(Em.typeOf(queue));
  // console.log(queue.get('constructor'));

});
