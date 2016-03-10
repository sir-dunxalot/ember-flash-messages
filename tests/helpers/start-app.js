/* exported

checkCurrentMessage,
checkMessageDom,
flashMessage,
inspect,
andThenAfterRender,
asyncClick,
*/

import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

/* Custom helpers */

import checkCurrentMessage from './sync/check-current-message';
import checkMessageDom from './sync/check-message-dom';
import inspect from './sync/inspect';

import andThenAfterRender from './async/and-then-after-render';
import asyncClick from './async/async-click';
import flashMessage from './async/flash-message';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
