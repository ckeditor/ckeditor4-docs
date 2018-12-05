---
category: inserting-images
order: 20
url: guide/dev_image
menu-title: Default Image Plugin
meta-title-short: Default Image Plugin
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Default Image Plugin

<info-box info="">
    By default the image feature is provided through the <a href="https://ckeditor.com/cke4/addon/image">Image</a> plugin that is included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The default [Image](https://ckeditor.com/cke4/addon/image) plugin supports inserting images into the editor content. It provides the following features when compared to two alternative image plugins, {@link guide/dev/features/image2/README Enhanced Image} and {@link guide/dev/features/easyimage/README Easy Image}:

* It allows for **pixel-perfect alignment** of images inside the editor content by setting horizontal and vertical whitespace.
* It supports **left and right image alignment** as well as setting **image border**.
* It provides **image preview**.
* It supports **adding links to images** through the dedicated Link tab directly in the Image Properties dialog.
* It can be integrated with a **file manager** of your choice such as [CKFinder](https://ckeditor.com/ckeditor-4/ckfinder/) for image upload and storage support.

<info-box info="">
    If you are looking for more modern image support with a clean UI and features such as image captions, drag and drop positioning, click and drag resizing, image alignment (including centering) with inline styles or CSS classes, custom image styles or cloud storage support with optimized images and responsive markup, try {@link guide/dev/features/image2/README Enhanced Image} and {@link guide/dev/features/easyimage/README Easy Image} plugins.
</info-box>

Below you can see a document with an image inserted into the editor content with the default Image plugin.

{@img assets/img/image_01.png Images inserted into CKEditor content with the Image plugin}

## File Manager Integration

The Image plugin can be {@link guide/dev/integration/file_browse_upload/README integrated with a file browser} like [CKFinder](https://ckeditor.com/ckeditor-4/ckfinder/). Thanks to this you will be able to upload your images to the server or browse the server for images to be inserted into the editor content.

Below you can see the plugin's Image Properties dialog window with the file browser integrated. The Browse Server button as well as the Upload tab will appear.

{@img assets/img/image_02.png File manager integrated with the Image Properties dialog}

## Image Plugin Demo

See the {@linksdk image working "Default Image Plugin" sample} that showcases the Image plugin with all its capabilities.

## Related Features

Refer to the following resources for more information about image support and upload:

* {@link guide/dev/features/image2/README Enhanced Image} offers a clean UI with image captions, drag and drop positioning, click and drag resizing and file manager integration.
* {@link guide/dev/features/easyimage/README Easy Image} lets you insert images which are automatically rescaled, optimized, responsive and delivered through a blazing-fast CDN.
* {@link guide/dev/integration/file_browse_upload/README File Manager Integration} explains how to enable image upload.
