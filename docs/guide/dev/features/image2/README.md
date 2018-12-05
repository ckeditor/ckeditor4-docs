---
category: inserting-images
order: 30
url: guide/dev_image2
menu-title: Enhanced Image
meta-title-short: Enhanced Image
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Enhanced Image Plugin

<info-box info="">
 This feature was introduced in <strong>CKEditor 4.3</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Enhanced Image](https://ckeditor.com/cke4/addon/image2) plugin introduces a new widget type &mdash; a captioned image. It replaces the standard [Image](https://ckeditor.com/cke4/addon/image) plugin with a new captioned image that has the following capabilities:

* It allows for adding **image captions** (that will not be separated from the image when its position changes).
* It has {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the image and its caption as one entity** and select, delete, or move it in the editor content area as a whole.
* It supports **drag and drop** for changing the image position.
* It provides **image alignment**, including centering, with inline styles or CSS classes.
* It includes hassle-free dynamic **"click and drag" resizing**.

Below you can see a captioned image inserted into the editor content with the Enhanced Image plugin. When you hover the image widget with your mouse, the editable areas (the image and its caption) become outlined. The resizing and positioning handles along with their tooltips will appear, too.

{@img assets/img/image2_01.png Enhanced image with a caption inserted into the editor content}

## File Manager Integration

The Enhanced Image plugin can be {@link guide/dev/integration/file_browse_upload/README integrated with a file browser} like [CKFinder](https://ckeditor.com/ckeditor-4/ckfinder/) just like the standard Image plugin. Thanks to this you will be able to upload your images to the server or browse the server for images to be inserted into the editor content.

Below you can see the plugin's Image Properties dialog window with the file browser integrated. The Browse Server button as well as the Upload tab will appear.

{@img assets/img/captionedimage_02.png File manager integrated with the Enhanced Image dialog}

## Image Alignment and Classes

Images inserted with the Enhanced Image plugin can be easily aligned through their Image Properties dialog windows, including centering them in the editor content. By default the alignment is added through inline styles, producing the code like the following example:

``` html
<figure class="image" style="float:right">
    <img alt="MyImage" src="%BASE_PATH%/assets/img/myimage.png"/>
    <figcaption>MyCaption</figcaption>
</figure>
```

Thanks to the {@linkapi CKEDITOR.config.image2_alignClasses CKEDITOR.config.image2_alignClasses} option introduced in CKEditor 4.4 you can use CSS classes for setting image alignment. Additionally, the {@linkapi CKEDITOR.config.image2_captionedClass CKEDITOR.config.image2_captionedClass} option allows you to assign a custom class to the `<figure>` element of a captioned image. Both these options combined give you far better control over the styling process.

For example, the following configuration:

```
config.image2_alignClasses = [ 'image-left', 'image-center', 'image-right' ];
config.image2_captionedClass = 'image-captioned';
```

will produce class-driven, stylable markup that lets you avoid inflexible and non-semantic inline CSS code:

``` html
<figure class="image-captioned image-right">
    <img alt="MyImage" src="%BASE_PATH%/assets/img/myimage.png"/>
    <figcaption>MyCaption</figcaption>
</figure>
```

Do remember, though, that you need to define the CSS rules for these classes in your stylesheet. Once this configuration option is set, corresponding style definitions must be supplied to the editor:

* For {@link guide/dev/framed/README classic editor} it can be done by defining additional styles in the stylesheets loaded by the editor. The same styles must be provided on the target page where the content will be loaded.
* For {@link guide/dev/inline/README inline editor} the styles can be defined directly with `<style> ... <style>` or `<link href="..." rel="stylesheet">`, i.e. within the `<head>` section of the page.

See the following {@linksdk styles#widget-styles showcase} of captioned image styling and alignment done through classes.

## Making Alternative Text Mandatory

Since CKEditor 4.6 it is possible to make setting alternative text for captioned images obligatory for the users. This helps increase image {@link guide/dev/a11y/README accessibility} and is required by several accessibility standards.

To make alternative text mandatory, set the {@linkapi CKEDITOR.config.image2_altRequired CKEDITOR.config.image2_altRequired} configuration option:

```
config.image2_altRequired = true;
```

{@img assets/img/captionedimage_03.png Alternative text required by the Enhanced Image dialog}

## Enhanced Image Plugin Demo

See the {@linksdk image2 working "Enhanced Image Plugin" sample} that showcases the Enhanced Image plugin with its captioning, "drag and drop" positioning, and "click and drag" resizing.

## Related Features

Refer to the following resources for more information about image support:

* {@link guide/dev/features/image/README Default Image Plugin} offers pixel-perfect image alignment with vertical and horizotal whitespace, configurable image border and file manager integration.
* {@link guide/dev/features/easyimage/README Easy Image} lets you insert images which are automatically rescaled, optimized, responsive and delivered through a blazing-fast CDN.
* {@link guide/dev/integration/file_browse_upload/README File Manager Integration} explains how to enable image upload.
