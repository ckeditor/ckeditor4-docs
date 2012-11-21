#Plugin basics

The aim of this tutorial is to demonstrate how to create a most basic CKEditor plugin.

We are going to develop a **timestamp** plugin that inserts current date and time into 
the editing area of CKEditor. The timestamp will be added after a user clicks a dedicated 
toolbar button. Since the implementation makes use of the ``insertHtml`` function, this 
example can be easily adjusted to insert any other HTML element.

The plugin will be named ``timestamp`` and according to CKEditor naming conventions, 
this name will also be given to the plugin folder.

##Plugin Files

Firstly, we will need to create the ``timestamp`` folder inside the ``plugins`` directory 
of the CKEditor installation.

<p class="tip">
	Remember that for CKEditor the name of the plugin folder is important and has to
	be the same as the name of the plugin, otherwise the editor will not be able
	to recognize it.
</p>

Inside the newly created ``timestamp`` folder we are going to place the ``plugin.js`` file 
that will contain the plugin logic. Apart from that, since we will also need a 
toolbar icon for our plugin, we are going to add an images folder and subsequently 
place the ``timestamp.png`` file inside.

To sum up, we will need the following file structure for our plugin to work:

* ``ckeditor root``
	* ``plugins``
		* ``timestamp``
			* ``images``
				* ``timestamp.png``
			* ``plugin.js``

##Plugin Source Code

With the following structure ready, it is time to open the ``plugin.js`` file in a 
text editor and to start creating the source code of the plugin.

	CKEDITOR.plugins.add( 'timestamp', {
		init: function( editor ) {
			//Plugin logic goes here.
		}
	});

All CKEditor plugins are created by using the {@link CKEDITOR.plugins#add} function. This 
function should contain the plugin name ``('timestamp')`` and the plugin logic placed 
inside the {@link CKEDITOR.pluginDefinition#init init} function that is called 
upon the initialization of the editor instance.

##Creating an Editor Command

It is customary for CKEditor plugins to define an editor command that performs an 
action associated with them. The command should be defined inside the ``init`` function 
in order to be called upon the initialization of a CKEditor instance.

In this case we are going to use the {@link CKEDITOR.editor#addCommand addCommand} 
function to define an ``insertTimestamp`` command that, as the name suggests, 
will insert the current date and time into a document created in CKEditor.

The {@link CKEDITOR.commandDefinition#exec exec} method defines a function that 
will be fired when the ``insertTimestamp`` command is executed. Current date and 
time will be calculated using the JavaScript 
[Date object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date).

The most important part is to insert the HTML code into the document. To do this, 
we will use the {@link CKEDITOR.editor#method-insertHtml insertHtml} function from 
[CKEditor JavaScript API](#!/api). This function 
can be used to insert arbitrary HTML code into the document, so with a bit of tweaking 
you can customize the timestamp plugin code to add other HTML elements into the 
CKEditor editing area.

	editor.addCommand( 'insertTimestamp', {
		exec: function( editor ) {    
			var timestamp = new Date();
			editor.insertHtml( 'The current date and time is: <em>' + timestamp.toString() + '</em>' );
		}
	});

##Creating a Toolbar Button

The simplified timestamp plugin should work through a toolbar button. To this end, 
inside the ``init`` function we need to define a button that will be associated with 
the ``insertTimestamp`` command. The {@link CKEDITOR.ui#addButton} function accepts a button 
name ``('Timestamp')`` along with the definition of the tooltip text (label) and the 
button icon (``icon``). Note that this.path is the directory where the ``plugin.js`` file 
resides.

These parameters are responsible for the button presentation. To make the button 
actually work, we need to connect it to the plugin command name defined above by 
using the command parameter.

	editor.ui.addButton( 'Timestamp', {
		label: 'Insert Timestamp',
		command: 'insertTimestamp',
		icon: this.path + 'images/timestamp.png'
	});


##CKEditor Initialization

It is now time to initialize a CKEditor instance that will use the Timestamp plugin 
along with its toolbar button.

To register the plugin with CKEditor, we have to add its name to the 
{@link CKEDITOR.config#extraPlugins extraPlugins}
list. We also need to enhance the toolbar definition and add the plugin button name 
by using the {@link CKEDITOR.config#toolbar toolbar} parameter.

Open the page that will contain CKEditor in a text editor and insert a CKEditor 
instance using the following toolbar and plugin configuration.

	<script type="text/javascript">
		// Replace the <textarea id="editor1"> with a CKEditor
		// instance, using default configuration.
		CKEDITOR.replace( 'editor1', {
			extraPlugins: 'timestamp',
			toolbar: [
				[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ],
				[ 'Timestamp' ]
			]
		});
	</script>

After you load the page containing the above CKEditor instance, you should be able 
to see the new plugin toolbar button along with its tooltip.

![Tooltip plugin has been loaded](guides/dev_tutorials_basics/pluginLoaded.png)

## Full Source Code

The full contents of the ``plugin.js`` file look as follows:

	CKEDITOR.plugins.add( 'timestamp', {
		init: function( editor ) {
			editor.addCommand( 'insertTimestamp', {
				exec: function( editor ) {    
					var timestamp = new Date();
					editor.insertHtml( 'The current date and time is: <em>' + timestamp.toString() + '</em>' );
				}
			});
			editor.ui.addButton( 'Timestamp', {
				label: 'Insert Timestamp',
				command: 'insertTimestamp',
				icon: this.path + 'images/timestamp.png'
			});
		}
	});

<p class="tip">
	You can also <a href="guides/dev_tutorials_basics/timestamp.zip">download the 
	whole plugin folder</a> inluding the icon and the fully commented source code.
</p>

## Working Example

The plugin code is now ready. When you click the **Insert Timestamp** toolbar button, 
current date and time will be inserted into the document. Note that the format 
of the timestamp may vary for different platforms and browsers. If you want to 
have more control over the display of the date and time, use the 
[Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) object's 
properties and methods.

![Date and time added to the document in CKEditor](guides/dev_tutorials_basics/workingExample.png)

Congratulations! You have just created a valid CKEditor plugin in under 20 lines 
of code! Since the ``insertHtml`` function can be used to add arbitrary HTML code to 
the document, you can replace the timestamp logic with your own customized code in 
order to insert other types of content into your document.