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

## Upload integration

Easy Image uses [Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) backend by default, which needs to be configured before usage of Easy Image plugin. To configure Cloud Service provider, please refer to official [Cloud Services documentation](https://docs.ckeditor.com/cs/latest/index.html).

## Responsiveness

Output produced by Cloud Services is converted to include several versions of the uploaded images, which have different widths and are suitable for different types of devices. It's handled by `[srcset]` attribute for `img` tag and looks similar to the markup presented below:

```html
<figure class="easyimage easyimage-full">
	<img alt="" width="1026" srcset="https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_110 110w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_220 220w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_330 330w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_440 440w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_550 550w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_660 660w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_770 770w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_880 880w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_990 990w, https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png/w_1026 1026w" sizes="100vw" src="https://cdn.cke-cs.com/f0pqzdtf0yRhaX1FymZU/images/b21777b6cdb9359c2ad629a79878c2a643a958964d0096de_photo.png" />
	<figcaption>My caption</figcaption>
</figure>
```

## Custom styles with Classes

Easy Images's appearance can be easily altered by using custom styles. These styles could be applied via a balloon toolbar connected with every Easy Image widget or via context menu. By default there are two styles available:

*   Full Size Image – it stretches the widget to 100% of editor's width
*   Side Image – it changes Easy Image width to 25% of editor's width and put it aside, on the right

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
		label: 'Skip border',
		icon: 'icons/skip-border.png',
		iconHiDpi: 'icons/skip-border.hidpi.png'
	}
};
```

will modify built-in Full Size Image and add new one, `skipBorder`.

Do remember, though, that you need to define the CSS rules for these classes in your stylesheet. Once this configuration option is set, corresponding style definitions must be supplied to the editor:

*   For {@link guide/dev/framed/README classic editor} it can be done by defining additional styles in the stylesheets loaded by the editor. The same styles must be provided on the target page where the content will be loaded. Alternatively additional stylesheets could be added using {@linkapi CKEDITOR.config.contentsCss}.
*   For {@link guide/dev/inline/README inline editor} the styles can be defined directly with `<style> ... <style>` or `<link href="..." rel="stylesheet">`, i.e. within the `<head>` section of the page.
* For both types of editors the styles can be defined using {@linkapi CKEDITOR.addCss}.

You need also to enable these custom styles to the user by adding them to the Easy Image balloon toolbar via {@linkapi CKEDITOR.config.easyimage_toolbar}. This option will also integrate your styles with context menu.

## Custom Reporters

It also possible to customize upload progress reporters via widget's definition {@linkapi CKEDITOR.plugins.imagebase.featuresDefinitions.upload#progressReporterType} property. By default there is only one type of upload progress reporter, progress bar.

You are able to add your own types of upload progress reporters by subclassing {@linkapi CKEDITOR.plugins.imagebase.progressReporter} and then using your subclass to modify Easy Image widget definition:

```javascript
config.on = {
	widgetDefinition: function( evt ) {
		if ( evt.data.name === 'easyimage' ) {
			widgetDef.progressReporterType = yourReporterClass;
		}
	}
};
```
