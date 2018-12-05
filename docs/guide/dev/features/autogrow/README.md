---
category: editor-resizing
order: 40
url: guide/dev_autogrow
menu-title: Editor Auto Grow
meta-title-short: Editor Auto Grow
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Automatic Editor Height Adjustment to Content

<info-box info="">
 This feature is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Auto Grow](https://ckeditor.com/cke4/addon/autogrow) plugin makes it possible to configure CKEditor to automatically expand and shrink vertically depending on the amount and size of content entered in its editing area.

## Minimum and Maximum Height

It is possible to fine-tune the automatic editor height adjustment by setting the minimum and maximum height that the editor will shrink and expand to, respectively.

* The {@linkapi CKEDITOR.config.autoGrow_minHeight CKEDITOR.config.autoGrow_minHeight} option defines the minimum height that the editor will always assume, no matter how much content it includes.
* The {@linkapi CKEDITOR.config.autoGrow_maxHeight CKEDITOR.config.autoGrow_maxHeight} option can be set in order to prevent the situation where huge amounts of content will cause the editor to expand infinitely.

In the following example the editor will grow and shrink with the amount of content, but it will always be at least 250 pixels high and will never exceed the height of 600 pixels:

    config.extraPlugins = 'autogrow';
    config.autoGrow_minHeight = 250;
    config.autoGrow_maxHeight = 600;

With just two short paragraphs of content the editor will assume the defined minimum auto grow height of 250 pixels, as visible below.

{@img assets/img/autogrow_01.png}

When you continue adding more text, the editor will start to expand to match the content.

{@img assets/img/autogrow_02.png}

When even more content is added, the editor will expand until it reaches the height of 600 pixels, which is the value set for the maximum auto grow height. For longer content scrollbars will appear.

{@img assets/img/autogrow_03.png}

At the same time, when you start deleting the content that you have just entered, you will see that the editor starts shrinking until it reaches the defined minimum auto grow height of 250 pixels.

## Height Adjustment on Startup

By default, the editor with the Auto Grow feature enabled will adjust its height once it gets into focus, so the page that includes it will be partly redrawn. You can, however, prevent this behavior by using the {@linkapi CKEDITOR.config.autoGrow_onStartup CKEDITOR.config.autoGrow_onStartup} option to make the editor grow the moment it is created, i.e. on page startup.

    config.autoGrow_onStartup = true;

This will ensure no page redrawing will be needed &mdash; until you start modifying the content.

## Stylistic Fine-tuning

An additional {@linkapi CKEDITOR.config.autoGrow_bottomSpace CKEDITOR.config.autoGrow_bottomSpace} option lets you insert some extra space that will always be added between the content and the editor bottom bar. For example, you can set it to 50 pixels in order to prevent the editor from looking too cramped.

```js
config.autoGrow_bottomSpace = 50;
```

With this setting in place, the 50-pixel-high space below the content will always be preserved. This is visible in the sample as well as the second image above.

## Auto Grow Demo

See the {@linksdk autogrow working "Automatic Editor Height Adjustment to Content" sample} that shows how the editor can automatically expand and shrink vertically to fit the content.

## Related Features

Refer to the following resources for more information about editor resizing:

* The {@link guide/dev/features/size/README Setting Editor Size} article explains how to set the editor width and height.
* The {@link guide/dev/features/resize/README Editor Resizing Customization} article explains a number of options for classic editor resizing, including resizing the editor on the fly.
