import Em from 'ember';

export default Em.Object.extend({
  content: null,
  duration: null,
  type: null,

  timed: function() {
    return this.get('duration') !== 0;
  }.property('duration'),
});
