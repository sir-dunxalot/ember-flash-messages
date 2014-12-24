import Em from 'ember';
import insert from '../utils/computed/insert';

export default Em.Component.extend({
  attributeBindings: ['dataTest:data-test'],
  classNamesBindings: ['className'],
  classPrefix: 'flash',
  content: null,
  contentClass: insert('classPrefix', '{{value}}-content'),
  dataTest: 'flash-message',
  iconClassFormat: 'icon-{{type}}',
  tagName: 'dl',
  type: null,
  typeClass: insert('classPrefix', '{{value}}-type'),

  className: function() {
    return this.get('classPrefix') + '_message-' + this.get('type');
  }.property('classPrefix', 'type'),

  iconClass: function() {
    this.get('iconClassFormat').replace('{{type}}', this.get('type'));
  }.property('iconClassFormat', 'type'),
});
