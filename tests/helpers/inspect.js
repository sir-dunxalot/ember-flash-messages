import Em from 'ember';

export default Em.Test.registerHelper('inspect',
  function(app, name, useJquery) {
    var element = find('[data-test="flash-' + name + '"]')[0];

    if (useJquery === false) {
      return element;
    } else {
      return $(element);
    }
  }
);
