import Em from 'ember';

export function resetQueue(app, component) {
  var target = component ? component : app;

  Em.run(function() {
    target.get('queue').clear();
  });
}

export default Em.Test.registerHelper('resetQueue', resetQueue);
