<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Classic Editing

Classic editing is still probably the most common way to use CKEditor. In this usage scenario the editor is most often represented by a toolbar and an editing area placed in a specific position on the page, usually as a part of a form that you use to submit some content to the server. Sometimes it is also called "framed editing", because in this case the editor creates a temporary `<iframe>` element for itself.

This method is used in the [Quick Start Guide](#!/guide/dev_installation-section-adding-ckeditor-to-your-page) example. To try it out, see also the [demo on the official CKEditor site](http://ckeditor.com/demo#standard).

<img src="guides/dev_ckeditor_js_load/classic_example.png" alt="Classic editor example" width="572" height="288">

## Content Styles vs. Page Styles

In classic editing **the styles of the editor content are separated from the styles of the surrounding page**. It is particularly useful when:

* Admininistration and frontend themes in a CMS are different &mdash; as in such case inheriting styles from the backend theme would make no sense.
* Edited content is rendered in different locations of a website that may have different styling &mdash; as in such case it is more efficient to just focus on creating semantically correct syntax.
* The editor works in a changeable environment (e.g. a themable CMS) &mdash; where it is hard to predict how user themes will be constructed.

Due to focus on semantic markup and possible differences between the styles of content within the editor and the styles used when the content is rendered on a page, such editors are sometimes called <abbr title="What You See Is What You Mean">WYSIWYM</abbr> editors ("What You See Is What You Mean").

## Creating a Classic Editor with a Textarea

After [loading the CKEditor script](#!/guide/dev_ckeditor_js_load) you will be ready to create your classic editor instances.

In classic editing, CKEditor can work just like a `<textarea>` HTML element on your page. The editor offers a user interface to write, format, and work with rich text in a hassle-free manner, but the same content could be added (though not that easily) through a `<textarea>` element, requiring the user to type HTML code inside.

As a matter of fact, in this scenario CKEditor uses the `<textarea>` element to transfer its data to the server. The `<textarea>` element is invisible to the end user. In order to create an editor instance using this approach, you must first add a `<textarea>` element to the source code of your HTML page:

	<textarea name="editor1" id="editor1">&lt;p&gt;Initial editor content.&lt;/p&gt;</textarea>

Note that if you want to load data into the editor, for example from a database, you need to put that data inside the `<textarea>` element, just like the HTML-encoded `<p>` element in the example above. In this case the `<textarea>` element was named `editor1`. This name can be used in the server-side code later, when receiving the submitted data.

After the `<textarea>` element is inserted, you can use the [CKEditor JavaScript API](#!/api) to replace this HTML element with an editor instance. A simple (and most commonly used) CKEDITOR.replace method call will be enough to achieve that:

	<script>
		CKEDITOR.replace( 'editor1' );
	</script>

This script block must be included at any point after the `<textarea>` tag in the source code of the page. You can also call the CKEDITOR.replace method inside the `<head>` section, but in this case you will need to listen for the `window.onload` event:

	<script>
		window.onload = function() {
			CKEDITOR.replace( 'editor1' );
		};
	</script>

### Alternative Methods for Creating a Classic Editor

Apart from the CKEDITOR.replace method you can also use the following options to create a classic editor on your page:

* The CKEDITOR.appendTo method &ndash; Creates a new editor instance at the end of a specific DOM element.
* The CKEDITOR.replaceAll method &ndash; Replaces all `<textarea>` elements available in the document (or just all those that match certain criteria) with editor instances.
* The automatic replacement of all `<textarea>` elements of a `ckeditor` class in the document with CKEditor instances.

## Complete Sample

To insert a CKEditor instance, you can use the following sample that creates a basic HTML page containing a form with a `<textarea>` element that is replaced with CKEditor.

	<!DOCTYPE html>
	<html>
	<head>
		<title>CKEditor Classic Editing Sample</title>
		<!-- Make sure the path to CKEditor is correct. -->
		<script src="/ckeditor/ckeditor.js"></script>
	</head>
	<body>
		<form method="post">
			<p>
				My Editor:<br>
				<textarea name="editor1" id="editor1">&lt;p&gt;Initial editor content.&lt;/p&gt;</textarea>
				<script>
					CKEDITOR.replace( 'editor1' );
				</script>
			</p>
			<p>
				<input type="submit">
			</p>
		</form>
	</body>
	</html>

## Classic Editing Demo 

See the [working "Classic Editor" sample](http://sdk.ckeditor.com/samples/classic.html) that showcases a few usage scenarios for classic editing. 

## Further Reading

Check the following articles to learn more about other editor types and learn how to get and save the editor data:

* [Inline editing](#!/guide/dev_inline) is a new technology introduced in CKEditor 4 that allows you to select any editable element on the page and edit it in-place.
* [Getting and Saving Data in CKEditor](#!/guide/dev_savedata) explains how to retrieve data from any editor instance and send it to your server.