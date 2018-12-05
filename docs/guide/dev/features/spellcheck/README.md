---
category: working-with-document
order: 20
url: guide/dev_spellcheck
menu-title: Spell Checking
meta-title-short: Spell Checking
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Spell Checking

<info-box info="">
    The out-of-the-box spell checking functionality is provided through plugins that are included in the Standard and Full presets available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add them to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

CKEditor can be configured to use either native spell checking capabilities provided by the browser or to use an external spell checking web service.

## Native Browser Spell Checker

By default, browser native spell check functionality is disabled in the editor. Use the {@linkapi CKEDITOR.config.disableNativeSpellChecker CKEDITOR.config.disableNativeSpellChecker} configuration option to enable it:

```js
config.disableNativeSpellChecker = false;
```

After reloading the editor you should be able to see the spelling corrections underlined in your editor content.

**Note**: If the [Context Menu](https://ckeditor.com/cke4/addon/contextmenu) plugin is enabled, it is necessary to hold the <kbd>Ctrl</kbd> key when right-clicking misspelled words to see their suggestions.

**Note**: The spell check functionality is not available natively for all browsers.

## Spell Check As You Type (SCAYT)

The [SpellCheckAsYouType (SCAYT)](https://ckeditor.com/cke4/addon/scayt) plugin provides inline spell checking, much like the native browser spell checker, well integrated with the CKEditor context menu.

It is provided by [WebSpellChecker.net](http://www.webspellchecker.net/). It uses the WebSpellChecker.net web services, transferring the text to their servers and performing spell checking. This is a cross-browser solution.

{@img assets/img/scayt_02.png Spell Check As You Type in CKEditor}

## Spell Checking in a Dialog Window

The [WebSpellChecker](https://ckeditor.com/cke4/addon/wsc) plugin is another spell checking solution provided by [WebSpellChecker.net](http://www.webspellchecker.net/). It runs the check through a dialog window instead of marking misspelled words inline. Additionally, for some languages a Grammar Checker and Thesaurus feature is also available.

{@img assets/img/wsc_01.png Spell Checker in the dialog window in CKEditor}

## Customization Options

Both plugins include numerous configuration options that let you customize the default spell checking
language, number of SCAYT suggestions available or the content of the spell checker context menu and dialog window.
You can find them on the {@linkapi CKEDITOR.config CKEDITOR.config} page, starting from `scayt_` and `wsc_`.

<info-box hint="">
    The out-of-the-box spell checking functionality is ad-supported. If you want to remove the ads, you can <a href="https://ckeditor.com/contact/">purchase a license here</a>.
</info-box>

## Spell Checking Demo

See the {@linksdk spellchecker working "Spell Checker and Spell Check As You Type" sample} that showcases both Spell Check As You Type and spell checking in a dialog window.
