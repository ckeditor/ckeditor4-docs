# Tests environment

To avoid regressions and reduce number of bugs CKEditor use [Bender](https://github.com/benderjs/benderjs) to cover code with tests.

## Set up Bender ##

To run CKEditor tests you will need Bender. Before you start installing Bender make sure that you have:

* installed [Git](http://git-scm.com/),
* installed latest version of [Node.js](http://nodejs.org/),
* administrative rights - needed to install Bender globally.


To install Bender globally open console and use `npm install`:

```
> npm install -g git://github.com/benderjs/benderjs.git
```

**Note:** You may need administrative rights to do it.

Now you can check if Bender is installed. If you run Bender:

```
> bender
```

you should see the following message:

```
command argument is required
```

**Note:** At the moment, Bender is not available as a npm package. If you want to update you need to uninstall it and install again:

```
> npm uninstall -g benderjs
> npm install -g git://github.com/benderjs/benderjs.git
```

## Set up tests ##

When Bender is installed you need to set up CKEditor tests project.

Go to the main CKEditor folder (such folder should contain `bender.js`, `package.json` files and the `tests/` directory):

```
> cd ckeditor-dev
```

Firstly, you need to install required modules, like [CKEditor plugin for Bender](https://github.com/benderjs/benderjs-ckeditor). To install all required modules use:

```
> npm install
```

Then you need to initialize bender project:

```
> bender init
```

This command will create `.bender/` directory which contains Bender's cache, databases and local configuration file.

You do not need any additional configuration. `bender.js` is a configuration file, which contains information which tests should be run and where they are located.

## Running tests ##

In order to run the tests, go to a console and type:

```
> bender server run
```

This will start the server in a verbose mode. Now open a browser. Bender dashboard is available under:

```
localhost:1030
```

**Note:** You can also run the server as a deamon:

```
> bender server start
```

At the moment, starting a deamon is supported **on Unix systems only**.

If you want you can specify port or the hostname where Bender runs:

```
-p, --port       port on which the server will run (default: 1030)
-H, --hostname   host name used to run server (default: 0.0.0.0)
```

**Note:** Some tests requires constantly focused browser - that means that you can not use other applications, etc.

**Note:** Some random tests may fail during IE tests - this is known issue, however if you rerun them they should pass positively. If it fails few times in a row without success, it's a sign that something went wrong. [Report issues](#!/guide/dev_issues_readme) in such case.

## Tests structure

In the Bender dashboard you can run all (or part) of the tests located in the `tests/` folder. These tests are organized in subdirectories based on what each one is testing:

- `tests/`
  - `adapters/` - design tests for editors adapters, located in the `adapters/` folder,
    - `jquery/`
  - `core/` - design tests for editors core features, located in `core/` folder,
    - `dom/`
    - `htmlparser/`
    - ...
  - `plugins/` - design tests for editors pluging, located in `pluging/` folder,
    - `about/`
    - `button/`
    - ...
  - `tickets/` - functional tests for specific [tickets](http://dev.ckeditor.com/report), bugs which are not related with any specific features or are related with multiple features/plugins.
    - `10146/`
    - `10212/`
    - ...

**Note:** As long as test is related to any feature or plugin it should be put in the `adapters/`, `core/` or `plugins/` directory. Ticket tests are most difficult to menage so in the `tickets/` directory should goes only tests which do not make sense in any other location.

Apart from folders mentioned above, main tests directory or any subdirectory may contains three special folders:

- _assets/ - contains all of assets used by tests or files tests needs, like images, external libs (MathJax, jQuery.form), dialogs, mocks,
- _helpers/ - contains all functions used to test, tools for testing, tests generators,
- _docs/ - folder for notes about how tests work, rarely used, more often tests documentation is in the same file, as a code comment.

Every file which is not in any of these special directories is considered as a test.

## Create your own test

To create a new test you need to put a JS file in any of tests directories (`adapters/`, `core/`, `plugins/` or `tickets/`). Such file will be automatically added to the list of tests.

To improve tests filtering, every test file starts with tags, marked using `bender-tags`. Every editors test needs two tags: `editor` and `unit`. Additionally every folder in the tests path is automatically added as a filter, so for example if you created a test for the jQuery adapter and put it in the `tests/adapters/jquery` you do not need to add `adapters` and `jquery` to the tags list.

In every test you can also specify the list of plugins which will be loaded in this test using `bender-ckeditor-plugins`. Remember that loading not needed plugins will increase time consumed by test.

**Note:** Some plugins are needed for not very obvious reason, for example:

- `wysiwygarea` - skipping that plugin will prevent editor from firing `instanceReady` event and many others,
- `toolbar` - needed for executing commands,
- `undo` - needed to fire `change` event,
- `toolbar,basicstyles` - needed to keep basic formating in you test HTML, otherwise [Advanced Content Filter](#!/guide/dev_advanced_content_filter) will remove all `<strong>`, `<em>`, `<u>` and so on.

If editor behave differently in the test and during development try to add all plugins you use during development (you can find such list in the [config](https://github.com/ckeditor/ckeditor-dev/blob/master/config.js) file) and then remove unneeded. Putting all plugins might be not a good solution since i.e. bbcode will strip HTML in output.

CKEditor tests use [YUI library](http://yuilibrary.com/) for assertions provide by [bender YUI plugin](https://github.com/benderjs/benderjs-yui/).

Testing environment provide also bunch of [tools](https://github.com/benderjs/benderjs-ckeditor/blob/master/static/tools.js) useful during creating tests and the [editor bot](https://github.com/benderjs/benderjs-ckeditor/blob/master/static/bot.js) which helps you create and menage editor.

Sample test file might look like this:

```
/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: toolbar,basicstyles */

'use strict';

bender.test( {
  'test sample': function() {
    bender.editorBot.create( {
      startupData: '<p>Lorem <b>[ipsum]</b></p>'
    }, function( bot ) {
      bot.editor.focus(); // IE needs focus

      assert.areSame( '<p>^Lorem <strong>[ipsum]</strong></p>',
        bot.htmlWithSelection() );
    } );
  }
} );
```

For every test, you can create a HTML file with the same name i.e. for `yourtest.js` you can create `yourtest.html`. Such file will be combine with your JS by [DOM combiner](https://github.com/benderjs/dom-combiner) to create output test file. If HTML file does not exists output test file will have an empty `<body>`.

In the HTML file you can put the content of the body so it could looks like this:

```
<textarea id="editor">Lorem ipsum</textarea>
```

If you need you can put the `<body>` element, for example to set some attributes or add `<head>`:

```
<head>
  <script src="_helpers/tools.js"></script>
</head>
<body>
  <textarea id="editor">Lorem ipsum</textarea>
</body>
```

To learn more about writing tests check the exiting tests code.
