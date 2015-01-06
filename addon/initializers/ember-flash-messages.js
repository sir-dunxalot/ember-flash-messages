import Em from 'ember';
import Queue from '../queue';

export default {
  name: 'ember-flash-messages',

  initialize: function(container, app) {
    var flashMessage = function(message) {
      if (typeof message === 'string') {
        message = {
          type: arguments[0],
          content: arguments[1]
        };
      }

      Queue.pushMessage(message);
    };

    app.register('flashMessage:main', flashMessage, { instantiate: false });

    ['route', 'controller', 'view'].forEach(function(place) {
      app.inject(place, 'flashMessage', 'flashMessage:main');
    });
  }
};
