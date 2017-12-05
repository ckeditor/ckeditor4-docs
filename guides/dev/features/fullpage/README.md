<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Full Page Editing with Document Properties Plugin

<div class="requirements">
	<p>
		Both full page editing and the Documentation Properties plugin are only supported for <a href="#!/guide/dev_framed">classic editor</a> with <a href="#!/guide/dev_uitypes-section-fixed-user-interface">fixed user interface</a>.
	</p>
	<p>
	Some aspects of this feature are provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_plugins">needs to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
	</p>
</div>

With full page mode and the optional [Document Properties](https://ckeditor.com/cke4/addon/docprops) plugin you can use CKEditor to edit entire HTML pages (from `<html>` to `</html>`), including the page metadata like `DOCTYPE`, character set encoding, meta tags, text and background color, or margins.

## Full Page Mode

Full page mode is provided by the [IFrame Editing Area](https://ckeditor.com/cke4/addon/wysiwygarea) (`wysiwygarea`) plugin which means it is only available for classic, `iframe`-based editor with fixed UI. It can be enabled by setting the CKEDITOR.config.fullPage option to `true` in your [editor configuration](#!/guide/dev_configuration):

	config.fullPage = true;

With these settings in place, CKEditor will output the entire HTML page, including the elements outside the `<body>` section.

<div class="tip">
	<p>
	Since in full page mode you usually want to be able to freely enter any HTML content without limitations, default editor <a href="#!/guide/dev_acf">content filtering</a> can be disabled to prevent CKEditor from removing disallowed elements.
	</p>
<pre>
config.allowedContent = true;
</pre>
</div>

The following image shows the source of a complete HTML page edited in CKEditor.

{@img fullpage_01.png}

## Document Properties Plugin

Additionally, you can use the optional [Document Properties](https://ckeditor.com/cke4/addon/docprops) plugin to manipulate some of the document metadata. When the plugin is enabled, it adds the **Document Properties** (<img class="inline" src="guides/dev_fullpage/docprops.png">) toolbar button along with the matching **Document Properties** dialog window. You can use it to set the following:

* Page title, language direction and code, charset encoding and `DOCTYPE`.
* Text color, background color or image, page margins.
* Meta tags with document keywords, description, author and copyright.

{@img docprops_02.png}

## Full Page Editing Demo

See the [working "Full Page Editing with Document Properties Plugin" sample](https://sdk.ckeditor.com/samples/fullpage.html) that showcases using CKEditor to work on a complete HTML page and to setup some document metadata.

## Related Features

Refer to the following resources for more information about related features:

* The [Source Code Editing](#!/guide/dev_sourcearea) feature lets the users edit raw HTML source of the editor content directly in CKEditor.
* The [Output Formatting](#!/guide/dev_output_format) feature gives developers full control over what the HTML code produced by the editor will look like.
