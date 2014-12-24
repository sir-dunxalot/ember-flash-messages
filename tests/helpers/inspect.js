import Em from 'ember';

export function inspect(app, name, useJquery) {
  var element;

  if (!name || typeof name === 'boolean') {
    useJquery = name;
    name = app;
  }

  element = find('[data-test="flash-' + name + '"]')[0];

  if (useJquery === false) {
    return element;
  } else {
    return $(element);
  }
}

export default Em.Test.registerHelper('inspect', inspect);
