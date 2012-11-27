Output Formatting
=================

CKEditor offers a powerful and flexible output formatting system. It
gives developers full control over what the HTML code produced by the
editor will look like. The system makes it possible to control all HTML
tags and can give a different result for each one of them.

The HTML Writer
---------------

The [HTML Writer plugin](http://ckeditor.com/addon/htmlwriter) makes it possible to generate advanced formatted output with CKEditor.

The "writer" is used by the {@link CKEDITOR.htmlDataProcessor} class to write the output data.
Therefore, the current writer for a specific editor instance
can be retrieved with the {@link CKEDITOR.htmlDataProcessor#writer editor.dataProcessor.writer} property.

It is possible to configure several output formatting options by setting
the writer properties. The following example summarizes the most used of
them, giving their default values:

	var writer = editor.dataProcessor.writer;

	// The character sequence to use for every indentation step.
	writer.indentationChars = '\t';

	// The way to close self closing tags, like <br />.
	writer.selfClosingEnd = ' />';

	// The character sequence to be used for line breaks.
	writer.lineBreakChars = '\n';

	// The writing rules for the <p> tag.
	writer.setRules( 'p', {
		// Indicates that this tag causes indentation on line breaks inside of it.
		indent: true,

		// Inserts a line break before the <p> opening tag.
		breakBeforeOpen: true,

		// Inserts a line break after the <p> opening tag.
		breakAfterOpen: true,

		// Inserts a line break before the </p> closing tag.
		breakBeforeClose: false,

		// Inserts a line break after the </p> closing tag.
		breakAfterClose: true
	});

Setting Writer Rules
--------------------

Because the writer is a property of each editor instance, and also due
to its dependency on the writer plugin to be loaded, the best way to
modify it is by listening to the {@link CKEDITOR#instanceReady}
event, so it is safe to assume that the {@link CKEDITOR.editor#dataProcessor} property will be
loaded and ready for changes. The following code shows an example of
this approach used when creating an editor instance:

	CKEDITOR.replace( 'editor1', {
		on: {
			instanceReady: function( ev ) {
				// Output paragraphs as <p>Text</p>.
				this.dataProcessor.writer.setRules( 'p', {
					indent: false,
					breakBeforeOpen: true,
					breakAfterOpen: false,
					breakBeforeClose: false,
					breakAfterClose: true
				});
			}
		}
	});

Another method is to use the {@link CKEDITOR} object, so all editor instances will be changed:

	CKEDITOR.on( 'instanceReady', function( ev ) {
		// Ends self closing tags the HTML4 way, like <br>.
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});
