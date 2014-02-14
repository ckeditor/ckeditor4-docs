# Inline Editing

Inline Editing is a new technology introduced in CKEditor 4 that allows you to **select any editable element on the page and edit it in-place**. As a result, the editor can be used to edit pages that look just like the final page.

It is a total WYSIWYG experience, because not only the edited content looks like the final outcome, but also the page and the context where the content is placed is the real one. 

To try it out, see the [demo on the official CKEditor site](http://ckeditor.com/demo#inline).

<img src="guides/dev_ckeditor_js_load/inline_example.png" alt="Inline editor example" width="585" height="294">

## Enabling Inline Editing

Inline Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute.

Suppose, for example, that you want to make a `<div>` element editable. In order to achieve this, it is enough to do the following:

	<div id="editable" contenteditable="true">
		<h1>Inline Editing in Action!</h1>
		<p>The "div" element that contains this text is now editable.
	</div>

It is also possible to enable inline editing with explicit code, by calling the CKEDITOR.inline method for the element that needs to have it enabled. Note that in this case you need to turn off automatic editor creation first by setting the CKEDITOR.disableAutoInline option to `true`:

	<div id="editable" contenteditable="true">
		<h1>Inline Editing in Action!</h1>
		<p>The "div" element that contains this text is now editable.
	</div>
	<script>
		// Turn off automatic editor creation first.
		CKEDITOR.disableAutoInline = true;
		CKEDITOR.inline( 'editable' );
	</script>

When you click inside the contents of this `<div>` element, the CKEditor toolbar will appear.

<p class="tip">
	The list of elements that support inline editing is available in the CKEDITOR.dtd.$editable property.
</p>

### Inline Editing for Textarea

Since CKEditor 4.2 you can also turn `<textarea>` elements into inline editors. When you call the CKEDITOR.inline method on a `<textarea>`, an additional `<div>` element with inline editing enabled will replace the original `<textarea>`.

## Retrieving the Editor Data

Unlike in [classic editing](#!/guide/dev_framed), the data edited with CKEditor is not placed inside a `<textarea>` when using inline editing. It is present directly in the page DOM structure instead. It is thus the job of your application to retrieve the data and manipulate it for saving.

To retrieve the editor data, call the {@link CKEDITOR.editor#method-getData} method of the editor instance. For the examples above, this would look like the following:

	<script>
		var data = CKEDITOR.instances.editable.getData();

		// Your code to save "data", usually through Ajax.
	</script>

<p class="tip">
	If you do not save your data with a library that already encodes it by using the JavaScript <code>encodeURIComponent</code> method, but do it manually instead, you will have to remember to use <code>encodeURIComponent</code> to properly encode the data that is being sent.
</p>

Note that the ID of the original `<div>` was passed to the {@link CKEDITOR#instances} object to make it possible to retrieve the editor instance.