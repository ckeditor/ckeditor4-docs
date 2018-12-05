---
category: output-control
order: 20
url: guide/dev_output_format
menu-title: HTML Output Formatting
meta-title-short: HTML Output Formatting
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# HTML Output Formatting

CKEditor offers a powerful and flexible output formatting system. It
gives developers full control over what the HTML code produced by the
editor will look like. The system makes it possible to control all HTML
tags and can give different results for each one of them.

## The HTML Output Writer

The [HTML Output Writer plugin](https://ckeditor.com/cke4/addon/htmlwriter) makes it possible to generate advanced output formatting with CKEditor.

The *writer* is used by the {@linkapi CKEDITOR.htmlDataProcessor CKEDITOR.htmlDataProcessor} class to write output data.
The current writer for a specific editor instance can be retrieved with the {@linkapi CKEDITOR.htmlDataProcessor#writer editor.dataProcessor.writer} property.

It is possible to configure several output formatting options by setting
the writer properties. The following example summarizes the most common properties and gives their default values:

```js
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
} );
```

## Setting Writer Rules

Since the writer is a property of each editor instance and also due
to its dependency on the HTML Output Writer plugin to be loaded, the best way to
modify it is by listening to the {@linkapi CKEDITOR#instanceReady }
event, so it is safe to assume that the {@linkapi CKEDITOR.editor#dataProcessor } property will be
loaded and ready for changes. The following code shows an example of
this approach used when creating an editor instance:

```js
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
} );
```

Another solution is to use the {@linkapi CKEDITOR } object which will cause all editor instances to be changed:

	{@linkapi CKEDITOR.on CKEDITOR.on}( 'instanceReady', function( ev ) {
		// Ends self-closing tags the HTML4 way, like <br>.
		ev.editor.dataProcessor.writer.selfClosingEnd = '>';
	});

## Adjusting Output Formatting Through Configuration

Numerous {@link guide/dev/configuration/README configuration options} let you tweak CKEditor behavior without touching the writer, including:

* Entities support:
  * {@linkapi CKEDITOR.config#basicEntities}
  * {@linkapi CKEDITOR.config#entities}
  * {@linkapi CKEDITOR.config#entities_greek}
  * {@linkapi CKEDITOR.config#entities_latin}
  * {@linkapi CKEDITOR.config#entities_processNumerical}
* White space usage:
  * {@linkapi CKEDITOR.config#dataIndentationChars}
  * {@linkapi CKEDITOR.config#sourceAreaTabSize}
* Handling block elements:
  * {@linkapi CKEDITOR.config#autoParagraph} (**deprecated**)
  * {@linkapi CKEDITOR.config#fillEmptyBlocks}
  * {@linkapi CKEDITOR.config#ignoreEmptyParagraph}
* HTML encoding:
  * {@linkapi CKEDITOR.config#htmlEncodeOutput}

## HTML Output Formatting Demo

See the {@linksdk htmlformatting working "HTML Output Formatting" sample} that showcases how to control HTML output produced by CKEditor.

## Related Features

See the {@link guide/dev/features/sourcearea/README Source Code Editing} feature that lets the users edit raw HTML source of the editor content directly in CKEditor.
