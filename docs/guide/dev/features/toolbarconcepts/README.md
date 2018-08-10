---
category: toolbar
order: 80
url: guide/dev_toolbarconcepts
menu-title: Toolbar Concepts
meta-title-short: Toolbar Concepts
---
# Understanding CKEditor Toolbar Concepts

CKEditor 4 introduced a new concept for toolbar organization which is based on "grouping" instead of the traditional "item by item positioning" way. The aim of this article is to explain the concepts behind the editor toolbar and to help you choose the most optimal, accessibility-friendly and future-proof method to configure your toolbar.

<info-box hint="">
 While this article explains how you can configure the editor toolbar manually, this approach is not recommended. It is much easier and quicker to {@link guide/dev/features/toolbar/README use the toolbar configurator}. The configurator was introduced in <strong>CKEditor 4.5</strong> and is available in each official CKEditor installation package. 
</info-box>

## Toolbar Groups Configuration

**Note:** This approach is used in the {@link guide/dev/features/toolbar/README#basic-toolbar-configurator basic mode of the toolbar configurator}, which is the most recommended method to customize the editor toolbar. If you do not want to use the toolbar configurator, this method requires manual crafting of the toolbar configuration code and is recommended to more advanced users only.

Grouping configuration is defined by the {@linkapi CKEDITOR.config.toolbarGroups CKEDITOR.config.toolbarGroups} setting. The following is the configuration used by the Standard distribution of CKEditor:

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
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

It is a list (`Array`) of objects, each one with a `name` (e.g `clipboard` or `links`) and an optional "sub-groups" list.

### Changing the Groups Order

You can easily customize the group ordering and position by simply changing the above configuration.

You can force row breaks in the toolbar by adding `'/'` into the list, just like you can see in the code above.

Note that there are unused groups in the above configuration. This is "by design" (see "The Benefits of Group Configuration" below).

### The Benefits of Group Configuration

The most important benefit of toolbar grouping configuration over the "item by item" configuration is: **automation**.

It is now possible for plugin developers to define into which toolbar group their plugins should add buttons. For example, the [Image](https://ckeditor.com/cke4/addon/image) plugin includes its button in the `insert` group, while the [Undo and Redo](https://ckeditor.com/cke4/addon/undo) buttons go into the `undo` sub-group.

While not mandatory, having all groups and sub-groups configured (including the ones that you do not use) is recommended because at any moment in the future, when a new plugin gets installed, its button will automatically appear in the toolbar without further configuration requirements.

### The Drawbacks of Group Configuration

The most evident problem with grouping configuration is that it is not possible to precisely control where each item is placed in the toolbar. A plugin author can influence it when {@linkapi CKEDITOR.ui#addButton creating the toolbar button}, but it is entirely optional and cannot be easily configured by the developer customizing their CKEditor instance.

## "Item by Item" Configuration

**Note:** This approach is used in the {@link guide/dev/features/toolbar/README#advanced-toolbar-configurator advanced mode of the toolbar configurator}, which is a much more recommended method to customize the editor toolbar. If you do not want to use the toolbar configurator, this method requires manual crafting of the toolbar configuration code and is recommended to more advanced users only.

Other than the grouping configuration, it is also possible to have more control over every single element in the toolbar by defining their precise position. That is done by setting a "toolbar definition".

A {@linkapi CKEDITOR.config#toolbar toolbar definition} is a JavaScript array that contains the elements to
be displayed in all **toolbar rows** available in the editor. The following is an example:

	config.toolbar = [
		{ name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
	];

Here every toolbar group is given a name and a precise list of items is defined for each group.

The above can also be achieved with a simpler syntax (see "Accessibility Concerns" later on):

	config.toolbar = [
		[ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ],
		[ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
		'/',
		[ 'Bold', 'Italic' ]
	];

Item separator can be included by adding `'-'` (dash) to the list of items, as seen above.

You can force row breaks in the toolbar by adding `'/'` between groups. These separators can be used to force a
break at the point where they were placed, rendering the next toolbar group in a new row.

### The Benefits of "Item by Item" Configuration

The most evident benefit of this kind of configuration is that the position of every single item in the toolbar is under control.

### The Drawbacks of "Item by Item" Configuration

The biggest problem it that there will be no automation when new plugins get installed. This means that if a new plugin gets into your editor, you will have to manually change your configuration to include the plugin buttons.

## Accessibility Concerns

The `name` given for every toolbar group is used by assistive technologies such as screen
readers. That name will be used by CKEditor to search for the "readable" name of each toolbar group in the editor language files (the `toolbarGroups` entries).

Screen readers will announce each of the toolbar groups by using either their readable name (if it is available) or their defined `name` attribute.

## Custom Toolbar Demo 

See the {@linksdk toolbar working "Custom Editor Toolbar" sample} that showcases an editor instance with a one-row toolbar set to include just a few most relevant editing features.

## Related Features

Refer to the following resources for more information about editor toolbar:

 * The {@link guide/dev/features/toolbar/README Toolbar Configuration} article explains how to set up the editor toolbar using the toolbar configurator (CKEditor 4.5+).
 * The {@link guide/dev/features/toolbarlocation/README Toolbar Location} feature lets you change the toolbar position in classic editor.
 * The {@link guide/dev/features/sharedspace/README Shared Toolbar and Bottom Bar} feature lets you place the toolbar in a designated page element and share it among multiple editor instances used on one page.
