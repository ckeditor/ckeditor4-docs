---
category: output-control
order: 20
url: guide/dev_output_format
menu-title: HTML Output Formatting
meta-title-short: HTML Output Formatting
---
<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# HTML Output Formatting

CKEditor offers a powerful and flexible output formatting system. It
gives developers full control over what the HTML code produced by the
editor will look like. The system makes it possible to control all HTML
tags and can give different results for each one of them.

## The HTML Output Writer

The [HTML Output Writer plugin](https://ckeditor.com/cke4/addon/htmlwriter) makes it possible to generate advanced output formatting with CKEditor.

The *writer* is used by the CKEDITOR.htmlDataProcessor class to write output data.
The current writer for a specific editor instance can be retrieved with the {@linkapi CKEDITOR.htmlDataProcessor#writer editor.dataProcessor.writer} property.

It is possible to configure several output formatting options by setting
the writer properties. The following example summarizes the most common properties and gives their default values:

	var writer = editor.dataProcessor.writer;

	// The character sequence to use for every indentation step.
	writer.indentationChars = '\t';

	// The way to close self-closing tags, like <br/>.
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

## Setting Writer Rules

Since the writer is a property of each editor instance and also due
to its dependency on the HTML Output Writer plugin to be loaded, the best way to
modify it is by listening to the {@linkapi CKEDITOR#instanceReady }
event, so it is safe to assume that the {@linkapi CKEDITOR.editor#dataProcessor } property will be
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

Another solution is to use the {@linkapi CKEDITOR } object which will cause all editor instances to be changed:

	CKEDITOR.on( 'instanceReady', function( ev ) {
		// Ends self-closing tags the HTML4 way, like <br>.
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## Adjusting Output Formatting Through Configuration

Numerous {@link guide/dev/configuration/README configuration options} let you tweak CKEditor behavior without touching the writer, including:
<ul style="margin-bottom:40px">
	<li>Entities support:
		<ul>
			<li style="float: left;">{@linkapi CKEDITOR.config#basicEntities config.basicEntities}</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#entities config.entities}</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#entities_greek config.entities_greek}</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#entities_latin config.entities_latin}</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#entities_processNumerical config.entities_processNumerical}</li>
		</ul>
	</li>
	<li style="clear:both">White space usage:
		<ul>
			<li style="float: left;">{@linkapi CKEDITOR.config#dataIndentationChars config.dataIndentationChars}</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#sourceAreaTabSize config.sourceAreaTabSize}</li>
		</ul></li>
	<li style="clear:both">Handling block elements:
		<ul>
			<li style="float: left;">{@linkapi CKEDITOR.config#autoParagraph config.autoParagraph} (<strong>deprecated</strong>)</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#fillEmptyBlocks config.fillEmptyBlocks}</li>
			<li style="float: left;margin-left:30px">{@linkapi CKEDITOR.config#ignoreEmptyParagraph config.ignoreEmptyParagraph}</li>
		</ul></li>
	<li style="clear:both">HTML encoding:
		<ul>
			<li style="float: left;">{@linkapi CKEDITOR.config#htmlEncodeOutput config.htmlEncodeOutput}</li>
		</ul>
	</li>
</ul>

## HTML Output Formatting Demo

See the [working "HTML Output Formatting" sample](https://sdk.ckeditor.com/samples/htmlformatting.html) that showcases how to control HTML output produced by CKEditor.

## Related Features

See the {@link guide/dev/features/sourcearea/README Source Code Editing} feature that lets the users edit raw HTML source of the editor content directly in CKEditor.
</br></p>