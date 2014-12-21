Notify
======

A small Ember CLI notification library to show flash messages (success, warning, error, etc) to the user. Built off the idea of [cheapRoc/ember-flash](https://github.com/cheapRoc/ember-flash).

Installation
------

```
npm install em-notify --save-dev
```

Usage
------

Add the notify view to your template(s):

```hbs
{{notify}}
```

Messages persist through route transitions so you can place `{{notify}}` in your application template or route-specific templates.

To show a message from any route, controller, or view call the following method:

```js
// this.notify(<type>, <message>, [<duration>])
this.notify('warning','Oh no, you cannot do this!');
```

The type can be anything you like and is transformed to a prefixed class (e.g. .notify-warning or .notify-success). The message is the text displayed to the user.

The following html will be rendered and shown for three seconds, wherever you placed the notify helper:

```html
<dl class="notify-warning">
  <dt class="hidden">Warning</dt><!-- Hidden-->
  <dd>Oh no, you cannot do this!</dd>
</dl>
```

If you include icon classes, like in [notify.js](https://github.com/sir-dunxalot/notify/blob/master/notify.js#L112), the html output will look like this:

```html
<dl class="notify-warning">
  <dt>
    <i class="icon-warning"></i>
    <span class="hidden">Warning</span><!-- Hidden-->
  </dt>
  <dd>Oh no, you cannot do this!</dd>
</dl>
```

Options
------

**Message Interval**

By default, all messages will be shown for 3000ms. You can override the default for all messages by specifying an interval, in milliseconds, on the Handlebars helper. For example:

```
{{notify interval=1000}} // 1000ms
```

Each message will be shown, in turn, to the user for the time specified for each message - only one message is shown at a time.

You can override the default for specifi routes if `{{notify}}` is placed in your route's templates (not your application template). For example

If your index template is `{{notify}}` and your about template is `{{notify interval=500}}` and you show a notification on both routes, when the user starts on the index route and immediately transitions to the about route they will see the index notification for 3000ms (the default) and the about notification will be shown afterwards for only 500ms.

`{{em-notify}}` in the application template will follow whatever options you specify in the route's template. Thus, if, in the above example, you placed `{{em-notify}}` in your application template aswell, the behaviour you will not change - you will just see two notification messages instead of one.

**Individual Message Duration**

You can make specific message notifications show for any amount of milliseconds by specifying a third argument in the notify method. For example:

```
this.notify('info', 'This will not show for very long', 500); // Show for 500ms only
this.notify('warning', 'This will show for a while!', 10000); // Show for 10 seconds
```

This will automatically override any default value you have specified.

**Class prefix**

By default, the notify template will have the class `.notify`, or a modification based on the type of message being shown (e.g. `.notify-info` or `.notify-whoops`). You can change this by specifying the `classPrefix` option on the handlebars helper, as follows:

```
{{notify classPrefix='alert'}}
```

Now, all classes will be prefixed by `alert` instead of `notify`. Thus, your classes will look like `.alert-info` or `alert-whoops`.

Questions and Issues
------

Please open an issue or submit a PR.
