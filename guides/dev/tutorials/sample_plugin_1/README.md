#Creating a Simple CKEditor Plugin (Part 1)

The aim of this tutorial is to demonstrate how to create a basic CKEditor plugin.

We are going to develop an **abbreviation plugin** that lets the user insert abbreviations 
into their documents. The abbreviations will be using the ``<abbr>`` HTML element and 
will be added through a dialog window that is opened after clicking a dedicated 
toolbar button.

The plugin will be named **abbr**, just like the name of the corresponding HTML 
element that we are going to use in its implementation.

##Plugin Files

Firstly, we will need to create the ``abbr`` folder inside the ``plugins`` directory of 
the CKEditor installation.

<p class="tip">
	Remember that for CKEditor the name of the plugin folder is important and has to 
	be the same as the name of the plugin, otherwise the editor will not be able to 
	recognize it.
</p>

Inside the newly created ``abbr`` folder we are going to place the ``plugin.js`` file that 
will contain the plugin logic. Apart from that, since we will also need a toolbar 
icon for our plugin, we are going to add an ``images`` folder and subsequently 
place the ``icon.png`` file inside.

To sum up, we will need the following file structure for our plugin to work:

* ``ckeditor root``
	* ``plugins``
	* ``abbr``
		* ``images``
			* ``icon.png``
		* ``plugin.js``

##Plugin Source Code

With the following structure ready, it is time to open the ``plugin.js`` file in 
a text editor and to start creating the source code of the plugin.

	CKEDITOR.plugins.add( 'abbr', {
		init: function( editor ) {
			// Plugin logic goes here...
		}
	});

All CKEditor plugins are created by using the {@link CKEDITOR.plugins#add} function. 
This function should contain the plugin name (``'abbr'``) and the plugin logic 
placed inside the {@link CKEDITOR.pluginDefinition#init init} function that is 
called upon the initialization of the editor instance.

##Creating an Editor Command

We want our plugin to have a dialog window, so we need to define an editor 
command that opens a new dialog window. To do this, we will need to use 
the {@link CKEDITOR.editor#addCommand addCommand}  function to register the 
``abbrDialog`` command. That command 
opens the abbrDialog dialog that we are going to define in a moment by 
using the {@link CKEDITOR.dialogCommand} class.

	editor.addCommand( 'abbrDialog', new CKEDITOR.dialogCommand( 'abbrDialog' ) );

##Creating a Toolbar Button

The plugin dialog window is to be opened by using a toolbar button. To this 
end, we need to define a button that will be associated with the dialog 
window. The {@link CKEDITOR.ui#addButton} function accepts a button name (``'Abbr'``) 
along with the definition of the tooltip text (``label``) and the button icon 
(``icon``). Note that ``this.path`` is the directory where the ``plugin.js`` file resides.

These parameters are responsible for the button presentation. To make the 
button actually work, we need to connect it to the plugin command name defined 
above by using the command parameter.

	editor.ui.addButton( 'Abbr', {
		label: 'Insert Abbreviation',
		command: 'abbrDialog',
		icon: this.path + 'images/icon.png'
	});

##CKEditor Initialization

It is now time to initialize a CKEditor instance that will use the Abbreviation
plugin along with its toolbar button.

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
			extraPlugins: 'abbr',
			toolbar: [
				['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
				['About','-','Abbr']
			]
		});
	</script>

After you load the page containing the above CKEditor instance, you should be 
able to see the new plugin toolbar button along with its tooltip.	

![Abbreviation plugin has been loaded](guides/dev_tutorials_sample_plugin_1/pluginLoaded.png)

##Plugin Dialog Window

Clicking the button should open the abbrDialog dialog window. First, however, we 
need to return to the Abbreviation plugin source file and define the dialog 
window by using the CKEDITOR.dialog.add function. To see all dialog window 
definition elements, refer to the [CKEditor JavaScript API](#!/api).

In our case we will give the dialog window a name ('abbrDialog') and use the 
{@link CKEDITOR.dialog.definition#title title}, 
{@link CKEDITOR.dialog.definition#minWidth minWidth}, and 
{@link CKEDITOR.dialog.definition#minHeight minHeight} parameters to define its 
title and minimum dimensions, respectively.

<p class="tip">
	The name selected for the dialog window is the name that appears in the 
	addCommand function above.
</p>

###Dialog Window Tabs

The dialog window should also contain some 
{@link CKEDITOR.dialog.definition#contents contents}, so we will begin with 
adding two tabs along with their labels. Note that by default CKEditor also adds 
the standard **OK** and **Cancel** buttons.

In order to create the Abbreviation plugin dialog window along with two tabs, 
add the following code in the ``plugin.js`` file below the plugin toolbar button 
definition.

	CKEDITOR.dialog.add( 'abbrDialog', function ( editor ) {
		return {
			title: 'Abbreviation Properties',
			minWidth: 400,
			minHeight: 200,
	 
			contents: [
				{
					id: 'tab1',
					label: 'Basic Settings',
					elements: [
						// UI elements of the first tab	will be defined here 
					]
				},
				{
					id: 'tab2',
					label: 'Advanced Settings',
					elements: [
						// UI elements of the second tab will be defined here
					]
				}
			]
		};
	});

The result of this change can be seen immediately. Click the **Insert Abbreviation**
toolbar button in order to open the newly created **Abbreviation Properties**
dialog window containing two (empty) tabs.	

![A plugin dialog window with two tabs added](guides/dev_tutorials_sample_plugin_1/pluginDialog1.png)

###Dialog Window Tabs Elements

User interface elements that can be added to a dialog window tab are defined in 
the {@link CKEDITOR.dialog.definition.content#elements elements} parameter, which is an 
array of {@link CKEDITOR.dialog.definition.uiElement} objects.

The **Basic Settings** tab will contain two mandatory text fields (``type: 'text'``) 
with  the abbreviation and its explanation. Since both fields are obligatory, it is 
useful to add a simple validation mechanism in order to ensure that the user 
fills them.

The **Advanced Settings** tab will contain a single optional text field that allows 
the user to assign an id to the abbreviation element.

The code snippet presented below shows a full definition of the contents of both 
plugin tabs.

	contents: [
		{
			id: 'tab1',
			label: 'Basic Settings',
			elements: [
				{
					type: 'text',
					id: 'abbr',
					label: 'Abbreviation',
					validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty" )
				},
				{
					type: 'text',
					id: 'title',
					label: 'Explanation',
					validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty" )
				}	 
			]
		},
		{
			id: 'tab2',
			label: 'Advanced Settings',
			elements: [
				{
					type: 'text',
					id: 'id',
					label: 'Id'
				}
			]
		}
	]

When you reload the editor instance and open the **Abbreviation Properties** dialog 
window, the **Basic Settings** tab will now contain two mandatory text fields.

![Basic Settings tab of the Abbreviation plugin](guides/dev_tutorials_sample_plugin_1/pluginDialog2.png)

The **Advanced Settings** tab only contains a single id text field that can be left empty.

![Advanced Settings tab of the Abbreviation plugin](guides/dev_tutorials_sample_plugin_1/pluginDialog3.png)

##Plugin Behavior

The presentation layer of the plugin is now ready, so we can define the plugin 
behavior to actually make it work.

The {@link CKEDITOR.dialog.definition#onOk onOk} method is invoked once the user 
accepts the changes introduced in the 
dialog window by clicking the OK button or pressing the Enter key on the 
keyboard. Since the plugin adds a new ``<abbr>`` element to the DOM tree, we 
can use the {@link CKEDITOR.dom.document#createElement createElement} function to 
create a new DOM element.

With the new DOM element created, we can now retrieve the values of the 
``title`` and (optional) ``id`` fields with the 
{@link CKEDITOR.dialog#getValueOf getValueOf} function and pass them to 
appropriate ``<abbr>`` element attributes by using the 
{@link CKEDITOR.dom.element#setAttribute setAttribute} function.

Finally, we will pass the text entered in the abbr text field as the contents 
of the ``<abbr>`` element by using the 
{@link CKEDITOR.dom.element#setText setText} function.

With the contents of the ``<abbr>`` element ready, we can insert it into the 
document at the location of the cursor by using the 
{@link CKEDITOR.editor#method-insertElement insertElement} function.

Add the following ``onOk`` function code to your dialog window definition, below 
the code that creates the contents of the dialog.

	onOk: function() {
		var dialog = this;
		var abbr = editor.document.createElement( 'abbr' );
	 
		abbr.setAttribute( 'title', dialog.getValueOf( 'tab1', 'title' ) );
		abbr.setText( dialog.getValueOf( 'tab1', 'abbr' ) );
	 
		var id = dialog.getValueOf( 'tab2', 'id' );
		if ( id )
			abbr.setAttribute( 'id', id );
	 
		editor.insertElement( abbr );
	}

<p class="tip">
	Please note that another way to insert HTML code into CKEditor is using the 
	insertHtml function that adds HTML code at the location of the cursor in the 
	document:
</p>

	editor.insertHtml( '<h2>This is a sample header</h2><p>This is a sample paragraph.</p>' );

##Full Source Code

The full contents of the ``plugin.js`` file are as follows:

<p class="tip">
	You can also <a href="guides/dev_tutorials_sample_plugin_1/abbr.zip">download the 
	whole plugin folder</a> inluding the icon and the fully commented source code.
</p>

	CKEDITOR.plugins.add( 'abbr', {
		init: function( editor ) {
			editor.addCommand( 'abbrDialog',new CKEDITOR.dialogCommand( 'abbrDialog' ) );
			editor.ui.addButton( 'Abbr', {
				label: 'Insert Abbreviation',
				command: 'abbrDialog',
				icon: this.path + 'images/icon.png'
			});
			CKEDITOR.dialog.add( 'abbrDialog', function( editor ) {
				return {
					title: 'Abbreviation Properties',
					minWidth: 400,
					minHeight: 200,
					contents: [
						{
							id: 'tab1',
							label: 'Basic Settings',
							elements: [
								{
									type: 'text',
									id: 'abbr',
									label: 'Abbreviation',
									validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty" )
								},
								{
									type: 'text',
									id: 'title',
									label: 'Explanation',
									validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty" )
								}	 
							]
						},
						{
							id: 'tab2',
							label: 'Advanced Settings',
							elements: [
								{
									type: 'text',
									id: 'id',
									label: 'Id'
								}
							]
						}
					],
					onOk: function() {
						var dialog = this;
	 
						var abbr = editor.document.createElement( 'abbr' );
						abbr.setAttribute( 'title', dialog.getValueOf( 'tab1', 'title' ) );
						abbr.setText( dialog.getValueOf( 'tab1', 'abbr' ) );
						var id = dialog.getValueOf( 'tab2', 'id' );
						if ( id )
							abbr.setAttribute( 'id', id );
						editor.insertElement( abbr );
					}
				};
			});
		}
	});

##Working Example

The plugin code is now ready. When you click the **Insert Abbreviation** toolbar 
button, the **Abbreviation Properties** dialog window will open. Fill in the 
obligatory **Abbreviation** and **Explanation** fields and click the **OK** button.

![Abbreviation added in the dialog window](guides/dev_tutorials_sample_plugin_1/workingExample1.png)

The newly added abbreviation will be inserted into the document and will be 
displayed using the default styling of your browser. In Firefox, for example, 
the abbreviation will be underlined using a dotted line and the explanation 
will be displayed in a tooltip.

![Abbreviation added in the dialog window](guides/dev_tutorials_sample_plugin_1/workingExample2.png)

## Further Enhancements
The Abbreviation plugin is now able to add a new ``<abbr>`` element to the document, 
but does not make it possible to edit an already existing element. For this 
feature along with the context menu support check the 
[second part of the tutorial](#!/guide/dev_tutorials_sample_plugin_2).