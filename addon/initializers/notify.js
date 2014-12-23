import Em from 'ember';
import Queue from 'em-notify/queue';

export default {
  name: 'notify',

  initialize: function(container, app) {
    var notify = function(type, content, duration) {
      Queue.pushMessage(type, content, duration);
    };

    app.register('notify:main', notify, { instantiate: false });

    ['route', 'controller', 'view'].forEach(function(place) {
      app.inject(place, 'notify', 'notify:main');
    });
  }
};
