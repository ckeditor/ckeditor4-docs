# Custom Editor Toolbar

While CKEditor is a full-featured WYSIWYG editor, not all of its options
may be needed in all cases. Because of this, toolbar customization is
one of the most common and required tasks when dealing with CKEditor.

## Toolbar Definition

A toolbar definition is a JavaScript array that contains the elements to
be displayed in all **toolbar rows** available in the editor.

The toolbar configuration can be defined in CKEditor using one of the
following methods:

-   Define specific toolbar items with {@link CKEDITOR.config#toolbar config.toolbar}.
-   Define just the toolbar groups which will absorb automatically any items that
belonged to it, with {@link CKEDITOR.config#toolbarGroups config.toolbarGroups} setting.

The following code snippet reflects the default CKEditor toolbar
setting defined in toolbar groups.

	[
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
		{ name: 'links' },
		{ name: 'insert' },
		'/',
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	]

### Button Groups

Every toolbar definition is composed of a series of **toolbar button
groups**. Each toolbar group has a label (name) and the listing of
buttons that belong to the group, placed in square **brackets (`[ ]`)**. The
toolbar group items move together to new rows when the editor is
resized.

_The group label will be used by assisstive devices such as screen
readers. It is added in the `name` attribute and is first looked up in
the CKEditor language file (under the `editor.lang.toolbarGroups.group_name` entry).
When its definition is found, the text value of this entry is used. If the `name` attribute
value does not appear in the language file, it is taken as a literal
toolbar group label and read aloud._

As shown in the code above, each toolbar button group is defined as a
separate JavaScript array of strings. Every string stands for a single
toolbar item to be used. Toolbar items are defined by plugins.

You can also include a separator in the toolbar group by including a
**dash (`-`)** character in it.

### Forcing Row Break

The definition contains numerous **slash (`/`)** characters that
were placed between toolbar button groups. They can be used to force a
break at the point where they were placed, rendering the next toolbar
group in a new row. This placement will not be changed when CKEditor is
resized.

## Toolbar Customization

A simple way to configure the toolbars of all CKEditor instances is to
add a custom toolbar definition inside the `config.js` file, or even
better — in a separate custom configuration file (see [Setting
Configuration](#!/guide/dev_configuration)).

For example, the following is a good recommended toolbar definition that
can be placed in the `config.js` file:

    CKEDITOR.editorConfig = function( config )
    {
            config.toolbar = 'MyToolbar';

            config.toolbar_MyToolbar =
            [
                    { name: 'document', items : [ 'NewPage','Preview' ] },
                    { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
                    { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','Scayt' ] },
                    { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'
                     ,'Iframe' ] },
                    '/',
                    { name: 'styles', items : [ 'Styles','Format' ] },
                    { name: 'basicstyles', items : [ 'Bold','Italic','Strike','-','RemoveFormat' ] },
                    { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote' ] },
                    { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                    { name: 'tools', items : [ 'Maximize','-','About' ] }
            ];
    };

Inside the configuration file you can create as many toolbar definitions
as you need. Later, based on some criteria, you can choose the toolbar
to use for each CKEditor instance. Each toolbar definition can be used
as many times as required (or not used at all, for that matter). For
example, with the following code, two editors are created on the page
and each one is using a different toolbar:

    CKEDITOR.replace( 'editor1',
            {
                    toolbar : 'MyToolbar'
            });

    CKEDITOR.replace( 'editor2',
            {
                    toolbar : 'Basic'
            });

It is also possible to set the toolbar definition in-page, at the same
time when you create an editor instance. If this is the case, assign the
toolbar setting directly to the editor instance, like in the example
below:

    CKEDITOR.replace( 'editor1',
            {
                    toolbar :
                    [
                            { name: 'basicstyles', items : [ 'Bold','Italic' ] },
                            { name: 'paragraph', items : [ 'NumberedList','BulletedList' ] },
                            { name: 'tools', items : [ 'Maximize','-','About' ] }
                    ]
            });
