Notify [![Build Status](https://travis-ci.org/sir-dunxalot/notify.svg?branch=overhaul)](https://travis-ci.org/sir-dunxalot/notify)
======

Notify (`em-notify`) is a highly customizable, lightweight ember addon for displaying flash messages to users.


## Features

- Messages queue and display one at a time
- Works out-of-the-box in any route, controller, or view
- No framework requirements (Bootstrap, jquery animate, etc)
- Called `this.notify(type, content [, duration])`
- Component made available for static alerts
- Works in application or route-specific templates
- Default and message-specific durations
- Semantic markup

[See what's in the works here](https://github.com/sir-dunxalot/notify).


## Installation

```
npm install --save-dev em-notify
```


## Documentation

Documentation including installation, usage, and customizable options is available [in the wiki](https://github.com/sir-dunxalot/notify/wiki).


## Features in the Works

- Message component to accept block content (ISSUE LINK)
- Message component to accept Handlebars as a string
- Custom components and classes made easily extendible
- Basic CSS made available
- Clear queue method made public
- Non-current-message messages should be in the template but hidden (?)
- Css animation option (?)
- customHideMethod to hideMethod or something like that
- Public events
- Explanation of CSS
- Test for passing component into customShowMethod


## Issues and Development

Please [open an issue]() or submit a PR.

### Tests

```
ember test
```
