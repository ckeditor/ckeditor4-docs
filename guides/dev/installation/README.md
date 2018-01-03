<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor Quick Start Guide

The aim of this article is to get you up and running with CKEditor in two minutes.

## Download

Visit the official [CKEditor Download](https://ckeditor.com/ckeditor-4/download/) site. For a production site we recommend you choose the default **Standard Package** and click the **Download CKEditor** button to get the `.zip` installation file. If you want to try out more editor features, you can download the **Full Package** instead.

<a href="https://ckeditor.com/ckeditor-4/download/"><img src="guides/dev_installation/ckeditor_quick_start_download.png" alt="CKEditor Download site" width="914" height="440"></a>

## Unpacking

Unpack (extract) the downloaded `.zip` archive to the `ckeditor` directory in the root of your website.

## Trying Out

CKEditor comes with a sample that you can check to verify if the installation was successful as well as a few "next steps" ideas and references to further resources.

Open the following page in the browser to see the sample:
`http://<your site>/ckeditor/samples/index.html`

<img src="guides/dev_installation/ckeditor_sample.png" alt="CKEditor sample available in each installation package" width="802" height="530">

Additionally, you can click the Toolbar Configurator button on the editor sample page to open a handy tool that will let you [adjust the toolbar](#!/guide/dev_toolbar) to your needs.

## Adding CKEditor to Your Page

If the sample works correctly, you are ready to build your own site with CKEditor included.

To start, create a simple HTML page with a `<textarea>` element in it. You will then need to do two things:

1. Include the  `<script>` element loading CKEditor in your page.
2. Use the [`CKEDITOR.replace()`](#!/api/CKEDITOR-method-replace) method to replace the existing `<textarea>` element with CKEditor.

See the following example:

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>A Simple Page with CKEditor</title>
			<!-- Make sure the path to CKEditor is correct. -->
			<script src="../ckeditor.js"></script>
		</head>
		<body>
			<form>
				<textarea name="editor1" id="editor1" rows="10" cols="80">
					This is my textarea to be replaced with CKEditor.
				</textarea>
				<script>
					// Replace the <textarea id="editor1"> with a CKEditor
					// instance, using default configuration.
					CKEDITOR.replace( 'editor1' );
				</script>
			</form>
		</body>
	</html>

When you are done, open your test page in the browser.

**Congratulations! You have just installed and used CKEditor on your own page in virtually no time!**

{@img ckeditor_on_page.png CKEditor added to your sample page}

## Using the CDN

Instead of downloading CKEditor to your server and hosting it you can also use the CDN version. Go to the [official CKEditor CDN](http://cdn.ckeditor.com/) page for more details.

## Next Steps

Go ahead and play a bit more with the sample; try to change your configuration as suggested to customize it. And when you are ready to dive a bit deeper into CKEditor, you can try the following:

1. Check the [Setting Configuration](#!/guide/dev_configuration) article to see how to adjust the editor to your needs.
1. Get familiar with [Advanced Content Filter](#!/guide/dev_acf). This is a useful tool that adjusts the content inserted into CKEditor to the features that are enabled and filters out disallowed content.
1. [Modify your toolbar](#!/guide/dev_toolbar) to only include the features that you need. You can find the useful visual toolbar configurator directly in your editor sample.
1. Learn about CKEditor features in the [Functionality Overview](#!/guide/dev_features) section.
1. Visit the [CKEditor SDK](http://sdk.ckeditor.com) to see the **huge collection of working editor samples** showcasing its features, with source code readily available to see and download.
1. Browse the [Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all) for some additional plugins or skins.
1. Use [CKBuilder](https://ckeditor.com/cke4/builder) to create your custom CKEditor build.
1. Browse the [Developer's Guide](#!/guide) for some further ideas on what to do with CKEditor and join the CKEditor community at [Stack Overflow](http://stackoverflow.com/questions/tagged/ckeditors) to discuss all things CKEditor with fellow developers!
