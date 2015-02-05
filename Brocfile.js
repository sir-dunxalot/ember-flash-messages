/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon({

  flashMessages: {
    layout: true
  }

});

module.exports = app.toTree();
