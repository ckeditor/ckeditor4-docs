---
category: output-control
order: 60
url: guide/dev_enterkey
menu-title: Enter Key Configuration
meta-title-short: Enter Key Configuration
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Enter Key Configuration

When CKEditor is integrated in some environments you may want to configure the default behavior of the <kbd>Enter</kbd> and <kbd>Shift+Enter</kbd> keys to generate matching output. This is possible thanks to {@linkapi CKEDITOR.config.enterMode CKEDITOR.config.enterMode} and {@linkapi CKEDITOR.config.shiftEnterMode CKEDITOR.config.shiftEnterMode}, respectively.

Both configuration settings can use one of the following options:

* {@linkapi CKEDITOR.ENTER_P CKEDITOR.ENTER_P} &ndash; new `<p>` paragraphs are created;
* {@linkapi CKEDITOR.ENTER_BR CKEDITOR.ENTER_BR} &ndash; lines are broken with `<br>` elements;
* {@linkapi CKEDITOR.ENTER_DIV CKEDITOR.ENTER_DIV} &ndash; new `<div>` blocks are created.

<info-box hint="">
 <p>
 	Changing the {@linkapi CKEDITOR.config#enterMode Enter Mode}
 	setting to <code>BR</code> or <code>DIV</code> is not recommended. The default
 	<code>{@linkapi CKEDITOR#ENTER_P CKEDITOR.ENTER_P}</code>
 	mode is fully supported by all editor features and plugins and is also the most correct one
 	in terms of best practices for creating web content.
 </p>
 <p>
 	If you want to change it to control paragraph spacing, you should use stylesheets instead. Edit the
 	<code>contents.css</code> file and set up a suitable margin value for <code>&lt;p&gt;</code>
 	elements, for example:
 <pre>p { margin: 0; }</pre>
 </p>
</info-box>

## Enter Key Configuration Demo

See the {@linksdk enterkey working "Enter Key Configuration" sample} that showcases the effects of using different settings for <kbd>Enter</kbd> and <kbd>Shift+Enter</kbd> keys on editor output.
