---
category: howtos
order: 120
url: guide/dev_howtos_output
menu-title: Output
meta-title-short: Output
---
<!--
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Output

The following article contains tips about customizing the output HTML code produced by the editor.


## How Do I Output HTML Instead of XHTML Code Using CKEditor 4?

If you want CKEditor 4 to output valid HTML4 code instead of XHTML, you should configure the behavior of the {@linkapi CKEDITOR.dataProcessor dataProcessor}.

For some tips on how to achieve this, check the {@link features/output_format/README HTML Output Formatting} article as well as the {@linkexample htmlformatting HTML Output Formatting} sample in CKEditor 4 Examples.

If, for example, you want CKEditor 4 to output the self-closing tags in the HTML4 way, creating `<br>` elements instead of `<br/>`, configure the `selfClosingEnd` setting in the following way.

	{@linkapi CKEDITOR.on CKEDITOR.on}( 'instanceReady', function( ev ) {
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## How Do I Output BBCode Instead of HTML Code Using CKEditor 4?

You should try the [BBCode plugin](https://ckeditor.com/cke4/addon/bbcode). See the {@linkexample bbcode BBCode Editing sample} and the {@link features/bbcode/README documentation} for more information.

<img src="%BASE_PATH%/assets/img/bbcode_02.png" alt="CKEditor content created in BBCode">
