<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Spell Checking

<p class="requirements">
	The out-of-the-box spell checking functionality is provided through plugins that are included in the Standard and Full presets available from the official CKEditor <a href="http://ckeditor.com/download">Download</a> site. You can also <a href="#!/guide/dev_plugins">add them to your custom build</a> with <a href="http://ckeditor.com/builder">CKBuilder</a>.
</p>

CKEditor can be configured to use either native spell checking capabilities provided by the browser or to use an external spell checking web service.

## Native Browser Spell Checker

By default, browser native spell check functionality is disabled in the editor. Use the CKEDITOR.config.disableNativeSpellChecker configuration option to enable it:

	config.disableNativeSpellChecker = false;

After reloading the editor you should be able to see the spelling corrections underlined in your editor content. 

**Note**: If the [Context Menu](http://ckeditor.com/addon/contextmenu) plugin is enabled, it is necessary to hold the <kbd>Ctrl</kbd> key when right-clicking misspelled words to see their suggestions.

**Note**: The spell check functionality is not available natively for all browsers.

## Spell Check As You Type (SCAYT)

The [SpellCheckAsYouType (SCAYT)](http://ckeditor.com/addon/scayt) plugin provides inline spell checking, much like the native browser spell checker, well integrated with the CKEditor context menu.

It is provided by [WebSpellChecker.net](http://www.webspellchecker.net/). It uses the WebSpellChecker.net web services, transferring the text to their servers and performing spell checking. This is a cross-browser solution.

{@img scayt_02.png}

## Spell Checking in a Dialog Window

The [WebSpellChecker](http://ckeditor.com/addon/wsc) plugin is another spell checking solution provided by [WebSpellChecker.net](http://www.webspellchecker.net/). It runs the check through a dialog window instead of marking misspelled words inline. Additionally, for some languages a Grammar Checker and Thesaurus feature is also available.

{@img wsc_01.png}

## Customization Options

Both plugins include numerous configuration options that let you customize the default spell checking
language, number of SCAYT suggestions available or the content of the spell checker context menu and dialog window.
You can find them on the CKEDITOR.config page, starting from `scayt_` and `wsc_`.

<p class="tip">
	The out-of-the-box spell checking functionality is ad-supported. If you want to remove the
	ads, you can <a href="http://cksource.com/ckeditor/services#spellCheck">purchase a license here</a>.
</dp>

## Spell Checking Demo 

See the [working "Spell Checker and Spell Check As You Type" sample](http://sdk.ckeditor.com/samples/spellchecker.html) that showcases both Spell Check As You Type and spell checking in a dialog window.
