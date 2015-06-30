import Ember from 'ember';

export function checkHtmlbars(/* params, hash*/) {
  return 'HTMLBars works!';
}

export default Ember.HTMLBars.makeBoundHelper(checkHtmlbars);
