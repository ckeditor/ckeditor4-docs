# Toolbar Customization

While CKEditor is a full-featured WYSIWYG editor, not all of its options
may be needed in all cases. Because of this, toolbar customization is
one of the most common requirements.

There are two ways to configure the toolbar to match your needs:

 * [Toolbar Groups Configuration](#!/guide/dev_toolbar-section-1)
 * ["Item by Item" Configuration](#!/guide/dev_toolbar-section-2)

## Toolbar Groups Configuration

CKEditor 4 introduced a new concept for toolbar organization which is based on "grouping" instead of the traditional "item by item positioning" way.

Grouping configuration is defined by the {@link CKEDITOR.config#toolbarGroups toolbarGroups} setting. The following is the configuration used by the "standard" distribution of CKEditor:

	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

It is a list (Array) of objects, each one with a "name" (e.g "clipboard" or "links") and a optional "sub-groups" list.

### Changing the Groups Order

You can easily customize the groups ordering and position by simply changing the above configuration. 

You can force row-breaks in the toolbar by adding `'/'` into the list, just like you could see above.

Note that there are unused groups in the above configuration. This is "by design" (see "The Benefits of Group Configuration").

### The Benefits of Group Configuration

The most important benefit of toolbar grouping configuration over the "item by item" configuration is: **automation**.

It is now possible for plugin developers to define into which group their plugins should add buttons in the toolbar. For example, the "image" plugin, includes its button into the "insert" group, while the undo and redo buttons go into the "undo" sub-group.

While not mandatory, having all groups and sub-groups configured (including not used ones) is recommended because at any moment in the future, when a new plugin gets installed, its button will automatically appear in the toolbar without further configuration requirements.

### The Drawbacks of Group Configuration

The most evident problem with grouping configuration its that it is not possible to control precisely where each item is placed in the toolbar. It is the plugin itself to decide it.

## "Item by Item" Configuration

Other than the grouping configuration, it is also possible to have more control over every single element in the toolbar by defining their precise position. That is done by configuring a "toolbar definition".

A toolbar definition is a JavaScript array that contains the elements to
be displayed in all **toolbar rows** available in the editor. The following is an example:

	config.toolbar = [
		{ name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
	];

Here every toolbar group is given a name and their precise list of items is defined.

The above can also be achieved with a simpler syntax (see "Accessibility Concerns" later on):

	config.toolbar = [
		[ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ],
		[ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
		'/',
		[ 'Bold', 'Italic' ]
	];

Items separator can be included by adding `'-'` (dash) to the list of items, as seen above.

You can force row-breaks in the toolbar by adding `'/'` between groups. They can be used to force a
break at the point where they were placed, rendering the next toolbar
group in a new row. 

### The Benefits of "Item by Item" configuration

The most evident benefit of this kind of configuration is that the position of every single item in the toolbar is under control.

### The drawbacks of "Item by Item" configuration

The biggest problem it that there will be no automation when new plugins get installed. This means that, if any new plugin get into your editor, you'll have to manually change your configurations, to include the plugin buttons at any desired position.

## Accessibility Concerns

The "name" used on every toolbar group will be used by assistive technology such as screen
readers. That name will be used by CKEditor too lookup for the "readable" name of each toolbar group in the editor language files (the `toolbarGroups` entries).

Screen readers will announce each of the toolbar groups by using either their readable name, if available, or their defined `name` attribute.

