# Output


## How Do I Output HTML Instead of XHTML Code Using CKEditor?

If you want CKEditor to output valid HTML4 code instead of XHTML, you should configure the behavior of the {@link CKEDITOR.dataProcessor dataProcessor}.

For some tips on how to achieve this, check the [Output Formatting](#!/guide/dev_output_formatting) section of [Developer's Guide](#!/guide/dev) as well as the Output HTML (`plugins/htmlwriter/samples/outputhtml.html`) and Output XHTML (`samples/xhtmlstyle.html`) samples that can be found in CKEditor installation package.

If, for example, you want CKEditor to output the self-closing tags in the HTML4 way, creating `<br>` elements instead of `<br />`, configure the `selfClosingEnd` setting in the following way.

	CKEDITOR.on( 'instanceReady', function( ev ) {
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});


## How Do I Output HTML code in FCKeditor Style?

**TODO** How Do I Output HTML code in CKEditor 3.x Style? **TODO**

In FCKeditor 2.x, the predecessor of CKEditor 3.x and CKEDITOR 4.x, HTML source was formatted in the following way, using spaces and placing the element tags and contents in one line:

	<p>Some text</p>

	<table width="200" cellspacing="1" cellpadding="1" border="1" height="100">
		<tbody>
			<tr>
				<td>&nbsp;cell_1.1</td>
				<td>&nbsp;cell_1.2</td>
			</tr>
		</tbody>
	</table>

	<ul>
		<li>item_1</li>
		<li>item_2</li>
	</ul>

CKEditor 4.x formats HTML source code in the following way, using tabs and indenting element contents:

	<p>Some text</p>

	<p>First line<br />
	Second line<br />
	Third line</p>

	<table border="1" cellpadding="1" cellspacing="1" height="100" width="200">
		<tbody>
			<tr>
				<td>&nbsp;cell_1.1</td>
				<td>&nbsp;cell_1.2</td>
			</tr>
		</tbody>
	</table>

	<ul>
		<li>item_1</li>
		<li>item_2</li>
	</ul>

If you would like to go back to FCKeditor formatting, you can achieve it by adding the following code to your config.js file:

	CKEDITOR.on( 'instanceReady', function( ev ) {
		var writer = ev.editor.dataProcessor.writer;
		// The character sequence to use for every indentation step.
		writer.indentationChars = '    ';

		var dtd = CKEDITOR.dtd;
		// Elements taken as an example are: block-level elements (div or p), list items (li, dd), and table elements (td, tbody).
		for ( var e in CKEDITOR.tools.extend( {}, dtd.$block, dtd.$listItem, dtd.$tableContent ) ) {
			ev.editor.dataProcessor.writer.setRules( e, {
				// Indicates that an element creates indentation on line breaks that it contains.
				indent: false,
				// Inserts a line break before a tag.
				breakBeforeOpen: true,
				// Inserts a line break after a tag.
				breakAfterOpen: false,
				// Inserts a line break before the closing tag.
				breakBeforeClose: false,
				// Inserts a line break after the closing tag.
				breakAfterClose: true
			});
		}

		for ( var e in CKEDITOR.tools.extend( {}, dtd.$list, dtd.$listItem, dtd.$tableContent ) ) {
			ev.editor.dataProcessor.writer.setRules( e, {
				indent: true,
			});
		}

		// You can also apply the rules to a single element.
		ev.editor.dataProcessor.writer.setRules( 'table', {
			indent: true
		});

		ev.editor.dataProcessor.writer.setRules( 'form', {
			indent: true
		});
	});

More information about HTML source formatting can also be found in the [Output Formatting](#!/guide/dev_output_formatting) article from the [Developer's Guide](#!/guide/dev).


## How Do I Output BBCode Instead of HTML Code Using CKEditor?

[CKEditor 3.6](http://ckeditor.com/blog/CKEditor_3.6_released) introduced a new **BBCode** plugin that makes it possible to configure CKEditor to output BBCode instead of HTML.

For some tips on how to achieve this, check the **BBCode Plugin** (`plugins/bbcode/samples/bbcode.html`) sample that can be found in CKEditor installation package or viewed live on the nightly build.

By default, the BBCode plugin is turned off, so if you want to use it, you need to enable it first.

	CKEDITOR.replace( 'editor1', {
			extraPlugins: 'bbcode'
	});

A more refined configuration code can be found in the BBCode plugin sample.