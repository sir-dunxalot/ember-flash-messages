import Em from 'ember';
import selectorFor from './selector-for';

export default Em.Test.registerHelper('inspect',
  function(app, name, useJquery) {
    var element = find(selectorFor(name))[0];

    if (useJquery === false) {
      return element;
    } else {
      return $(element);
    }
  }
);
