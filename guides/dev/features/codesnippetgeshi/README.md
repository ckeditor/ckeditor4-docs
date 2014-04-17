# Code Snippet GeSHi Guide

The [Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi) plugin is an extension of the [Code Snippet](#!/guide/dev_codesnippet) plugin, which uses the [GeSHi](http://qbnz.com/highlighter/) PHP server-side syntax highlighting engine instead of the default, client-side [highlight.js](http://highlightjs.org) library.

Both code snippet plugins were introduced in [CKEditor 4.4](http://ckeditor.com/blog/CKEditor-4.4-Released) as optional plugins which means that you need to [add them to your build](#!/guide/dev_plugins) in order to use them.

## Requirements

* CKEditor 4.4+
* PHP 4.4+
* A modern web browser or **IE9+**
* CKEditor plugin dependencies: [Ajax](http://ckeditor.com/addon/ajax), [Code Snippet](http://ckeditor.com/addon/codesnippet)

## Installation

### Back-end configuration

First of all you need to install Code Snippet GeSHi plugin for CKEditor and the GeSHi library itself.

1. Install the [Code Snippet GeSHi](http://ckeditor.com/addon/codesnippetgeshi) plugin (for more information see [Plugin Installation Guide](#!/guide/dev_plugins)).
1. Download GeSHi library from Download page at [GeSHi website](http://qbnz.com/highlighter).
1. Create a `lib` directory next to your `ckeditor` directory.
1. Extract GeSHi files to at chosen location &ndash; for example in `lib/geshi/` directory.
1. Create a `colorize.php` file (e.g. in the `lib/` directory) and set its content to the following:

		<?php

		if ( function_exists( 'stream_resolve_include_path' ) && stream_resolve_include_path( 'geshi/geshi.php' ) === FALSE ) {
			die( '<pre class="html">Please install the geshi library. Refer to plugins/codesnippetgeshi/README.md for more information.</pre>' );
		}

		include_once 'geshi/geshi.php';

		$json_string = file_get_contents( 'php://input' );
		$json_object = json_decode( $json_string );

		$geshi = new GeSHi( $json_object->html, $json_object->lang );

		echo $geshi->parse_code();


    This file will be queried each time syntax highlighting is needed.

1. At this point you may have a following directory structure:

		lib/
			geshi/
				GeSHi directories...
				geshi.php
			colorize.php
		ckeditor/
			CKEditor files and directories...
			ckeditor.js

<p class="tip">
	It's a good practice to place external libraries outside of a CKEditor directory, it makes future updates easier.
</p>

### Editor configuration

Now we can focus on CKEditor configuration. Go to JavaScript code where CKEditor configuration is stored, and change the [`config.codeSnippetGeshi_url`](#!/api/CKEDITOR.config-cfg-codeSnippetGeshi_url) property. For example:

	CKEDITOR.replace( 'editor1', {
		extraPlugins: 'codesnippetgeshi',
		codeSnippetGeshi_url: '../lib/colorize.php'
	} );

You can find more information about setting configuration in the [Setting configuration guide](#!/guide/dev_configuration).

**Note:** the value of [`config.codeSnippetGeshi_url`](#!/api/CKEDITOR.config-cfg-codeSnippetGeshi_url) might be also an absolute url.

### Summary

In this tutorial we used a `lib/` directory as an example of organizing the directory structure outside of CKEditor. Most likely you'll want to adjust it to match your needs, but remember to update [`config.codeSnippetGeshi_url`](#!/api/CKEDITOR.config-cfg-codeSnippetGeshi_url) config option.

You can now open your page with CKEditor and add some code to it. As long as [Code Snippet GeSHi](#!/guide/dev_codesnippetgeshi) plugin will be enabled, it will send AJAX requests to GeSHi adapter file pointed by the [`config.codeSnippetGeshi_url`](#!/api/CKEDITOR.config-cfg-codeSnippetGeshi_url) config option.
