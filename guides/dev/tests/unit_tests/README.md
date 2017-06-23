# Unit tests
Basic informations about test Enviroment are available [here](https://github.com/ckeditor/ckeditor-docs/tree/master/guides/dev/tests).

## creating own unit test
To create unit test we need to make `js` file. Let's create `example_test.js` in directory `tests/plugins/example_test`. Our unit test also can have `html` file with the same name.

we cane divide our file for sections:

* comments with configuration and tags
  * `/* bender-tags: editor,unit */` - tags used in our bender testing tool
  * `/* bender-ckeditor-plugins: toolbabr,table */` - plugins imported to ckeditor in this unit test
  * `/* global widgetTestsTools, image2TestsTools */` - information for linter
* our test scope
  * `bender.editor = {};` - we can insert editor with our config.
  * `bender.test();` - our testing function as a parameter we are giving object with test functions
  ```
  {
     'test 1': function() {},
     'test 2': function() {},
     'test 3': function() {},
   }
   ``` 
   in every test function we have access to two varibles:
     * `this.editor` - CKEditor instance like `CKEDITOR.instances.editor`. You can find more about avialable functions [here](http://docs.ckeditor.com/#!/api/CKEDITOR.editor)
     * `this.editorBot` - our testing bot with useful functions, you can find more in [source code](https://github.com/ckeditor/ckeditor-dev/blob/master/tests/_benderjs/ckeditor/static/bot.js)
   * every test function should finish with some assert:
     * `assert.isTrue()`
     * `assert.isFalse()`
     * `assert.areSame()`
     * `assert.isObject()`
     * `assert.isMaching()`  
   
This is example unit test:

```javascript
/* bender-tags: editor,unit,widget */
/* bender-ckeditor-plugins: image2,toolbar,table,tableselection */
/* global widgetTestsTools, image2TestsTools */

( function() {
	'use strict';

	bender.editor = {
                name: 'editor_name',
                config: {}
            };

    bender.test( {
        'Test Name': function() {
            this.editor.insertHtml('<p>Sample Text</p>');
            this.editorBot.editor.focus();
             assert.areSame('<p>Sample Text', this.editor.getData(), 'Content in the editor is different' );     
        },
    } );
} )();
```

## FAQ

### 1. How to make assert for async function?
You have to use `wait();` function in your test. ex:
```javascript
this.editor.on('afterPaste', function( evt ) {
  evt.removeListener();
  resume(function() {
    assert.isFalse(false);
  });
});
wait();
```