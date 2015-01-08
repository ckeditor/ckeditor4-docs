<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Plugin SDK Introduction

The aim of this SDK is to show you how to create custom CKEditor plugins.

## What is a Plugin?

Plugins are the most important building blocks of CKEditor. They provide all editor features, including user interface rendering, text manipulation, data input and output, etc. They are built on top of the base which is called the **CKEditor Core**, represented the [CKEditor Core API](#!/api).

A huge variety of plugins is provided by both the core CKEditor development team and the CKEditor developers community. The [CKEditor Add-on Repository](http://ckeditor.com/addons/plugins) is the starting point to find and share them. See the [Installing Plugins](#!/guide/dev_plugins) article for more information about how to add additional plugins to create a custom CKEditor build.

## Developing Custom Plugins

Learning by example is always the best idea, so check our **plugin tutorials** that will show you how to create some basic plugins.

 1. **[Creating a CKEditor Plugin in 20 Lines of Code](#!/guide/plugin_sdk_sample)** &ndash; Create your first CKEditor plugin that inserts a piece of HTML code into the document.
 1. **[Simple Plugin, Part 1](#!/guide/plugin_sdk_sample_1)** &ndash; Develop a basic Abbreviation plugin with a dialog window that lets the user insert a an abbreviation element into the document.
 1. **[Simple Plugin, Part 2](#!/guide/plugin_sdk_sample_2)** &ndash; Modify the Abbreviation plugin by adding a custom context menu and abbreviation editing capabilities.
 1. **[Integrating Plugins with Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf)** &ndash; Learn how to implement Advanced Content Filter support in your plugins.
 1. **[Plugin Stylesheets](#!/guide/plugin_sdk_styles)** &ndash; Tips on how to integrate custom plugin stylesheets with CKEditor.
 1. **[Plugin Definition API](#!/api/CKEDITOR.pluginDefinition)** &ndash; Detailed description of the plugin definition.
 1. **Live Demos** &ndash; See the **working demos** of the custom [Timestamp](http://sdk.ckeditor.com/samples/timestamp.html) and [Abbreviation](http://sdk.ckeditor.com/samples/abbr.html) plugins created in the tutorials live in action in CKEditor SDK.
