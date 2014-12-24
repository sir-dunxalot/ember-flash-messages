Ember Flash Messages [![Build Status](https://travis-ci.org/sir-dunxalot/ember-flash-messages.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-flash-messages)
======

Ember Flash Messages (`ember-flash-messages`) is a customizable, lightweight Ember.js addon for displaying flash messages to users.


## Features

- Messages queue and display one at a time
- Works out-of-the-box in any route, controller, or view
- No library requirements (Bootstrap, jquery animate, etc)
- Just call `this.flashMessage(type, content [, duration])`
- Message component made available for static alerts
- Works in application or route-specific templates
- Default and message-specific durations
- Semantic markup

[See what's in the works here](#features-in-the-works).


## Installation

```
npm install --save-dev ember-flash-messages
```


## Documentation

Documentation including installation, usage, and customizable options is available [in the wiki](https://github.com/sir-dunxalot/ember-flash-messages/wiki).


## Features in the Works

- Message component will accept block content
- Message component content property will accept Handlebars
- Docs on 'how to extend and override classes and templates'
- Basic CSS made available
- The `clear()` method on the queue will be made public
- You will be able to push static messages to the message queue that will require being 'closed' by the user
- You will be able to specify 'css' as an animation option
- Assertions to check that `type` and `content` are always passed to the `{{flash-message}}` component
- The `iconClassFormat` property will be made public
- Increased test coverage for:
  - `{{flash-message}}` component
  - Testing `animationLibrary` property

We might implement:

- Non-current-message messages will be in the template but hidden for semanticism
- Public events like `didShowMessage` and `didChangeMessage`
- Mixins and variables made available for advanced styling customization


## Issues

If you have any issues or feature requests/ideas, please [open an issue](https://github.com/sir-dunxalot/ember-flash-messages/issues/new) or submit a PR.


## Development

```
git clone https://github.com/sir-dunxalot/ember-flash-messages.git
npm install
bower install
ember s
```

The test suite can be ran as follows:

```
ember test
```
