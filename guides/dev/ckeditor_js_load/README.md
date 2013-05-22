# Loading CKEditor

CKEditor is a JavaScript application. To load it, you need to include a single file
reference in your page. If you [installed](#!/guide/dev_installation) CKEditor in the `ckeditor` directory in the root of your website, you need to insert the following code fragment into the `<head>` section of your page:

	<head>
		...
		<script src="/ckeditor/ckeditor.js"></script>
	</head>

When the above file is loaded, the [CKEditor JavaScript API](#!/api) is ready to be used.

When adding CKEditor to your web pages, use the original file name (`ckeditor.js`).
If you want to use a different file name, or even merge the CKEditor script into another
JavaScript file, refer to the [Specifying the Editor Path](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Specifying_the_Editor_Path) <!-- TODO: Move this link to JSDuck --> section of the Developer's Guide first.

## Creating Editors

Now that the [CKEditor JavaScript API](#!/api) is available on the page, you can use it to create editor instances. There are two different options available in order to achieve this:

 * [Framed Editing](#!/guide/dev_framed) &ndash; the most common way to use CKEditor, when the editor is usually represented by a toolbar and an editing area placed in a specific position on the page.

 * [Inline Editing](#!/guide/dev_inline) &ndash; used on pages that need to look like the final page. Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute. The editor toolbar appears automatically for these elements, floating on the page.

In order to examine both usage scenarios, choose the preferred option above to get more information. See also the [Framed Editing](http://ckeditor.com/demo#standard) and [Inline Editing](http://ckeditor.com/demo#inline) demos on our website.