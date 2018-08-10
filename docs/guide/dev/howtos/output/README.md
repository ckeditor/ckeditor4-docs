---
category: howtos
order: 120
url: guide/dev_howtos_output
menu-title: Output
meta-title-short: Output
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Output

The following article contains tips about customizing the output HTML code produced by the editor.


## How Do I Output HTML Instead of XHTML Code Using CKEditor?

If you want CKEditor to output valid HTML4 code instead of XHTML, you should configure the behavior of the {@linkapi CKEDITOR.dataProcessor dataProcessor}.

For some tips on how to achieve this, check the {@link guide/dev/features/output_format/README HTML Output Formatting} article as well as the {@linksdk htmlformatting HTML Output Formatting} sample in CKEditor SDK.

If, for example, you want CKEditor to output the self-closing tags in the HTML4 way, creating `<br>` elements instead of `<br/>`, configure the `selfClosingEnd` setting in the following way.

	{@linkapi CKEDITOR.on CKEDITOR.on}( 'instanceReady', function( ev ) {
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## How Do I Output BBCode Instead of HTML Code Using CKEditor?

You should try the [BBCode plugin](https://ckeditor.com/cke4/addon/bbcode). See the {@linksdk bbcode BBCode Editing sample} and the {@link guide/dev/features/bbcode/README documentation} for more information.

<img src="%BASE_PATH%/assets/img/bbcode_02.png" alt="CKEditor content created in BBCode">
