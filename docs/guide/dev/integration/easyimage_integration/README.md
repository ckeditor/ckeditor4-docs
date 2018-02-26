---
category: integration
order: 40
url: guide/dev_easyimage_integration
menu-title: Easy Image
meta-title-short: Easy Image
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Easy Image Integration

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.9</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with [CKBuilder](https://ckeditor.com/cke4/builder).
</info-box>

{@link guide/dev/features/easyimage/README Easy Image} guarantees that all images inserted into your content are responsive. With a single image upload, several optimized versions of the image are created after upload by [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/), for different sizes of displays. All this is transparent to the end user who uploaded the image. Rescaled and optimized images are delivered through a blazing-fast CDN.

<img src="https://docs.ckeditor.com/ckeditor5/latest/assets/img/easy-image.png" width="1440" alt="Responsive images with Easy Image.">

The [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin needs to be integrated with a cloud services provider and offers some configuration options to customize aspects such as:

* Balloon toolbar buttons and context menu entries.
* Available image styles.
* Progress reporter.

## Upload Integration

In order to upload images by default the {@link guide/dev/features/easyimage/README Easy Image} feature uses the [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) backend. It needs to be configured before the first usage of the Easy Image plugin.

To set up the cloud services provider, refer to the official [CKEditor Cloud Services documentation](https://docs.ckeditor.com/cs/latest/index.html).

When your CKEditor Cloud Services account is up and running, you need to configure CKEditor to use it as explained in the {@link guide/dev/integration/cloudservices/README CKEditor Cloud Services Integration} article. 

## Responsive Images

Output produced by CKEditor Cloud Services is automatically converted to include several versions of the uploaded images, which have different widths and are suitable for different types of devices. It is handled by the `[srcset]` attribute for the `<img>` element and looks similar to the markup presented below:

```html
<figure class="easyimage easyimage-full">
	<img alt="Developer resting under a palm tree" width="1026" srcset="https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_110 110w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_220 220w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_330 330w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_440 440w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_550 550w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_660 660w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_770 770w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_880 880w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_990 990w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_1026 1026w" sizes="100vw" src="https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png" />
	<figcaption>The best rest is under a palm tree</figcaption>
</figure>
```

## Custom Styles with Classes

The appearance of images inserted with Easy Image can be easily altered by using custom styles defined by the editor implementer. These styles can then be applied by the user through the balloon toolbar connected with every Easy Image widget or with the context menu.

The following styles are available out-of-the-box, with the first two enabled by default:

*  Full Size Image &ndash; It stretches the image to 100% of the editor width.
*  Side Image &ndash; It changes the image width to 25% of the editor width and puts it aside, on the right.
*  Align Left &ndash; Aligns the image to the left.
*  Align Center &ndash; Centers the image.
*  Align Right &ndash; Aligns the image to the right.

By default all styles are applied via CSS classes and produce a markup similar to the one below:

```html
<figure class="easyimage easyimage-full">
  <img alt="MyImage" src="%BASE_PATH%/assets/img/myimage.png"/>
  <figcaption></figcaption>
</figure>
```

The image styles can be defined with the {@linkapi CKEDITOR.config.easyimage_styles} option that accepts an object with style definitions.

For example, the following configuration will modify the built-in Full Size Image (`full`) style and add a new one, Skip Border (`skipBorder`):

```javascript
config.easyimage_styles = {
	full: {
		// Changes just the class name, the label icon remains unchanged.
		attributes: {
			'class': 'my-custom-full-class'
		}
	},
	skipBorder: {
		attributes: {
			'class': 'skip-border'
		},
		group: 'borders',
		label: 'Skip border',
		icon: 'icons/skip-border.png',
		iconHiDpi: 'icons/skip-border.hidpi.png'
	}
};
```

Do remember, though, that you need to define the CSS rules for these classes in your stylesheet. Once this configuration option is set, corresponding style definitions must be supplied to the editor:

*   For {@link guide/dev/framed/README classic editor} it can be done by defining additional styles in the stylesheets loaded by the editor. The same styles must be provided on the target page where the content will be loaded. Alternatively additional stylesheets can be added using {@linkapi CKEDITOR.config.contentsCss}.
*   For {@link guide/dev/inline/README inline editor} the styles can be defined directly with `<style> ... <style>` or `<link href="..." rel="stylesheet">` elements, within the `<head>` section of the page.
* For both types of editors the styles can be defined using {@linkapi CKEDITOR.addCss}.

You also need to enable these custom styles to the user by adding them to the Easy Image balloon toolbar with the {@linkapi CKEDITOR.config.easyimage_toolbar} configuration option. This option will also integrate your styles with the context menu.

## Custom Progress Reporters

It also possible to customize the upload progress reporters through the widget's definition {@linkapi CKEDITOR.plugins.imagebase.featuresDefinitions.upload#progressReporterType} property. By default there is only one type of upload progress reporter available, the progress bar.

You can add your own types of upload progress reporters by subclassing {@linkapi CKEDITOR.plugins.imagebase.progressReporter} and then using your subclass to modify the Easy Image widget definition:

```javascript
config.on = {
	widgetDefinition: function( evt ) {
		if ( evt.data.name === 'easyimage' ) {
			widgetDef.progressReporterType = yourReporterClass;
		}
	}
};
```

## Related Features

Refer to the following resources for more information about Easy Image:

* {@link guide/dev/features/easyimage/README Easy Image} lets you insert images which are automatically rescaled, optimized, responsive and delivered through a blazing-fast CDN.
* {@link guide/dev/integration/cloudservices/README CKEditor Cloud Services Integration} explains how to integrate Easy Image with CKEditor Cloud Services.
