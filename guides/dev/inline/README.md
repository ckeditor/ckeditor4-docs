# Inline Editing

Inline Editing is a new technology designed to make it possible to edit pages that look just like the final page. It is a total WYSIWYG experience, because not only the edited content will look like the final outcome, but also the page and the context where the content is placed will be the real one.

## Enabling Inline Editing

Inline Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute.

Suppose, for example, that you want to make a `<div>` element editable. In order to achieve this, it is enough to do so:

	<div id="editable" contenteditable="true">
		<h1>Inline Editing in Action!</h1>
		<p>The div element that contains this text is now editable.
	</div>

It is also possible to enable editing with explicit code, by calling the CKEDITOR.inline method:

	<div id="editable" contenteditable="true">
		<h1>Inline Editing in Action!</h1>
		<p>The div element that contains this text is now editable.
	</div>
	<script>
		// Turn off automatic editor creation first.
		CKEDITOR.disableAutoInline = true;
		CKEDITOR.inline( 'editable' );
	</script>

When you click inside the contents of this `<div>` element, the CKEditor toolbar will appear.

## Retrieving the Editor Data

Unlike in [Framed Editing](#!/guide/dev_framed), the data edited with CKEditor is not placed inside a `<textarea>` when using Inline Editing. It is instead present directly in the page DOM. Because of this, it is the job of your application to retrieve the data and manipulate it for saving.

To retrieve the editor data, simply call the {@link CKEDITOR.editor#method-getData} method of the editor instance. For the above examples, this would look like the following:

	<script>
		var data = CKEDITOR.instances.editable.getData();

		// Your code to save "data", usually through Ajax.
	</script>

<p class="tip">
	If you do not save your data with a library that already encodes it by using <code>encodeURIComponent</code>, but do it manually instead, you will have to remember to use <code>encodeURIComponent</code> to properly encode the data that is being sent.
</p>

Note that the ID of the original `<div>` was passed to the {@link CKEDITOR#instances} object to make it possible to retrieve the editor instance.