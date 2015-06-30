import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({

  /* Options */

  action: null,
  content: null,
  duration: null,
  type: null,

  isFlashMessage: true,

  /* Use like an ID to identify each message */

  createdAt: computed(function() {
    return Date.now();
  }),

  timed: computed('duration', function() {
    return this.get('duration') !== 0;
  }),
});
