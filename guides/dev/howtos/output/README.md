<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Output


## How Do I Output HTML Instead of XHTML Code Using CKEditor?

If you want CKEditor to output valid HTML4 code instead of XHTML, you should configure the behavior of the {@link CKEDITOR.dataProcessor dataProcessor}.

For some tips on how to achieve this, check the [Output Formatting](#!/guide/dev_output_format) section of [Developer's Guide](#!/guide/dev) as well as the Output HTML (`plugins/htmlwriter/samples/outputhtml.html`) and Output XHTML (`samples/xhtmlstyle.html`) samples that can be found in CKEditor installation package.

If, for example, you want CKEditor to output the self-closing tags in the HTML4 way, creating `<br>` elements instead of `<br />`, configure the `selfClosingEnd` setting in the following way.

	CKEDITOR.on( 'instanceReady', function( ev ) {
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## How Do I Output BBCode Instead of HTML Code Using CKEditor?

You should try the [BBCode plugin](http://ckeditor.com/addon/bbcode).