import Em from 'ember';

export default Em.Object.extend({
  content: null,
  duration: null,
  type: null,

  /* Use like an ID to identify each message */

  createdAt: function() {
    return Date.now();
  }.property(),

  timed: function() {
    return this.get('duration') !== 0;
  }.property('duration'),
});
