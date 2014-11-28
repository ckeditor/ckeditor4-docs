<!--
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Enter Key Configuration

When CKEditor is integrated in some environments you may want to configure the default behavior of the <kbd>Enter</kbd> and <kbd>Shift+Enter</kbd> keys to generate matching output. This is possible thanks to CKEDITOR.config.enterMode and CKEDITOR.config.shiftEnterMode, respectively.

Both configuration settings can use one of the following options:

* CKEDITOR.ENTER_P &ndash; new `<p>` paragraphs are created;
* CKEDITOR.ENTER_BR &ndash; lines are broken with `<br>` elements;
* CKEDITOR.ENTER_DIV &ndash; new `<div>` blocks are created.

<div class="tip">
	<p>
		Changing the <a href="#!/api/CKEDITOR.config-cfg-enterMode">Enter Mode</a>
		setting to <code>BR</code> or <code>DIV</code> is not recommended. The default
		<code><a href="#!/api/CKEDITOR-property-ENTER_P">CKEDITOR.ENTER_P</a></code>
		mode is fully supported by all editor features and plugins and is also the most correct one
		in terms of best practices for creating web content.
	</p>
	<p>
		If you want to change it to control paragraph spacing, you should use stylesheets instead. Edit the
		<code>contents.css</code> file and set up a suitable margin value for <code>&lt;p&gt;</code>
		elements, for example:
	<pre>p { margin: 0; }</pre>
	</p>
</div>

## Enter Key Configuration Demo 

See the [working "Enter Key Configuration" sample](http://sdk.ckeditor.com/samples/enterkey.html) that showcases the effects of using different settings for <kbd>Enter</kbd> and <kbd>Shift+Enter</kbd> keys on editor output.