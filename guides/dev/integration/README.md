# Integration

There are several ways to integrate CKEditor into your pages. This page presents the most common way to achieve it.

## Step 1: Loading CKEditor

CKEditor is a JavaScript application. To load it, you need to include a single file
reference in your page. If you have [installed](#!/guide/dev_installation) CKEditor in the `ckeditor` directory in root of your website, you need to insert the following code fragment
into the `<head>` section of your page:

	<head>
		...
		<script src="/ckeditor/ckeditor.js"></script>
	</head>

When the above file is loaded, the [CKEditor JavaScript API](#!/api) is ready to be used.

When adding CKEditor to your web pages, use the original file name (ckeditor.js).
If you want to use a different file name, or even merge the CKEditor script into another
JavaScript file, refer to the [Specifying the Editor Path](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Specifying_the_Editor_Path) section of the Developer's Guide first.

## Step 2: Creating an Editor Instance

CKEditor works just like a `textarea` element in your page. The editor offers a user interface to easily write, format, and work with rich text, but the same thing could be achieved
(though not that easily) with a `<textarea>` element, requiring the user to type HTML code inside.

As a matter of fact, CKEditor uses the `textarea` to transfer its data to the server. The `textarea` element is invisible to the end user. In order to create an editor instance, you must first add a `<textarea>` element to the source code of your HTML page:

	<textarea name="editor1">&lt;p&gt;Initial value.&lt;/p&gt;</textarea>

Note that if you want to load data into the editor, for example from a database, you need to put that data inside the `<textarea>` element, just like the HTML-encoded <p> element in the example above. In this case the textarea element was named `editor1`. This name can be used in the server-side code later, when receiving the posted data.

After the textarea element is inserted, you can use the [CKEditor JavaScript API](!#/api) to replace this HTML element with an editor instance. A simple CKEDITOR.replace method call is needed for that:

	<script>
		CKEDITOR.replace( 'editor1' );
	</script>

This script block must be included at any point after the `<textarea>` tag in the source code of the page. You can also call the replace function inside the <head> section, but in this case you will need to listen for the `window.onload` event:

	<script>
		window.onload = function() {
			CKEDITOR.replace( 'editor1' );
		};
	</script>

## Step 3: Saving the Editor Data

As stated above, the editor works just like a `<textarea>` field. This means that when submitting a form containing an editor instance, its data will be simply posted, using the `<textarea>` element name as the key to retrieve it. 

For example, following the above example, we could create the following PHP code: 

	<?php
		$editor_data = $_POST[ 'editor1' ];
	?>

### Client-Side Data Handling

Some applications (like those based on Ajax) need to handle all data on the client side, sending it to the server using their specific methods. If this is the case, it is enough to use the [CKEditor JavaScript API](!#/api) to easily retrieve the editor instance data. In order to do this, you can use the {@link CKEDITOR.editor#method-getData getData} method:

	<script>
		var editor_data = CKEDITOR.instances.editor1.getData();
	</script>

### Complete Sample

To insert a CKEditor instance, you can use the following sample that creates a basic page containing a form with a `textarea` element that is replaced with CKEditor.

	<html>
	<head>
		<title>Sample CKEditor Site</title>
		<script src="/ckeditor/ckeditor.js"></script>
	</head>
	<body>
		<form method="post">
			<p>
				My Editor:<br>
				<textarea name="editor1">&lt;p&gt;Initial value.&lt;/p&gt;</textarea>
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
