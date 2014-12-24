import Em from 'ember';
import Queue from '../queue';

export default {
  name: 'ember-flash-messages',

  initialize: function(container, app) {
    var flashMessage = function(type, content, duration) {
      Queue.pushMessage(type, content, duration);
    };

    app.register('flashMessage:main', flashMessage, { instantiate: false });

    ['route', 'controller', 'view'].forEach(function(place) {
      app.inject(place, 'flashMessage', 'flashMessage:main');
    });
  }
};
