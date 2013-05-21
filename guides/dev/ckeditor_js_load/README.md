# Loading CKEditor

CKEditor is a JavaScript application. To load it, you need to include a single file
reference in your page. If you have [installed](#!/guide/dev_installation) CKEditor in the `ckeditor` directory in root of your website, you need to insert the following code fragment
into the `<head>` section of your page:

	<head>
		...
		<script src="/ckeditor/ckeditor.js"></script>
	</head>

When the above file is loaded, the [CKEditor JavaScript API](#!/api) is ready to be used.

When adding CKEditor to your web pages, use the original file name (`ckeditor.js`).
If you want to use a different file name, or even merge the CKEditor script into another
JavaScript file, refer to the [Specifying the Editor Path](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Specifying_the_Editor_Path) <!-- TODO: Move this link to JSDuck --> section of the Developer's Guide first.

## Creating Editors

Now that the [CKEditor JavaScript API](#!/api) is available in the page, you can use it create editors. For that, there are two different options available:

 * [Framed Editing](#!/guide/dev_framed): the most common way to use the editor, usually represented by a toolbar and a editing area placed on a specific position in the page.

 * [Inline Editing](#!/guide/dev_inline): to be used on pages that look like the final page. Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute. The editor toolbar automatically appears, floating in the page.
 
 Just click on your preferred option to have more information.