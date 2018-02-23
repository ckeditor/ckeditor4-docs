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

<info-box info=""> This feature was introduced in <strong>CKEditor 4.9</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the [Download](https://ckeditor.com/ckeditor-4/download/) site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with [CKBuilder](https://ckeditor.com/cke4/builder).</info-box>

The optional [Easy Image](https://ckeditor.com/cke4/addon/easyimage) plugin introduces a new type of a captioned image widget that has the following capabilities:

*   It allows for **uploading images** to [Cloud Services](https://ckeditor.com/ckeditor-cloud-services/) with customizable upload progress indication.
*   It allows for adding **image captions** (that will not be separated from the image when its location changes).
*   It has {@link guide/dev/deep_dive/widgets/README#common-usage-scenarios all advantages of widgets}, i.e. you can **treat the image and its caption as one entity** and select, delete, or move it in the editor content area as a whole.
*   It supports **drag and drop** for changing the image position.
*   It provides **image alignment** via balloon toolbar attached to the widget and via context menu.
*   It allows for applying **custom styles** to the image by customizing balloon toolbar and context menu items.
*   It allows for changing **alternative text** for the image.

Below you can see an Easy Image inserted into the editor content. When you hover it with your mouse, the editable areas (the image and its caption) become outlined.

{@img assets/img/easyimage.png Easy Image}

## Custom styles with Classes

Easy Images's appearance can be easily altered by using custom styles. These styles could be applied via a balloon toolbar connected with every Easy Image widget or via context menu. By default there are two styles available:

*   Full Size Image – it stretches the widget to 100% of editor's width
*   Side Image – it changes Easy Image width to 25% of editor's width and put it aside, on the right

However list of enabled styles could be changed by editor's implementor.

## Changing Alternative Text

Easy Image allows also for changing default alternative text for the image. Providing good alternative text for image is one of the fundamental accessibility techniques, being one of [success criteria of WCAG 2.0 standard](https://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all).

## Easy Image Demo

See the [working "Creating Easy Image widgets" sample](https://sdk.ckeditor.com/samples/easyimage.html) that showcases the Easy Image plugin with its uploading, captioning and custom styles.
