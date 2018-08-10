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

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.9</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site. Follow the {@link guide/dev/integration/easyimage/README Easy Image Integration} guide to enable it.
</info-box>

The optional [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin lets you insert images which are **automatically rescaled**, **optimized**, **responsive** and delivered through a **blazing-fast CDN**. It introduces a new type of a captioned image widget that has the following capabilities:

*  It allows for **uploading images** to [CKEditor Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) with a customizable upload progress indication.
*  It allows for adding **image captions** (that will not be separated from the image when its position changes).
*  It has {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the image and its caption as one entity** and select, delete, or move it in the editor content area as a whole.
*  It supports **drag and drop** for changing the image position.
*  It provides **image alignment** options through the balloon toolbar attached to the widget as well as the context menu.
*  It allows for applying **custom styles** to the image by customizing the balloon toolbar and context menu items.
*  It allows for changing **alternative text** for the image.

Below you can see an image inserted into the editor content with Easy Image. When you hover it with your mouse, the editable areas (the image and its caption) become outlined.

{@img assets/img/easyimage_01.png Easy Image in the editor content}

You can find some additional information about the Easy Image service in the [Cloud Services - Easy Image Overview](https://docs.ckeditor.com/cs/latest/guides/overview.html#easy-image) guide.

## Custom Styles with Classes

The appearance of images inserted with Easy Image can be easily altered by using custom styles. These styles can be applied through the {@link guide/dev/features/balloontoolbar/README balloon toolbar} connected with every Easy Image widget or with the context menu. By default there are two styles available:

*  Full Size Image &ndash; It stretches the image to 100% of the editor width.
*  Side Image &ndash; It changes the image width to 50% of the editor width and puts it aside, on the right.

The list of enabled styles can be changed by the editor's implementer.

{@img assets/img/easyimage_02.png Easy Image styles in the balloon toolbar and context menu}

## Changing Alternative Text

Easy Image allows for changing the default alternative text for the image. Providing a good alternative text for an image is one of the fundamental {@link guide/dev/a11y/README accessibility techniques}, being one of {@link guide/dev/wcag/README#text-alternative success criteria of the WCAG 2.0 standard}.

{@img assets/img/easyimage_03.png Alternative text set in the Easy Image plugin}

## Easy Image Demo

See the {@linksdk easyimage working "Easy Image Plugin" sample} that showcases the Easy Image plugin with its uploading, captioning and custom styles.

## Related Features

Refer to the following resources for more information about image support:

* {@link guide/dev/features/image/README Default Image Plugin} offers pixel-perfect image alignment with vertical and horizotal whitespace, configurable image border and file manager integration.
* {@link guide/dev/features/image2/README Enhanced Image} offers a clean UI with image captions, drag and drop positioning, click and drag resizing and file manager integration.
* {@link guide/dev/integration/easyimage/README Easy Image Integration} explains how to enable the cloud services provider for Easy Image as well as how to customize some of its features.
