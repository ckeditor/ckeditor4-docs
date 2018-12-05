---
category: output-control
order: 80
url: guide/dev_bbcode
menu-title: BBCode Editing
meta-title-short: BBCode Editing
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# BBCode Editing

<info-box info="">
 This feature is provided through an optional plugin that is not included in the CKEditor distribution packages available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

[BBCode](http://en.wikipedia.org/wiki/BBCode) is a lightweight markup language which is used in some message board engines. An optional CKEditor plugin called [BBCode Output Format](https://ckeditor.com/cke4/addon/bbcode) configures CKEditor to output BBCode format instead of (X)HTML. It also customizes some editor settings to better match the BBCode environment.

The image below shows an example of the editor content created in BBCode format, as displayed in the {@link guide/dev/features/sourcearea/README source view}.

{@img assets/img/bbcode_02.png}

## Customizing CKEditor to Work on BBCode

This feature is aimed at developers who would like to integrate CKEditor with popular message boards or other platforms that use BBCode as their default format. Since BBCode formatting usually includes a subset of features available in traditional HTML editing, CKEditor used in this environment needs some customization. This involves creating a [custom editor build](https://ckeditor.com/cke4/builder) that only includes relevant features, {@linkapi CKEDITOR.config#removeButtons removing redundant buttons} or customizing some plugin options (like adjusting smilies).

<info-box hint="">
 Please note that currently no official standard exists for the BBCode markup language, so its implementation for different platforms may vary. This means that before using CKEditor to output BBCode you might need to adjust the default implementation to your own environment.
</info-box>

## BBCode Output Demo

See the {@linksdk bbcode working "BBCode Editing" sample} that showcases a CKEditor instance configured to output BBCode and customized to be a better fit for a typical BBCode environment.

## Related Features

See the {@link guide/dev/features/sourcearea/README Source Code Editing} feature that lets the users edit raw BBCode source of the editor content directly in CKEditor.
