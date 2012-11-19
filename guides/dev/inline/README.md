# Inline Editing

Inline Editing is a new technology designed to make it possible edit pages that look just like the final page. It is a total WYSIWYG experience, because not only the edited content will look like the final, but also the page and the context where the content is placed.

## Enabling Inline Editing

Inline Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute.

For example, supposed that you want to make a `<div>` element editable. It's enough to do so:

	<div id="editable" contenteditable="true">
		<h1>Inline Editing in Action!</h1>
		<p>The div element that holds this text is now editable.
	</div>

It is also possible to enable editing by code, by calling CKEDITOR.inline:

	<div id="editable" contenteditable="true">
		<h1>Inline Editing in Action!</h1>
		<p>The div element that holds this text is now editable.
	</div>
	<script>
		// Turn off automatic editor creation first.
		CKEDITOR.disableAutoInline = true;
		CKEDITOR.inline( 'editable' );
	</script>

When clicking inside the above `<div>` contents, the CKEditor toolbar will appear.

## Retrieving the Editor Data

Unlike [Framed Editing](#!/guide/dev_framed), the data edited with CKEditor is not placed inside a `<textarea>` when using Inline Editing. It is instead present directly in the page DOM. Because of this, it is your application job to retrieve the data and manipulate it for saving.

To retrieve the editor data, simply call the {@link CKEDITOR.editor#method-getData} method of the editor instance. For the above examples, tho would look like the following:

	<script>
		var data = CKEDITOR.instances.editable.getData();
		
		// Your code to save "data", usually though Ajax.
	</script>
	
Note that the original `<div>` id has been passed to the CKEDITOR.instances object, to retrieve the editor instance.