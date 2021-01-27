---
category: integration
order: 10
url: guide/dev_integration
menu-title: Introduction
meta-title-short: Introduction
---
<!--
Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 Integrations

This section presents how you can integrate CKEditor 4 with various frameworks and tools extending its functionality.

## Integrating CKEditor 4 with Other Applications

Read how to integrate CKEditor 4 with the following applications:

* **{@link guide/dev/integration/easyimage/README Easy Image}** &ndash; An optional plugin that lets you {@link features/easyimage/README insert images which are automatically rescaled, optimized, responsive} and delivered through a blazing-fast CDN.
* **{@link guide/dev/integration/spreadsheets/README Spreadsheets}** &ndash; An optional plugin that offers {@link features/spreadsheets/README Excel-like functionality} right inside CKEditor 4.
* **{@link guide/dev/integration/file_browse_upload/README File Manager}** &ndash; Connect a file browser or uploader like [CKFinder](https://ckeditor.com/ckfinder/) or learn how to create a custom solution to unlock image upload capabilities in CKEditor.
* **{@link guide/dev/integration/a11ychecker/custom_issue_types/README Accessibility Checker}** &ndash; An innovative solution that lets you {@link features/accessibility_checker/README inspect the accessibility level of content} created in CKEditor and immediately solve any accessibility issues that are found.

## Integrating CKEditor 4 with JavaScript Frameworks

### Is CKEditor 4 Compatible with Framework XYZ?

Yes. CKEditor 4 is compatible with every JavaScript framework that we have heard of so far. CKEditor 4 is a JavaScript rich text editing component (a pretty complex one but still) and it does not require any uncommon techniques or technologies to be used. Therefore, unless the framework that you use has very not typical limitations, CKEditor 4 is compatible with it.

> How do I use CKEditor 4 with my framework?

While CKEditor 4 is compatible with your framework and initializing it requires a single method call, integrating CKEditor 4 with your framework may require using an existing or writing a new adapter (integration layer) that will communicate your framework with CKEditor 4.

When checking how to integrate CKEditor 4 with your framework you can follow these steps:

1. **Check whether an [official integration](#official-wysiwyg-editor-integrations) exists.**

	There are four official integrations so far: for {@link guide/dev/integration/react/README React}, {@link guide/dev/integration/angular/README Angular}, {@link guide/dev/integration/vue/README Vue.js} and {@link guide/dev/integration/jquery/README jQuery}.

2. **If not, search for community-driven integrations.** Most of them are available on [npm](https://www.npmjs.com/).
3. **If none exists, integrate CKEditor 4 with your framework by yourself and share it with the world!**

### Official WYSIWYG Editor Integrations

There are four official integrations so far:

* **{@link guide/dev/integration/angular/README CKEditor 4 WYSIWYG editor for Angular}**
* **{@link guide/dev/integration/react/README CKEditor 4 WYSIWYG editor for React}**
* **{@link guide/dev/integration/vue/README CKEditor 4 WYSIWYG editor for Vue.js}**
* **{@link guide/dev/integration/jquery/README CKEditor 4 WYSIWYG editor for jQuery}**

Refer to their documentation to learn how to use them.

We plan to provide more integrations with time. We would like to [hear your ideas](https://github.com/ckeditor/ckeditor4/issues/3114) what we should work on next.

### Compatibility with Electron

CKEditor 4 is compatible with Electron. Using CKEditor 4 in Electron applications does not require any additional steps.

## Integrating CKEditor 4 with Module Bundlers

Follow the documentation to learn how to **{@link guide/dev/integration/webpack/README integrate CKEditor 4 with webpack}**.
