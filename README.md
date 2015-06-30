Ember Flash Messages [![Build Status](https://travis-ci.org/sir-dunxalot/ember-flash-messages.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-flash-messages)
======

Ember Flash Messages (`ember-flash-messages`) adds API-like functionality to your Ember CLI app for rendering and managing flash messages.

The primary goal of this addon is to manage functionality in your JS whilst getting out of the way for styling and templating, allowing you to match your styleguide and mockups precisely.

Stylesheets for a basic flash message layout may be optionally imported.

## Contents

- [Examples](#examples)
- [Installation](#installation)
- [Documentation](#documentation)

## Examples

Simple JS usage in any route, component, controller, or view:

```js
// app/controller/index.js

export default Ember.Controller.extend({

  afterSomeEvent: function() {
    this.flashMessage('success', 'Content saved!');
  },

});
```

Firing an action when the message is clicked:

```js
// app/controller/index.js

export default Ember.Component.extend({

  actions: {
    undo(message) {
      console.log(message);
    }
  }

  afterSomeEvent: function() {
    this.flashMessage({
      type: 'warning',
      action: 'undo', // Run when message is
      content: '<strong>Click here</strong> to cancel', // Pass HTML
      duration: 5000, // Milliseconds to show the message for
    });
  },

});
```

Adding as a standalone component in a template:

```hbs
{{#flash-message type='some-event'}}
  Welcome to your new account!. {{#link-to 'tutorial'}}Click here to repeat the tutorial{{/link-to}}.
{{/flash-message}}
```

Showing a message in perpetuity:

```js
// app/controller/index.js

export default Ember.Route.extend({

  afterSomeEvent: function() {
    this.flashMessage({
      type: 'success',
      content: 'This will show forever!',
      duration: 0, // Pass zero duration
    });
  },

});
```

## Installation

**Users of older version of Ember (e.g. 1.10) should use release `v0.5.2`.**

```
ember install ember-flash-messages
```

Now add the flash message queue to your template. Usually this is the application template.

```
{{flash-message-queue}}
```

## Documentation

Documentation including installation, usage, and customizable options is available [in the wiki](https://github.com/sir-dunxalot/ember-flash-messages/wiki).

## Issues

If you have any issues or feature requests, please [open an issue](https://github.com/sir-dunxalot/ember-flash-messages/issues/new) or submit a PR.

## Development

```sh
git clone https://github.com/sir-dunxalot/ember-flash-messages.git
cd ember-flash-messages
ember install
ember s
```

Tests can be run with `ember test` or by navigating to the `/tests` route.

### Working on wiki documentation:

You can edit the documentation directly on Github - it's a wiki!
