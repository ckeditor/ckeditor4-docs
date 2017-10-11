<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor Testing Environment (Bender.js)

An advanced project like CKEditor could not exist without a set of automated tests. CKEditor uses [Bender.js](https://github.com/benderjs/benderjs), our in-house JavaScript Test Framework, to cover code with tests. Not every feature can be tested automatically, but for those that can, we always implement tests. We encourage you to do the same when you create a pull request on [GitHub](https://github.com/ckeditor/ckeditor-dev) or fork the CKEditor repository in order to customize some editor behavior.

## Setting up Bender.js

To run CKEditor tests you will need [Bender.js](https://github.com/benderjs/benderjs). Before you start installing Bender.js make sure that:

* you installed [Git](http://git-scm.com/),
* you installed the latest version of [Node.js](http://nodejs.org/),
* you have administrative rights &mdash; needed to install Bender.js globally.

First, you need to install globally the [Bender.js command line interface](https://github.com/benderjs/benderjs-cli). To do so, open the console and use `npm install`:

	> npm install -g benderjs-cli

**Note:** You may need administrative rights to do this (e.g. `sudo`).

Now you can check whether Bender.js has installed properly. If you run Bender.js in the console:

	> bender

you should see the following message:

	Local Bender.js installation not found.

## Setting up CKEditor Tests

When Bender.js is installed you need to set up the CKEditor tests project.

First of all, you need to [clone the CKEditor development](#!/guide/dev_source) repository hosted at [GitHub](https://github.com/ckeditor/ckeditor-dev):

	> git clone https://github.com/ckeditor/ckeditor-dev.git

Go to the main CKEditor directory (it should contain the `bender.js`, `package.json` files, among others, and the `tests/` directory):

	> cd ckeditor-dev

You will now need to install the Bender.js engine (`benderjs-cli` installed globally uses a local `benderjs` module) and all required modules, like the [Sinon.JS plugin for Bender.js](https://github.com/benderjs/benderjs-sinon). To do so use:

	> npm install

Then you need to initialize the Bender project:

	> bender init

This command will create the `.bender/` directory which contains Bender.js's cache, databases, and a local configuration file.

You do not need to perform any additional configuration steps as `bender.js` is a configuration file. It contains information about which tests should be run and where they are located.

## Running CKEditor Tests

In order to run the tests, open the console and type:

	> bender server run

This will start the server in the verbose mode.

<p class="tip">
	If you want to run tests from other hosts, like virtual machines, you may need to use the <code>-H 0.0.0.0</code> option.
</p>

Now open a web browser. Bender.js dashboard is available under:

	http://localhost:1030

**Note:** You can also run the server as a daemon:

	> bender server start

At the moment, starting a daemon is supported **on Unix systems only**.

If you want, you can specify a port or a hostname where Bender.js runs:

	-p, --port		The port on which the server will run (default: 1030).
	-H, --hostname	The hostname used to run the server (default: localhost).

<p class="tip">
	Some tests require the browser to be in focus. This means that you can not use other applications when running them.
</p>

Please note that at the moment some random tests may fail in Internet Explorer. This is a known issue; however, if you run them again (when opened directly), they should pass. If a test fails a few times in a row, it is a sign that something went wrong. [Report a CKEditor issue](#!/guide/dev_issues_readme) on our [GitHub issues page](https://github.com/ckeditor/ckeditor-dev/issues) in such case. Remember to include a link to the failing test and information about the browser in which it fails.

## CKEditor Tests Structure

In the Bender.js dashboard you can run all (or part) of the tests located in the CKEditor `tests/` directory. These tests are organized into subdirectories based on what they are testing:

	tests/
		adapters/
			(design tests for editor adapters, located in the adapters/ folder)
			jquery/
		core/
			(design tests for editor core features, located in the core/ folder)
			dom/
			htmlparser/
			...
		plugins/
			(design tests for editor plugins, located in the plugins/ folder)
			about/
			button/
			...
		tickets/
			(functional tests for specific tickets (http://dev.ckeditor.com/report) which are not
				related to any specific features or are related to multiple features and plugins)
			10146/
			10212/
			...

<p class="tip">
	As long as a test is related to a particular feature or a plugin, it should be put into the <code>adapters/</code>, <code>core/</code>, or <code>plugins/</code> directory. Ticket tests are most difficult to manage so the <code>tickets/</code> directory should only contain the tests that do not match any of these primary locations.
</p>

Apart from the directories mentioned above, the main `tests/` directory or any subdirectory may contain three special folders:

* `_assets/` &ndash; Contains all assets used by the tests and the files that the tests need, like images, external libraries (like MathJax, jQuery.form), dialogs, mocks.
* `_helpers/` &ndash; Contains all functions used to test, tools for testing, test generators.
* `_docs/` &ndash; Contains notes about how tests work. It is rarely used as more often test documentation is located in the same file and inserted as a code comment.

Every file which is not placed in any of these special directories is considered a test file.

## Creating Your Own Test

To create a new CKEditor test, you need to put a JavaScript file into any of the CKEditor `tests/` subdirectories (`adapters/`, `core/`, `plugins/` or `tickets/`). Such file will be automatically added to the list of tests.

To improve test filtering, a test file may start with a list of tags, marked by using the `bender-tags` meta comment. Additionally, every folder in the test's path is automatically added as a filter, so for example if you created a test for the jQuery adapter and placed it in the `tests/adapters/jquery` directory, you do not need to add `adapters` and `jquery` to the tags list.

### Test Requirements

In every test you can specify the list of plugins which will be loaded by using the `bender-ckeditor-plugins` meta comment. Remember that loading redundant plugins will increase the time consumed by the test.

Please note that some CKEditor plugins are needed for reasons that might not be immediately obvious, for example:

* [IFrame Editing Area](https://ckeditor.com/cke4/addon/wysiwygarea) (`wysiwygarea`) &ndash; Skipping this plugin will prevent the editor from firing the [instanceReady](#!/api/CKEDITOR.editor-event-instanceReady) event and many others. However, this plugin is loaded automatically when using the Editor Bot.
* [Editor Toolbar](https://ckeditor.com/cke4/addon/toolbar) (`toolbar`) &ndash; Needed for enabling features that rely on [Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf).
* [Undo](https://ckeditor.com/cke4/addon/undo) (`undo`) &ndash; Needed to fire the [change](#!/api/CKEDITOR.editor-event-change) event.
* [Basic Styles](https://ckeditor.com/cke4/addon/basicstyles) (`basicstyles`) &ndash; Needed to preserve basic text formatting in your test HTML, otherwise [Advanced Content Filter](#!/guide/dev_advanced_content_filter) will remove all `<strong>`, `<em>`, `<u>` tags and so on.

If the editor behaves differently when testing and during development, try to add all plugins you use during the development (you can find such list in the [`config.js`](https://github.com/ckeditor/ckeditor-dev/blob/master/config.js) file) and then remove redundant ones. Please note that adding all existing CKEditor plugins might not be a good solution since, for example, the [BBCode plugin](https://ckeditor.com/cke4/addon/bbcode) will strip HTML in your output.

### Tagging Tests

Each test should be properly tagged, so it is easy to group and filter them. Tags should be added using the `bender-tags` meta comment, like:

    /* bender-tags: editor */
    // Rest of the file...

In case of unit tests the `bender-tags` meta comment should be placed in the `*.js` file and in the `*.md` file for manual tests.

#### Common Tags Used in Tests

* `<number>` (optional) &ndash; A reference to the GitHub issue ID.
* `trac<number>` (optional) &ndash; A reference to the Trac issue ID.
* `<custom>` (`editor` by default), e.g. `word`, `selection` &ndash; A specific area or function of the editor covered by tests.

#### For Manual Tests Only

* `bug/feature` &ndash; A test covers a bug fix or a new feature.
* `<CKEditor version>`, e.g. `4.6.2`, `4.7.0` &ndash; A targeted version of CKEditor by this given patch (usually means an upcoming minor or major release).

There might be a situation where a single `*.js` file contains many tests and referencing a specific issue in `bender-tags` might be misleading. In such cases, the issue should be referenced right before the specific test which covers the issue:

    // (#<number>)
    'test case scenario 1...'

or with an additional comment:

    // Additional comment (#<number>).
    'test case scenario 2...'

If there is a need to reference a Trac issue instead of the GitHub one, full URL should be used:

    // (http://dev.ckeditor.com/ticket/<number>)
    'test some Trac issue scenario 1...'
        
    // Additional comment (http://dev.ckeditor.com/ticket/<number>).
    'test some Trac issue scenario 2...'


### Test Tools

CKEditor tests use the [YUI library](http://yuilibrary.com/) for assertions provided by the [Bender.js YUI plugin](https://github.com/benderjs/benderjs-yui/).

The testing environment provides a bunch of [tools](https://github.com/ckeditor/ckeditor-dev/blob/master/tests/_benderjs/ckeditor/static/tools.js) useful when creating tests and the [Editor Bot](https://github.com/ckeditor/ckeditor-dev/blob/master/tests/_benderjs/ckeditor/static/bot.js) which helps you create and manage an editor instance.

### Sample Test File

A sample CKEditor test file might look like this:

	/* bender-tags: editor */
	/* bender-ckeditor-plugins: toolbar,basicstyles */

	'use strict';

	bender.test( {
		'test initial selection after setData': function() {
			bender.editorBot.create( {
				startupData: '<p>Lorem <b>[ipsum]</b></p>'
			}, function( bot ) {
				// Many selection-related tests may require focusing the editor.
				bot.editor.focus();

				assert.areSame( '<p>^Lorem <strong>[ipsum]</strong></p>',
					bot.htmlWithSelection() );
			} );
		},

		'test some other case': function() {
			// ...
		},

		// ...
	} );

For every test you can create an HTML file with the same name (so for `yourtest.js` you can create `yourtest.html`). Such file will be automatically combined with your JavaScript code by [DOM combiner](https://github.com/benderjs/dom-combiner) to create an output test file. If the HTML file does not exist, the output test file will have an empty `<body>` section.

In the HTML file you can put the content of the `<body>` section, so it may look like this:

	<textarea id="editor">Lorem ipsum</textarea>

If you need, you can add the entire content of the `<html>` page element, for example to set some attributes or add a `<head>` section:

	<head>
		<script src="_helpers/tools.js"></script>
	</head>
	<body>
		<textarea id="editor">Lorem ipsum</textarea>
	</body>

To learn more about writing tests, check the [existing tests code](https://github.com/ckeditor/ckeditor-dev/tree/master/tests).
