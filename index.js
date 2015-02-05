/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-flash-messages',

  included: function(app) {
    var options = app.options.flashMessages;

    if (options) {

      if (options.layout) {

        /* Prepend so the stylesheet is easily overwritten */

        app.import('vendor/styles/layout.css', {
          prepend: true,
        });
      }
    }
  }
};
