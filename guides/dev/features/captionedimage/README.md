<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Creating Captioned Images

<p class="requirements">
	This feature was introduced in <strong>CKEditor 4.3</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and <a href="#!/guide/dev_widget_installation">needs to be added to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

The optional [Enhanced Image](https://ckeditor.com/cke4/addon/image2) plugin introduces a new widget type &mdash; a captioned image. It replaces the standard [Image](https://ckeditor.com/cke4/addon/image) plugin with a new captioned image that has the following capabilities:

* It allows for adding **image captions** (that will not be separated from the image when its location changes).
* It has [all advantages of widgets](#!/guide/dev_widgets-section-common-usage-scenarios), i.e. you can **treat the image and its caption as one entity** and select, delete, or move it in the editor content area as a whole.
* It supports **drag and drop** for changing the image position.
* It provides **image alignment**, including centering, with inline styles or CSS classes.
* It includes hassle-free dynamic **"click and drag" resizing**.

Below you can see a captioned image inserted into the editor content. When you hover it with your mouse, the editable areas (the image and its caption) become outlined. The resizing and positioning handles along with their tooltips will appear, too.

{@img captionedimage_01.png Captioned image}

## File Browser Integration

The Enhanced Image plugin can be [integrated with a file browser](#!/guide/dev_file_browse_upload) like [CKFinder](http://cksource.com/ckfinder) just like the standard Image plugin. Thanks to this you will be able to upload your images to the server or browse the server for images to be inserted into the editor content.

Below you can see the plugin's Image Properties dialog window with the file browser integrated. The Browse Server button as well as the Upload tab will appear.

{@img captionedimage_02.png File manager integrated with Enhanced Image dialog}

## Image Alignment and Classes

Captioned images can be easily aligned through their Image Properties dialog windows, including centering them in the editor content. By default the alignment is added through inline styles, producing the code like the following example:

	<figure class="image" style="float:right">
		<img alt="MyImage" src="myimage.png" />
		<figcaption>MyCaption</figcaption>
	</figure>

Thanks to the CKEDITOR.config.image2_alignClasses option introduced in CKEditor 4.4 you can use CSS classes for setting image alignment. Additionally, the CKEDITOR.config.image2_captionedClass option allows you to assign a custom class to the `<figure>` element of a captioned image. Both these options combined give you far better control over the styling process.

For example, the following configuration:

	config.image2_alignClasses = [ 'image-left', 'image-center', 'image-right' ];
    config.image2_captionedClass = 'image-captioned';

will produce class-driven, stylable markup that lets you avoid inflexible and non-semantic inline CSS code:

	<figure class="image-captioned image-right">
    	<img alt="MyImage" src="myimage.png" />
    	<figcaption>MyCaption</figcaption>
	</figure>

Do remember, though, that you need to define the CSS rules for these classes in your stylesheet. Once this configuration option is set, corresponding style definitions must be supplied to the editor:

* For [classic editor](#!/guide/dev_framed) it can be done by defining additional styles in the stylesheets loaded by the editor. The same styles must be provided on the target page where the content will be loaded.
* For [inline editor](#!/guide/dev_inline) the styles can be defined directly with `<style> ... <style>` or `<link href="..." rel="stylesheet">`, i.e. within the `<head>` section of the page.

See the following [showcase](https://sdk.ckeditor.com/samples/styles.html#widget-styles) of captioned image styling and alignment done through classes.

## Making Alternative Text Mandatory

Since CKEditor 4.6 it is possible to make setting alternative text for captioned images obligatory for the users. This helps increase image [accessibility](#!/guide/dev_a11y) and is required by several accessibility standards.

To make alternative text mandatory, set the CKEDITOR.config.image2_altRequired configuration option:

    config.image2_altRequired = true;

{@img captionedimage_03.png Alternative text required by the Enhanced Image dialog}

## Captioned Image Demo

See the [working "Creating Captioned Images" sample](https://sdk.ckeditor.com/samples/captionedimage.html) that showcases the Enhanced Image plugin with its captioning, "drag and drop" positioning, and "click and drag" resizing.
