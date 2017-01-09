<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using Placeholders

<p class="requirements">
	This feature is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_widget_installation">needs to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

The optional [Placeholder](http://ckeditor.com/addon/placeholder) plugin allows you to create and modify read-only elements that are only editable through the **Placeholder Properties** dialog window. This feature is useful in all sorts of templates and texts that are repeated in numerous places whose format should not be modified.

{@img placeholder_01.png}

Since version 4.3 placeholders are inserted as inline widgets, so they have [all advantages of widgets](#!/guide/dev_widgets-section-common-usage-scenarios), i.e. you can **treat the entire placeholder as one entity** and select, delete, or move it with drag and drop in the editor content area as one unit.

## Customization Options

Please note that the default placeholder implementation might easily be extended. You could, for example, customize the dialog window to show a drop-down list with pre-defined options that can be selected to fill the placeholder.

## Placeholder Demo

See the [working "Using Placeholders" sample](http://sdk.ckeditor.com/samples/placeholder.html) that showcases a possible use for the Placeholder plugin in automatic replies sent from a Customer Support system.

## Related Features

[Content Templates](http://ckeditor.com/addon/templates) let you pre-define CKEditor content, including document layout, text formatting, and styles.
