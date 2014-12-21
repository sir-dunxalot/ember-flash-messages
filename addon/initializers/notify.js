import Em from 'ember';
import Queue from 'ember-cli-notify/queue';

export default {
  name: 'notify',

  initialize: function(container, app) {
    var notify = function(type, message, duration) {
      Queue.pushMessage(type, message, duration);
    };

    app.register('notify:main', notify, { instantiate: false });

    ['route', 'controller', 'view'].forEach(function(place) {
      app.inject(place, 'notify', 'notify:main');
    });
  }
};
