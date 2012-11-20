# Spell Checking

Editor can be configured to use either native spell checking capabilities provided by the browser,
or configured to use an external spell checking web service.

## Use the native spell checker

Native spell check functionality is by default disabled in the editor, use
{@link CKEDITOR.config#disableNativeSpellChecker disableNativeSpellChecker} to enable it:

	config.disableNativeSpellChecker = false;

You should be able to see the spelling underline in content after reloading the editor.


_**Note**: The spell check is not generically available for all browsers._

## Use the **SpellCheckAsYouType** provided by spellchecker.net

The `scayt` plugin is to provide misspellings correction inline, denoted by underlined,
suggestions are provided by the editor context menu.

	config.extraPlugins = 'scayt';

## Use the **WebSpellChecker** provided by spellchecker.net

The `wsc` plugin is to provide spell checking options with an editor dialog window, corrected
text is returned to editor on dialog close. simpling add the plugin to editor to use it:

	config.extraPlugins = 'wsc';
