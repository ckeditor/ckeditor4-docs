# Spell Checking

CKEditor can be configured to use either native spell checking capabilities provided by the browser or to use an external spell checking web service.

## The Native Spell Checker

Native spell check functionality is by default disabled in the editor, use
{@link CKEDITOR.config#disableNativeSpellChecker disableNativeSpellChecker} to enable it:

	config.disableNativeSpellChecker = false;

You should be able to see the spelling underline in content after reloading the editor.

**Note**: If the context menu plugin is enabled, its necessary to hold the CTRL key when right-clicking misspelled words to see their suggestions.

**Note**: The spell check is not generically available for all browsers.

## The **SpellCheckAsYouType** Plugin

The [SpellCheckAsYouType (SCAYT)](http://ckeditor.com/addon/scayt) plugin provides inline spell checking, much like the native spell checker, well integrated with the CKEditor context menu. 

It is provided by [WebSpellChecker.net](http://www.webspellchecker.net/). It users their web-services, transferring the text to their servers and performing spell checking. This is a cross browser solution.

## The **WebSpellChecker** Plugin

The [WebSpellChecker](http://ckeditor.com/addon/wsc) plugin is another spell checking solution provided by [WebSpellChecker.net](http://www.webspellchecker.net/) that instead runs the check through a dialog windows, instead of marking misspelled words inline.