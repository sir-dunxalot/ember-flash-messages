import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';

var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

var controller, queue;

moduleFor('controller:index', 'Flash messages - Queue', {

  setup: function() {
    controller = this.subject();
    queue = controller.get('queue');
  },

  teardown: function() {
    // Em.run(function() {
    //   component.clear();
    // });
  }
});

test('Queue management', function() {

  console.log(Em.typeOf(queue));

});
