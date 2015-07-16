<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# HTML Output Formatting

CKEditor offers a powerful and flexible output formatting system. It
gives developers full control over what the HTML code produced by the
editor will look like. The system makes it possible to control all HTML
tags and can give different results for each one of them.

## The HTML Output Writer

The [HTML Output Writer plugin](http://ckeditor.com/addon/htmlwriter) makes it possible to generate advanced output formatting with CKEditor.

The *writer* is used by the CKEDITOR.htmlDataProcessor class to write output data.
The current writer for a specific editor instance can be retrieved with the {@link CKEDITOR.htmlDataProcessor#writer editor.dataProcessor.writer} property.

It is possible to configure several output formatting options by setting
the writer properties. The following example summarizes the most common properties and gives their default values:

	var writer = editor.dataProcessor.writer;

	// The character sequence to use for every indentation step.
	writer.indentationChars = '\t';

	// The way to close self-closing tags, like <br />.
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

Another solution is to use the {@link CKEDITOR} object which will cause all editor instances to be changed:

	CKEDITOR.on( 'instanceReady', function( ev ) {
		// Ends self-closing tags the HTML4 way, like <br>.
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## Adjusting Output Formatting Through Configuration

Numerous [configuration options](#!/guide/dev_configuration) let you tweak CKEditor behavior without touching the writer, including:
<ul style="margin-bottom:40px">
	<li>Entities support:
		<ul>
			<li style="float: left;"><a href="http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-basicEntities">config.basicEntities</a></li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-entities">config.entities</a></li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-entities_greek">config.entities_greek</a></li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-entities_latin">config.entities_latin</a></li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-entities_processNumerical">config.entities_processNumerical</a></li>
		</ul>
	</li>
	<li style="clear:both">White space usage:
		<ul>
			<li style="float: left;"><a href="#!/api/CKEDITOR.config-cfg-dataIndentationChars">config.dataIndentationChars</a></li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-sourceAreaTabSize">config.sourceAreaTabSize</a></li>
		</ul></li>
	<li style="clear:both">Handling block elements:
		<ul>
			<li style="float: left;"><a href="#!/api/CKEDITOR.config-cfg-autoParagraph">config.autoParagraph</a> (<strong>deprecated</strong>)</li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-fillEmptyBlocks">config.fillEmptyBlocks</a></li>
			<li style="float: left;margin-left:30px"><a href="#!/api/CKEDITOR.config-cfg-ignoreEmptyParagraph">config.ignoreEmptyParagraph</a></li>
		</ul></li>
	<li style="clear:both">HTML encoding:
		<ul>
			<li style="float: left;"><a href="#!/api/CKEDITOR.config-cfg-htmlEncodeOutput">config.htmlEncodeOutput</a></li>
		</ul>
	</li>
</ul>

## HTML Output Formatting Demo 

See the [working "HTML Output Formatting" sample](http://sdk.ckeditor.com/samples/htmlformatting.html) that showcases how to control HTML output produced by CKEditor.

## Related Features

See the [Source Code Editing](#!/guide/dev_sourcearea) feature that lets the users edit raw HTML source of the editor content directly in CKEditor.
