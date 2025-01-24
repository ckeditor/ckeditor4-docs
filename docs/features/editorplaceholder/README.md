---
category: user-interface
order: 60
url: features/editorplaceholder
menu-title: Editor Placeholder
meta-title-short: Editor Placeholder
---
<!--
Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using the Editor Placeholder

<info-box info="">
	This feature was introduced in CKEditor 4.15 and is provided through the <a href="https://ckeditor.com/cke4/addon/editorplaceholder">Editor Placeholder</a> plugin that is included in the Standard and Full presets available from the official CKEditor 4 <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with the <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The Editor Placeholder plugin allows you to display a placeholder text when the editor content is empty. The placeholder helps users locate the editor in the application and prompts to input the content. It works similarly to the native DOM [`placeholder` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#The_placeholder_attribute) used by inputs.

{@img assets/img/editorplaceholder_01.png 625 Editor placeholder in CKEditor 4}

The placeholder text is configurable and can be adjusted by using the {@linkapi CKEDITOR.config.editorplaceholder `config.editorplaceholder`} configuration option.

## Editor Placeholder Demo

See the {@linksdk editorplaceholder working "Editor Placeholder" sample} that showcases the editor placeholder.
