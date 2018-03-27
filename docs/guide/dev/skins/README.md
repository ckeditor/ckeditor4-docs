---
category: installing-components
order: 40
url: guide/dev_skins
menu-title: Installing Skins
meta-title-short: Installing Skins
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Installing Skins

The look and feel of the CKEditor user interface can be adjusted to your taste and customized through skins. Elements like the toolbar, dialog windows, buttons, and even their icons, can be changed to match the style of your website or application.

The default installation of CKEditor comes with the [Moono-Lisa skin](https://ckeditor.com/cke4/addon/moono-lisa).

## Where to Look for Skins?

The [CKEditor Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all) is an online service designed to find and share editor plugins and skins. Its structure, with comprehensive descriptions and screenshots, makes it easy to understand the skin features and the comment system lets you socialize with the CKEditor community or provide instant feedback. If you are a skin designer, the repository is also the best place to showcase your skills and reach a large user base.

## Online Builder Installation

If you found an interesting skin in the Add-ons Repository, you can easily add it to your custom build.

### Through Online Builder

The easiest method is to visit the [online builder](https://ckeditor.com/cke4/builder) page and select the skin that you wish to use in the **Available Skins** section.

{@img assets/img/add_skin_ckbuilder_3.png Available Skins lists in online builder}

When you are happy with your configuration, click the **Download** button at the bottom of the online builder page to download your custom build with the selected skin included.

When you install your custom build, you will see it uses the skin that you added (in this example: [Kama](https://ckeditor.com/cke4/addon/kama)).

{@img assets/img/add_skin_ckbuilder_4.png A custom CKEditor build using the Kama skin}

### Through Add-on Repository

Visit the skin page in the [Add-ons Repository](https://ckeditor.com/cke4/addons/skins/all) and click the "**Add to my editor**" button.

{@img assets/img/add_plugin_ckbuilder_1.png Adding a skin to the editor build}

When you are ready, click the "**Build my editor**" button on the right to go to online builder. The skin that you have just added will be listed as a part of your custom build.

{@img assets/img/add_skin_ckbuilder_2.png Building a custom CKEditor version}

You can fine-tune your build in online builder and when you are happy with your configuration, click the **Download** button at the bottom of the online builder page to download your custom build with the selected skin included.

## Installing Skins Manually

Using online builder is a recommended solution, however, if you have skins developed by yourself or by third parties, you can add skins to your local installation manually by following the steps described below:

1. **Extract** the skin `.zip` archive.

2. **Copy** the skin files to the `skins` folder of your CKEditor installation. Each skin must be placed in a sub-folder that matches its "technical" name.

	For example, the [Kama skin](https://ckeditor.com/cke4/addon/kama) would be installed into this folder: `<CKEditor folder="">/skins/kama`.

3. **Enable the skin.** Use the {@linkapi CKEDITOR.config#skin skin} setting to add the skin to your confiuration:

		config.skin = 'kama';

Your skin will now be available in your CKEditor installation.

<info-box hint="">
    To avoid the manual installation process <a href="https://ckeditor.com/cke4/add/skin">submit your skins to the Add-ons Repository</a> and encourage third-party developers to do so. In this way you will be able to both give something to the community and get valuable feedback on your work.
</info-box>
