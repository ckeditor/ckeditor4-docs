# Code Snippet GeSHi Guide

The **Code Snippet GeSHi** is an extension of [Code Snippet](http://ckeditor.com/addon/codesnippet) plugin, which uses [GeSHi](http://qbnz.com/highlighter/) PHP server-side syntax highlighting engine instead of default, client-side [highlight.js](http://highlightjs.org).

## How can I enable Code Snippet GeSHi plugin?

### Requirements

* CKEditor 4.4+
* PHP 4.4+
* A modern web browser or **IE9+**

### Installation

#### Back-end configuration

First of all we need to download Code Snippet GeSHi plugin for CKEditor and the GeSHi library itself.

1. Download [Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi) plugin along with its dependencies (for more informations see [Plugin Installation Guide](http://docs.ckeditor.com/#!/guide/dev_plugins)).
1. Download GeSHi library from Download page at [GeSHi website](http://qbnz.com/highlighter).
1. Create a `lib` directory next to your `ckeditor` directory.
1. Extract GeSHi files to created `lib` directory, so you will end up with direcotry `lib/geshi` having `geshi.php` inside.
1. Create a `colorize.php` file in `lib` directory, and set its content to the following:
	```
	<?php

	if (function_exists('stream_resolve_include_path') && stream_resolve_include_path('geshi/geshi.php') === FALSE) {
	  die('<pre class="html">Please install the geshi library. Refer to plugins/codesnippetgeshi/README.md for more information.</pre>');
	}

	include_once 'geshi/geshi.php';

	$json_string = file_get_contents( 'php://input' );
	$json_object = json_decode( $json_string );

	$geshi = new GeSHi( $json_object->html, $json_object->lang );

	echo $geshi->parse_code();
	```
	This file will be queried each time when syntax highlighting is needed.
1. At this point you should have a following directory structure:
* `lib/`
	* `geshi/`
		* GeSHi directories...
		* `geshi.php`
	* `colorize.php`
* `ckeditor/`
	* CKEditor files and directories...
	* `ckeditor.js/`

<p class="tip">
	It's a good practice to place external libraries outside of a CKEditor directory, it makes future updates easier.
</p>

#### Editor configuration

Now we can focus on CKEditor configuration. Go to JavaScript code where CKEditor configuration is stored, and change the [`codeSnippetGeshi_url`](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-codeSnippetGeshi_url) property, like following:

	CKEDITOR.replace( 'editor1', {
		extraPlugins: 'codesnippetgeshi',
		codeSnippetGeshi_url: '../lib/colorize.php'
	} );

**Note:** the value of `codeSnippetGeshi_url` might be also an absolute url.

#### Conclusion

In this tutorial we used lib directory as a just example of organizing the directory structure outside of CKEditor. Most likely you'll want to adjust it to match your needs, but remember to update `codeSnippetGeshi_url` config property.

That's all, you can now open your page with CKEditor and add some code to it. As long as **codesnippetgeshi** plugin will be enabled, it will send highlight requests to GeSHi adapter file pointed by `codeSnippetGeshi_url` config property.
