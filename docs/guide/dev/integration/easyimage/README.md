---
category: integration
order: 20
url: guide/dev_easyimage_integration
menu-title: Easy Image
meta-title-short: Easy Image
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Easy Image Integration

## Quick start

### Download CKEditor with Easy Image plugin

Currently the Easy Image plugin is **not** included in the CKEditor 4 presets. You {@link guide/dev/widget_installation/README need to add it to your custom CKEditor build} with [CKBuilder](https://ckeditor.com/cke4/builder). Additionally, you need to remove the default [Image](https://ckeditor.com/cke4/addon/image) plugin from your editor, either with CKBuilder or through the {@linkapi CKEDITOR.config.removePlugins configuration}:

```
config.removePlugins = 'image';
```

To help you in getting started, you can find below direct links to the online builder with Easy Image already included (and the default Image plugin removed):

 * [CKBuilder – Standard preset with Easy Image](https://ckeditor.com/cke4/builder)
 * [CKBuilder – Full preset with Easy Image](https://ckeditor.com/cke4/builder)

### Sign up to CKEditor Cloud Services (Easy Image)

Follow the [Cloud Services - Quick start](https://docs.ckeditor.com/cs/latest/guides/quick-start.html) guide to setup an account.

### Configure CKEditor

After setting an account and following the previous instruction, you should be ready to configure the editor and set two required configuration options:

* {@linkapi CKEDITOR.config.cloudServices_uploadUrl}
* {@linkapi CKEDITOR.config.cloudServices_tokenUrl}

```
CKEDITOR.replace( 'editor', {
    extraPlugins: 'easyimage',
    removePlugins: 'image',
    cloudServices_tokenUrl: 'https://example.com/cs-token-endpoint',
    cloudServices_uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
} );
```

The values of `cloudServices_uploadUrl` and `cloudServices_tokenUrl` are unique for each website and can be found in the [CKEditor Ecosystem dashboard](https://dashboard.ckeditor.com) (go to *Website management* and press the *CKEditor configuration* button).

This is all. If you're having troubles in setting up Easy Image, please [contact us](https://ckeditor.com/contact/).

## Customizing Easy Image

### Custom Styles with Classes

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
  <img alt="Three Monks walking on ancient temple." width="820" srcset="[…]" sizes="100vw" src="https://33333.cdn.cke-cs.com/0fNqCUeBSal4ENvGfd7K/images/80b10f36950c55c6bb4c515f10546d5a6b413699c520b7d7_umbrellas.jpg" />
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

### Custom Progress Reporters

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

## About Easy Image

For more information about Easy Image check {@link guide/dev/features/easyimage/README Functionality Overview – Easy Image}.
