<!---
layout: intro
title: karma-furnace-preprocessor
-->

# karma-furnace-preprocessor

> A Karma plugin. Convert code from one format to another (like [grunt-furnace](https://github.com/dexteryy/grunt-furnace))

## Installation

The easiest way is to keep `karma-furnace-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-furnace-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-furnace-preprocessor --save-dev
```

## Configuring Karma

```js
// karma.conf.js
module.exports = function(config) {
    config.set({
        preprocessors: {
            'test/tpl/**/*.tpl': ['furnace[tpl>amd]']
        },
        files: [
            { pattern: 'js/**/*.js', included: false },
            { pattern: 'test/**/*.tpl', included: false },
            "test/config.js",
            "test/tests.js"
        ]
```

## Configuring oz.js

```js
// test/config.js
require.config({
    // Karma serves files from '/base'
    baseUrl: 'base/js/vendor/',
    aliases: {
        'test': '../../test/',
        'appname': '../appname/'
    }
});
```

## Using template in tests

```html
// test/tpl/demo.tpl
<div class="{%= className %}">
    {%= content %}
</div>
```

```js
// test/tests.js
require([
    'mo/template'
    'test/tpl/demo',
    'appname/app'
], function(tpl, tpl_demo, app){

    describe('demo', function(){
        before(function(){
            $(tpl.convertTpl(tpl_demo.template, {
                className: 'appname',
                content: '...'
            })).appendTo('body');
        })
        // it(...)
    });

});
```

## Source code

* [View on Github](https://github.com/dexteryy/karma-furnace-preprocessor)

## More References

* [Karma homepage](http://karma-runner.github.io/)
* [grunt-furnace](https://github.com/dexteryy/grunt-furnace)

## Release History

See [OzJS Release History](http://ozjs.org/#release)

## License

Copyright (c) 2010 - 2013 dexteryy  
Licensed under the MIT license.


