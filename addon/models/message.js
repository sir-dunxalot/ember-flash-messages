import Ember from 'ember';

export default Ember.Object.extend({
  content: null,
  duration: null,
  type: null,

  /* Use like an ID to identify each message */

  createdAt: Ember.computed(function() {
    return Date.now();
  }),

  timed: Ember.computed('duration', function() {
    return this.get('duration') !== 0;
  }),
});
