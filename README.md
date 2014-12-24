Notify [![Build Status](https://travis-ci.org/sir-dunxalot/notify.svg?branch=overhaul)](https://travis-ci.org/sir-dunxalot/notify)
======

Notify (`em-notify`) is a highly customizable, lightweight ember addon for displaying flash messages to users.

Contents
------

- Features
- Installation
- Usage
- Options
- In the Works
- Issues


Features
------

- Messages queue and display one at a time
- Works out-of-the-box in any route, controller, or view
- No framework requirements (Bootstrap, jquery animate, etc)
- Called `this.notify(type, content [, duration])`
- Component made available for static alerts
- Works in application or route-specific templates
- Default and message-specific durations
- Semantic markup

[See what's in the works here](https://github.com/sir-dunxalot/notify).

Installation
------

```
npm install --save-dev em-notify
```

Usage
------

Simply add the notify component to your application template:

```
// templates/application.hbs
{{notify-queue}}
```

You can also add the queue to any route template(s):

```
// templates/example-route.hbs
{{notify}}
```

Then send your message to the notify queue from any route, controller, or view:

```
// controllers/example-form.js
import Em from 'ember';

export default Em.ObjectController.extend({

  formSubmitted: function() {
    this.notify('success', 'Congratulations! Your changes have been saved');
  }

});
```

Done!

By default the message will be shown for 3000ms. You can change the duration the message is shown by passing a third, optional parameter:

```
// controllers/example-form.js
import Em from 'ember';

export default Em.ObjectController.extend({

  formSubmitted: function() {
    this.notify('success', 'Congratulations! Your changes have been saved', 1000);
  }

});
```

For information on how to change the default message duration, please see the [Notify options](TODO).


### Individual messages

Static messages can be added to your templates using a provided component:

```hbs
{{notify-message type='success' content='Congratulations! It worked'}}
```

Message not displayed via the `notify()` method will *not* be timed. The `{{notify-message}}` component will display until you remove it manually. You could use an if statement. For example:

```
{{#if loginError}}
  {{notify-message type='error' content=loginError}}
{{/if}}
```

Options
------

Currently there are five customizable options, which can all be set on the queue component. You can see the options with their default values below:

```hbs
{{#notify-queue
  animationLibrary='jQuery'
  classPrefix='notify'
  interval=3000
  customHideMethod=null // overrides animationLibrary
  customShowMethod=null // overrides animationLibrary
}}
```

- [animationLibrary]()
- [classPrefix]()
- [interval]()
- [customHideMethod]()
- [customShowMethod]()


### `animationLibrary`

The name of the library you would like to use to animate hiding and showing of messages.

```
{{notify-queue animationLibrary='jQuery'}}
```

Currently supported values are `jQuery`, `velocity`, and `none`.

- If you use `jQuery` you need not do anything.
- If you use `velocity` you will need to include the Velocity.js library in your application. Install it with `bower install --save velocity` and include the main velocity file via your `Brocfile.js`.
- If you use `none` the messages will simply hide and show with no animation

Please note if you set a `customHideMethod` or `customShowMethod` then the value of `animationLibrary` will not take effect.

Property | Value
---------|--------
name     | animationLibrary
type     | String
default  | 'jQuery'


### `classPrefix`

The text to prefix all element classes with. The default value, `notify` result in markup with classes like `.notify`, `.notify-success`, `.notify_message`, `.notify_content`, etc.

```
{{notify-queue classPrefix='notify'}}
```

For example, if you set `classPrefix='alert'`, the element classes will look like `.alert`, `.alert-success`, etc.

For more information on the classes available for styling, please see here.

Property | Value
---------|--------
name     | classPrefix
type     | String
default  | 'notify'


### `interval`

The default length to show each message for.

```
{{notify-queue interval=3000}}
```

This value will be overridden for individual messages if you pass a `duration` option with the call to `this.notify()`. For example:

```
// In the view
this.notify('success', 'Well done!', 5000);
```

```
// The application template
{{notify-queue interval=200}}
```

... In this example the message will show for 5000ms. The individual message always takes precedence over the default properties set on `{{{notify-queue}}`.

Property | Value
---------|--------
name     | interval
type     | Number
default  | 3000


### `customHideMethod`

A method called when a message is supposed to be hidden. This method will be called instead of one of the built in animation methods.

```
// views/example.js
import Em from 'ember';

export default Em.View.extend({
  hideMessage: function(notifyQueueComponent) {
    // Do something. For example:
    notifyQueueComponent.$().fadeIn('fast');
  }
});
```

```
{{notify-queue customHideMethod=view.hideMessage}}
```

Property | Value
---------|--------
name     | customHideMethod
type     | Function
default  | null


### `customShowMethod`

A method called when a message is supposed to be shown. This method will be called instead of one of the built in animation methods.

```
// views/example.js
import Em from 'ember';

export default Em.View.extend({
  showMessage: function(notifyQueueComponent) {
    // Do something. For example:
    notifyQueueComponent.$().fadeIn('fast');
  }
});
```

```
{{notify-queue customShowMethod=view.showMessage}}
```

Property | Value
---------|--------
name     | customShowMethod
type     | Function
default  | null


In the Works
------

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

Issues and Development
------

Please [open an issue]() or submit a PR.

### Tests

```
ember test
```
