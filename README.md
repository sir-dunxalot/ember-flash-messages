Ember Flash Messages [![Build Status](https://travis-ci.org/sir-dunxalot/ember-flash-messages.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-flash-messages) [![Dependencies Status](https://david-dm.org/sir-dunxalot/ember-flash-messages.png)](https://www.npmjs.com/package/ember-flash-messages)
======

Ember Flash Messages (`ember-flash-messages`) adds API-like functionality to your Ember CLI app for rendering and managing flash messages. The primary purpose of this addon is to manage functionality in your JS whilst getting out of the way for styling and templating, allowing you to match your styleguide and mockups precisely. However, basic stylesheets and animations are included and may be optionally imported.


## Features

- Three easy ways to show messages:
  - Time messages and show them one at a time
  - Show messages at the same time for an indefinite amount of time
  - Add a static component to a template
- Use Handlebars in your static flash messages' content
- Let the user close the message regardless of the remaining duration
- Add an action the will be run whenever the user clicks or closes a message
- Use out-of-the-box in any route, controller, or view
- Use in your application or route-specific templates
- Specify default options and message-specific overrides
- Semantic markup

[See what's in the works here](#features-in-the-works).


## Installation

```
ember install:addon ember-flash-messages
```


## Documentation

Documentation including installation, usage, and customizable options is available [in the wiki](https://github.com/sir-dunxalot/ember-flash-messages/wiki).


## Features in the Works

- Demo
- Message component content property will accept Handlebars
- Basic CSS made importable in Brocfile
- Improved semanticism in the templates


## Issues

If you have any issues or feature requests/ideas, please [open an issue](https://github.com/sir-dunxalot/ember-flash-messages/issues/new) or submit a PR.


## Development

```shell
git clone https://github.com/sir-dunxalot/ember-flash-messages.git
cd ember-flash-messages
npm install
bower install
ember s
```

The test suite can be ran as follows:

```shell
ember test
```

### Working on wiki documentation:

You can edit the documentation directly - it's a wiki!

Alternatively, if you want to work on the documentation locally you can clone the repo as above then run:

```shell
cd docs
git submodule update --init --recursive # Updates submodule
```

You can open a PR to the documentation, as usual. Please note it is technically a seperate git repo.
