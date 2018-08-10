---
category: output-control
order: 40
url: guide/dev_fullpage
menu-title: Editing Complete HTML Pages
meta-title-short: Editing Complete HTML Pages
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Full Page Editing with Document Properties Plugin

<info-box info="">
 <p>
 	Both full page editing and the Documentation Properties plugin are only supported for {@link guide/dev/framed/README classic editor} with {@link guide/dev/features/uitypes/README#fixed-user-interface fixed user interface}.
 </p>
 <p>
 Some aspects of this feature are provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
 </p>
</info-box>

With full page mode and the optional [Document Properties](https://ckeditor.com/cke4/addon/docprops) plugin you can use CKEditor to edit entire HTML pages (from `<html>` to `</html>`), including the page metadata like `DOCTYPE`, character set encoding, meta tags, text and background color, or margins.

## Full Page Mode

Full page mode is provided by the [IFrame Editing Area](https://ckeditor.com/cke4/addon/wysiwygarea) (`wysiwygarea`) plugin which means it is only available for classic, `iframe`-based editor with fixed UI. It can be enabled by setting the {@linkapi CKEDITOR.config.fullPage CKEDITOR.config.fullPage} option to `true` in your {@link guide/dev/configuration/README editor configuration}:

	config.fullPage = true;

With these settings in place, CKEditor will output the entire HTML page, including the elements outside the `<body>` section.

<info-box hint="">
 <p>
 Since in full page mode you usually want to be able to freely enter any HTML content without limitations, default editor {@link guide/dev/acf/README content filtering} can be disabled to prevent CKEditor from removing disallowed elements.
 </p>

```js
config.allowedContent = true;
```

</info-box>

The following image shows the source of a complete HTML page edited in CKEditor.

{@img assets/img/fullpage_01.png}

## Document Properties Plugin

Additionally, you can use the optional [Document Properties](https://ckeditor.com/cke4/addon/docprops) plugin to manipulate some of the document metadata. When the plugin is enabled, it adds the **Document Properties** (<img class="inline" src="%BASE_PATH%/assets/img/docprops.png">) toolbar button along with the matching **Document Properties** dialog window. You can use it to set the following:

* Page title, language direction and code, charset encoding and `DOCTYPE`.
* Text color, background color or image, page margins.
* Meta tags with document keywords, description, author and copyright.

{@img assets/img/docprops_02.png}

## Full Page Editing Demo

See the {@linksdk fullpage working "Full Page Editing with Document Properties Plugin" sample} that showcases using CKEditor to work on a complete HTML page and to setup some document metadata.

## Related Features

Refer to the following resources for more information about related features:

* The {@link guide/dev/features/sourcearea/README Source Code Editing} feature lets the users edit raw HTML source of the editor content directly in CKEditor.
* The {@link guide/dev/features/output_format/README Output Formatting} feature gives developers full control over what the HTML code produced by the editor will look like.
