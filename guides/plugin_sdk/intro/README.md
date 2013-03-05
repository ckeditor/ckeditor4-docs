# Introduction

The aim of this SDK is to demonstrate how to create a most basic CKEditor plugin.

## What is a Plugin?

Plugins are the most important building blocks of CKEditor. They bring all the feature you see in it, including user interface rendering, text manipulation, data input and output, etc. They're build over the a base which is called the **CKEditor Core**, represented the [CKEditor Core API](#!/api).

A huge variety of plugins is made available by the CKEditor developers community. The [CKEditor Add-on Repository](http://ckeditor.com/addons/plugins) is the starting point to find and share them.

## Developing a Custom Plugin

Learn by coding. We are going to develop a **timestamp** plugin that inserts current date and time into the caret position inside CKEditor. The timestamp will be added after the user clicks a dedicated toolbar button.

Since the implementation makes use of the CKEDITOR.editor#insertHtml function, this
example can be easily adjusted to insert any other HTML element.

The plugin will be code-named `timestamp` and according to CKEditor naming conventions,
this name will also be given to the plugin folder.

## Plugin Files

Firstly, we will need to create the `timestamp` folder inside the `plugins` directory
of the CKEditor installation.

<p class="tip">
	Remember that for CKEditor the name of the plugin folder is important and has to
	be the same as the name of the plugin, otherwise the editor will not be able
	to recognize it.
</p>

Inside the newly created `timestamp` folder we are going to place the `plugin.js` file
that will contain the plugin logic. Apart from that, since we will also need a
toolbar icon for our plugin, we are going to add `icons` folder and subsequently
place the `timestamp.png` file inside.

To sum up, we will need the following file structure for our plugin to work:

* `ckeditor root/`
	* `plugins/`
		* `timestamp/`
			* `icons/`
				* `timestamp.png`
			* `plugin.js`

## Plugin Source Code

With the following structure ready, it is time to open the `plugin.js` file in a
text editor and to start creating the source code of the plugin.

	CKEDITOR.plugins.add( 'timestamp', {
		icons: 'timestamp',
		init: function( editor ) {
			//Plugin logic goes here.
		}
	});

All CKEditor plugins are created by using the CKEDITOR.plugins#add function. This
function should contain the plugin name - `'timestamp'` - and the plugin logic placed
inside the {@link CKEDITOR.pluginDefinition#init init} function that is called
upon the initialization of the editor instance.

Additionally, as we're going to define a toolbar button, the `icons` property is set, including the name of the icon file (important: matching the **button name**, lowercased).

## Creating an Editor Command

It is customary for CKEditor plugins to define an editor command that performs an
action associated with them. The command should be defined inside the `init` function
in order to be created upon the initialization of a CKEditor instance.

In this case we are going to use the CKEDITOR.editor#addCommand
function to define an `insertTimestamp` command that will insert the current date and time into CKEditor:

	editor.addCommand( 'insertTimestamp', {
		exec: function( editor ) {
			var now = new Date();
			editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
		}
	});

The {@link CKEDITOR.commandDefinition#exec exec} method defines a function that
will be fired when the `insertTimestamp` command is executed.

The most important part is to insert the HTML code into the document. To do this,
we will use the {@link CKEDITOR.editor#method-insertHtml insertHtml} function. This function
can be used to insert arbitrary HTML code into the document, so with a bit of tweaking
you can customize the timestamp plugin code to add other HTML elements into the
CKEditor editing area.


## Creating the Toolbar Button

The simplified timestamp plugin should work through a toolbar button. To this end,
inside the `init` function we need to define a button that will be associated with
the `insertTimestamp` command:

	editor.ui.addButton( 'Timestamp', {
		label: 'Insert Timestamp',
		command: 'insertTimestamp',
		toolbar: 'insert'
	});

The above {@link CKEDITOR.ui#addButton} function call created a button name `'Timestamp'` with the following properties;

 * `label`: the textual part of the button (if visible) and its tooltip.
 * `command`: the command to be executed once the button is activated. This is the command we created in the previews step.
 * `toolbar`: the [toolbar group](#!/guide/dev_toolbar-section-1) into which position the button.


## Plugin Loading

It is now time to tell CKEditor to load our plugin. To do so we have to add its name to the
{@link CKEDITOR.config#extraPlugins extraPlugins} configuration option:

	config.extraPlugins = 'timestamp';

Now load a CKEditor sample page. You should be able to see the new plugin toolbar button in the toolbar. For example:

{@img pluginLoaded.png Tooltip plugin has been loaded}

## Full Source Code

The full contents of the `plugin.js` file look as follows:

	CKEDITOR.plugins.add( 'timestamp', {
		icons: 'timestamp',
		init: function( editor ) {
			editor.addCommand( 'insertTimestamp', {
				exec: function( editor ) {
					var now = new Date();
					editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
				}
			});
			editor.ui.addButton( 'Timestamp', {
				label: 'Insert Timestamp',
				command: 'insertTimestamp',
				toolbar: 'insert'
			});
		}
	});

<p class="tip">
	You can also <a href="guides/plugin_sdk_intro/timestamp.zip">download the
	whole plugin folder</a> including the icon and the fully commented source code.
</p>

## Working Example

The plugin code is now ready. When you click the **Insert Timestamp** toolbar button,
current date and time will be inserted into the document.

Note that the format
of the timestamp may vary for different platforms and browsers. If you want to
have more control over the display of the date and time, use the
[Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) object's
properties and methods.

{@img workingExample.png Date and time added to the document in CKEditor}

Congratulations! You have just created a valid CKEditor plugin in under 20 lines
of code! Since the `insertHtml` function can be used to add arbitrary HTML code to
the document, you can replace the timestamp logic with your own customized code in
order to insert other types of content into your document.