---
category: ckeditor-4-widget-sdk
order: 20
url: guide/widget_sdk_intro
menu-title: Introduction
meta-title-short: Introduction
---
<!--
Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Widget SDK Introduction

The aim of this SDK is to show you how to create a basic CKEditor widget.

<info-box info=""> This feature was introduced in <strong>CKEditor 4.3</strong>. It is provided through an optional plugin that is not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/widget_installation/README needs to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

## What is a Widget?

Widgets are **special rich content units** in that they are **groups of elements** which are **treated as a single entity** inside the editor.

Once developed, their structure (but not necessarily their content) is immutable and enforced by the CKEditor instance they are used in. These entities can thus be selected and deleted or moved freely as a whole around the editing area, keeping their predefined structure intact. At the same time all the individual parts of the widget (its "building blocks") can be edited or configured separately, again, without affecting the whole widget entity and its structure in the process.

Read more about widgets in the general {@link guide/dev/deep_dive/widgets/README Introduction to Widgets} article.

## Technical Background

Technically, **each widget is defined in a CKEditor plugin that uses the features provided by the generic [Widget plugin](https://ckeditor.com/cke4/addon/widget)**. Owing to this, widget plugins have a structure very similar to that of standard editor plugins, can be made available in [CKEditor Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all), and can be added to your editor installation as described in the {@link guide/dev/widget_installation/README Widget Installation} article.

## Developing a Custom Widget

Learning by example is always the best idea, so check our **widget tutorials** that will show you how to create a basic Simple Box widget.

 1. **{@link guide/widget_sdk/tutorial_1/README Part 1}** &ndash; Develop a **basic template widget** that lets the user insert a simple box with a title and comment fields into the document.
 2. **{@link guide/widget_sdk/tutorial_2/README Part 2}** &ndash; Modify the simple box widget by adding a **widget dialog window with widget editing capabilities**.
 3. **{@linkexample simplebox Demo}** &ndash; See the **working demo** of the custom widget created in the tutorials live in action in CKEditor 4 Examples.
