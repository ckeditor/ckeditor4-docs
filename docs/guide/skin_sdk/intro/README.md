---
category: ckeditor-4-skin-sdk
order: 20
url: guide/skin_sdk_intro
menu-title: Introduction
meta-title-short: Introduction
---
<!--
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Introduction

## What is a Skin?

A skin is an add-on for CKEditor 4 that makes it possible to change the look and feel of its user interface (UI). Several aspects of the UI can be customized by a skin, including colors, fonts, sizes, styles and icons.

## The "Moono-Lisa" Skin

[Moono-Lisa](https://ckeditor.com/cke4/addon/moono-lisa) is the default skin of CKEditor 4. It is the one included in the standard CKEditor 4 distributions. It is actively maintained by the CKEditor core developers and should be used as the starting point for the creation and maintenance of custom skins.

## The Anatomy of a Skin

A skin is, technically speaking, represented by a set of files, grouped inside a directory.

When CKEditor 4 is used into a website, the following skin files are loaded in the page:

* **skin.js**: registers the skin and makes it possible to optionally use some special skin features.
* **editor.css**: contains the CSS styles used by the main editor interface.
* **dialog.css**: loaded on demand, when a dialog is opened. Contains dialog specific CSS styles.

Actually, the above are the minimum set of files to be downloaded, but generally several other files are used, to make the skin easier to maintain and more logically organized.

In this document, we'll not go on depth details about the files contents. For that, you should check the files available on the “Moono-Lisa” skin. All files are well documented and are very self-descriptive.
