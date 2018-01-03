<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Output

The following article contains tips about customizing the output HTML code produced by the editor.


## How Do I Output HTML Instead of XHTML Code Using CKEditor?

If you want CKEditor to output valid HTML4 code instead of XHTML, you should configure the behavior of the {@link CKEDITOR.dataProcessor dataProcessor}.

For some tips on how to achieve this, check the [HTML Output Formatting](#!/guide/dev_output_format) article as well as the [HTML Output Formatting](https://sdk.ckeditor.com/samples/htmlformatting.html) sample in CKEditor SDK.

If, for example, you want CKEditor to output the self-closing tags in the HTML4 way, creating `<br>` elements instead of `<br />`, configure the `selfClosingEnd` setting in the following way.

	CKEDITOR.on( 'instanceReady', function( ev ) {
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## How Do I Output BBCode Instead of HTML Code Using CKEditor?

You should try the [BBCode plugin](https://ckeditor.com/cke4/addon/bbcode). See the [BBCode Editing sample](https://sdk.ckeditor.com/samples/bbcode.html) and the [documentation](#!/guide/dev_bbcode) for more information.

<img src="guides/dev_bbcode/bbcode_02.png" alt="CKEditor content created in BBCode">
