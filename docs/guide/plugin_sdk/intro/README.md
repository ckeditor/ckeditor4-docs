---
category: ckeditor-4-plugin-sdk
order: 20
url: guide/plugin_sdk_intro
menu-title: Introduction
meta-title-short: Introduction
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Plugin SDK Introduction

The aim of this SDK is to show you how to create custom CKEditor plugins.

## What is a Plugin?

Plugins are the most important building blocks of CKEditor. They provide all editor features, including user interface rendering, text manipulation, data input and output, etc. They are built on top of the base which is called the **CKEditor Core**, represented by the {@link api/index CKEditor Core API}.

A huge variety of plugins is provided by both the core CKEditor development team and the CKEditor developers community. The [CKEditor Add-on Repository](https://ckeditor.com/cke4/addons/plugins/all) is the starting point to find and share them. See the {@link guide/dev/plugins/README Installing Plugins} article for more information about how to add additional plugins to create a custom CKEditor build.

## Developing Custom Plugins

Learning by example is always the best idea, so check our **plugin tutorials** that will show you how to create some basic plugins.

 1. **{@link guide/plugin_sdk/sample/README Creating a CKEditor Plugin in 20 Lines of Code}** &ndash; Create your first CKEditor plugin that inserts a piece of HTML code into the document.
 1. **{@link guide/plugin_sdk/sample_1/README Simple Plugin, Part 1}** &ndash; Develop a basic Abbreviation plugin with a dialog window that lets the user insert a an abbreviation element into the document.
 1. **{@link guide/plugin_sdk/sample_2/README Simple Plugin, Part 2}** &ndash; Modify the Abbreviation plugin by adding a custom context menu and abbreviation editing capabilities.
 1. **{@link guide/plugin_sdk/integration_with_acf/README Integrating Plugins with Advanced Content Filter}** &ndash; Learn how to implement Advanced Content Filter support in your plugins.
 1. **{@link guide/plugin_sdk/styles/README Plugin Stylesheets}** &ndash; Tips on how to integrate custom plugin stylesheets with CKEditor.
 1. **{@linkapi CKEDITOR.pluginDefinition Plugin Definition API}** &ndash; Detailed description of the plugin definition.
 1. **Live Demos** &ndash; See the **working demos** of the custom {@linksdk timestamp Timestamp} and {@linksdk abbr Abbreviation} plugins created in the tutorials live in action in CKEditor SDK.
