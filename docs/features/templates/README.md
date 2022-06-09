---
category: styling-formatting
order: 80
url: features/templates
menu-title: Content templates
meta-title-short: Content templates
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Content templates

<info-box info="">
 	This feature is provided through the <a href="https://ckeditor.com/cke4/addon/templates">Content Templates</a> plugin that is included in the Full preset available from the official CKEditor 4 <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

This Content Templates plugin provides a dialog to offer predefined content templates - with page layout, text formatting and styles.

When enabled, the plugin adds the **Templates** (<img class="inline" src="%BASE_PATH%/assets/img/templates-button.png" alt="Copy Formatting toolbar button">) toolbar button. Use it to invoke a dialog with defined templates, then use the dialog to apply a selected template.

{@img assets/img/templates_01.png Content templates selector in CKEditor}

A couple of sample templates can be found inside of the plugin directory at install time. The user may design and load their own favorite templates, too.



## Defining templates

A template needs several basic things to work. The most important part is the HTML content defining the layout of the template.

