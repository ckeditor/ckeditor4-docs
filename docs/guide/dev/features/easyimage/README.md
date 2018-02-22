---
category: inserting-images
order: 40
url: guide/dev_easyimage
menu-title: Easy Image
meta-title-short: Easy Image
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Easy Image Plugin

## Functionality overview

<info-box info=""> This feature was introduced in <strong>CKEditor 4.9</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with [CKBuilder](https://ckeditor.com/cke4/builder).</info-box>

The optional [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin introduces a new type of a captioned image widget that has the following capabilities:

*   It allows for **uploading images** to Cloud Services with customizable upload progress indication.
*   It allows for adding **image captions** (that will not be separated from the image when its location changes).
*   It has {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the image and its caption as one entity** and select, delete, or move it in the editor content area as a whole.
*   It supports **drag and drop** for changing the image position.
*   It provides **image alignment** via balloon toolbar attached to the widget and via context menu.
*   It allows for applying **custom styles** to the image by customizing balloon toolbar and context menu items.
*   It allows for changing **alternative text** for the image.

Below you can see an Easy Image inserted into the editor content. When you hover it with your mouse, the editable areas (the image and its caption) become outlined.

{@img assets/img/easyimage_01.png Captioned image}

### Custom styles with Classes

Easy Images's appearance can be easily altered by using custom styles. These styles could be applied via a balloon toolbar connected with every Easy Image widget or via context menu. By default there are two styles available:

*   Full Size Image – it stretches the widget to 100% of editor's width
*   Side Image – it changes Easy Image width to 25% of editor's width and put it aside, on the right

However list of enabled styles could be changed by editor's implementor.

### Changing Alternative Text

By default Easy Image allows also for changing default alternative text for the image. Providing good alternative text for image is one of the fundamental accessibility techniques, even included as one of [success criterions of WCAG 2.0 standard](https://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all).

### Easy Image Demo

See the [working "Creating Easy Image widgets" sample](https://sdk.ckeditor.com/samples/easyimage.html) that showcases the Easy Image plugin with its uploading, captioning and custom styles.

## Integration

### Upload integration

Easy Image uses Cloud Services backend by default, which needs to be configured before usage of Easy Image plugin. To configure Cloud Service provider, please reference to […].

### Responsiveness

Output produced by Cloud Services is converted to include several versions of the uploaded images, which have different widths and are suitable for different types of devices. It's done via `[srcset]` attribute for `img` tag and looks similar to the markup presented below:

```html
<figure class="easyimage easyimage-full">
	<img alt="" width="1026" srcset="https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_110 110w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_220 220w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_330 330w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_440 440w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_550 550w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_660 660w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_770 770w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_880 880w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_990 990w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_1026 1026w" sizes="100vw" src="https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png" />
	<figcaption>My caption</figcaption>
</figure>
```

### Custom styles with Classes

Easy Images's appearance can be easily altered by using custom styles. These styles could be applied via a balloon toolbar connected with every Easy Image widget or via context menu. By default there are two styles available:

*   Full Size Image – it stretches the widget to 100% of editor's width
*   Side Image – it changes Easy Image width to 25% of editor's width and put it aside, on the right

There are three more, additional styles, that are responsible for aligning image and could be additionally enabled:

*   Left Align
*   Center
*   Right Align

By default all styles are applied via CSS classes and produces markup similar to the on on the following snippet :

```html
<figure class="easyimage easyimage-full">
  <img alt="MyImage" src="%BASE_PATH%/assets/img/myimage.png"/>
  <figcaption></figcaption>
</figure>
```

All styles are customised by the {@linkapi CKEDITOR.config.easyimage_styles} option, which takes takes object with styles definitions.

For example, the following configuration:

```javascript
config.easyimage_styles = {
	full: {
		// Changes just the class name, label icon remains unchanged.
		attributes: {
			'class': 'my-custom-full-class'
		}
	},
	skipBorder: {
		attributes: {
			'class': 'skip-border'
		},
		group: 'borders',
		label: 'Skip border'
	}
};
```

will modify built-in Full Size Image and add new one, `skipBorder`.

Do remember, though, that you need to define the CSS rules for these classes in your stylesheet. Once this configuration option is set, corresponding style definitions must be supplied to the editor:

*   For {@link guide/dev/framed/README classic editor} it can be done by defining additional styles in the stylesheets loaded by the editor. The same styles must be provided on the target page where the content will be loaded.
*   For {@link guide/dev/inline/README inline editor} the styles can be defined directly with `<style> ... <style>` or `<link href="..." rel="stylesheet">`, i.e. within the `<head>` section of the page.

You need also to enable these custom styles to the user by adding them to the Easy Image balloon toolbar via {@linkapi CKEDITOR.config.easyimage_toolbar}. This option will also integrate your styles with context menu.

### Custom Reporters

It also possible to customize upload progress reporters via widget's definition `progressReporterType` property. By default there is only one type of upload progress reporter, progress bar.

You are able to add your own types of upload progress reporters by subclassing {@linkapi CKEDITOR.plugins.imagebase.ProgressReporter} and then using your subclass to modify Easy Image widget definition:

```javascript
config.on = {
	widgetDefinition: function( evt ) {
		if ( evt.data.name === 'easyimage' ) {
			widgetDef.progressReporterType = yourReporterClass;
		}
	}
};
```

## Cloud Services Integration

Cloud Services plugin allows to integrate CKEditor 4 instances with Cloud Services, e.g. Easy Image upload backend. It exports {@linkapi CKEDITOR.plugins.cloudservices.cloudServicesLoader} – class that could be used as a custom file loader in upload widgets, e.g. one implemented as [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) plugin. It's also a default file loader used in [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin.

Cloud Services needs to be configured before use. It can be done by modifying two config options:

*   `cloudServices_url` – URL to Cloud Services upload endpoint; please refer to [official Cloud Services documentation about endpoints](https://docs.ckeditor.com/cs/latest/guides/token-endpoints/tokenendpoint.html).
*   `cloudServices_token` – authorization token needed to use upload endpoint.

For further information about Cloud Services integration, please refer to official Cloud Services documentation.
