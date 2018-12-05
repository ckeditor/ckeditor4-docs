---
category: inserting-content
order: 180
url: guide/dev_placeholder
menu-title: Placeholders
meta-title-short: Placeholders
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using Placeholders

<info-box info="">
 This feature is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Placeholder](https://ckeditor.com/cke4/addon/placeholder) plugin allows you to create and modify read-only elements that are only editable through the **Placeholder Properties** dialog window. This feature is useful in all sorts of templates and texts that are repeated in numerous places whose format should not be modified.

{@img assets/img/placeholder_01.png}

Since version 4.3 placeholders are inserted as inline widgets, so they have {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the entire placeholder as one entity** and select, delete, or move it with drag and drop in the editor content area as one unit.

## Customization Options

Please note that the default placeholder implementation might easily be extended. You could, for example, customize the dialog window to show a drop-down list with pre-defined options that can be selected to fill the placeholder.

## Placeholder Demo

See the {@linksdk placeholder working "Using Placeholders" sample} that showcases a possible use for the Placeholder plugin in automatic replies sent from a Customer Support system.

## Related Features

[Content Templates](https://ckeditor.com/cke4/addon/templates) let you pre-define CKEditor content, including document layout, text formatting, and styles.
