<!--
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# BBCode Editing

<p class="requirements">
	This feature is provided through an optional plugin that is not included in the CKEditor distribution packages available from the <a href="http://ckeditor.com/download">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

[BBCode](http://en.wikipedia.org/wiki/BBCode) is a lightweight markup language which is used in some message board engines. An optional CKEditor plugin called [BBCode Output Format](http://ckeditor.com/addon/bbcode) configures CKEditor to output BBCode format instead of (X)HTML. It also customizes some editor settings to better match the BBCode environment.

The image below shows an example of the editor content created in BBCode format, as displayed in the [source view](#!/guide/dev_sourcearea).

{@img bbcode_02.png}

## Customizing CKEditor to Work on BBCode

This feature is aimed at developers who would like to integrate CKEditor with popular message boards or other platforms that use BBCode as their default format. Since BBCode formatting usually includes a subset of features available in traditional HTML editing, CKEditor used in this environment needs some customization. This involves creating a [custom editor build](http://ckeditor.com/builder) that only includes relevant features, [removing redundant buttons](#!/api/CKEDITOR.config-cfg-removeButtons) or customizing some plugin options (like adjusting smilies).

<p class="tip">
	Please note that currently no official standard exists for the BBCode markup language, so its implementation for different platforms may vary. This means that before using CKEditor to output BBCode you might need to adjust the default implementation to your own environment.
</p>

## BBCode Output Demo 

See the [working "BBCode Editing" sample](http://sdk.ckeditor.com/samples/bbcode.html) that showcases a CKEditor instance configured to output BBCode and customized to be a better fit for a typical BBCode environment.

## Related Features

See the [Source Code Editing](#!/guide/dev_sourcearea) feature that lets the users edit raw BBCode source of the editor content directly in CKEditor.