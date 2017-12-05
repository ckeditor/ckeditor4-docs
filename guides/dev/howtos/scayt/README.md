<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Spell Checker and Spell Check As You Type (SCAYT)

The following article contains tips about customizing the spell checker behavior in CKEditor. Please refer to the [Spell Checking](#!/guide/dev_spellcheck) article for more information about the spell checker.


## How Do I Set SCAYT to Turn On Automatically?

If you want to turn on the [Spell Check As You Type (SCAYT)](#!/guide/dev_spellcheck-section-spell-check-as-you-type-%28scayt%29) feature in CKEditor by default, set the CKEDITOR.config#scayt_autoStartup configuration setting to `true`.

	config.scayt_autoStartup = true;


## How Do I Disable SCAYT in CKEditor?

If you want to completely disable the [Spell Check As You Type (SCAYT)](#!/guide/dev_spellcheck-section-spell-check-as-you-type-%28scayt%29) feature in CKEditor, remove the [SpellCheckAsYouType (SCAYT)](https://ckeditor.com/cke4/addon/scayt) from your CKEditor build with CKBuilder or alternatively, disable the `scayt` plugin using the CKEDITOR.config#removePlugins configuration setting.

	config.removePlugins = 'scayt';

If you want to leave SCAYT available, but prevent the feature from being turned on automatically on loading the editor, set the CKEDITOR.config#scayt_autoStartup configuration setting to `false`. This is the default value for CKEditor configuration.

	config.scayt_autoStartup = false;


## How Do I Change the Default Language for Spell Check As You Type (SCAYT)?

By default [SCAYT](#!/guide/dev_spellcheck-section-spell-check-as-you-type-%28scayt%29) treats the text written in the editor as American English (`en_US`). If you want to change the default SCAYT language, set the CKEDITOR.config#scayt_sLang configuration option to one of the 16 possible language codes that are currently accepted.

	// Sets SCAYT to French.
	config.scayt_sLang = 'fr_FR';

The following language codes are currently supported by SCAYT: `en_US, en_GB, pt_BR, da_DK, nl_NL, en_CA, fi_FI, fr_FR, fr_CA, de_DE, el_GR, it_IT, nb_NO, pt_PT, es_ES, and sv_SE`. If you enter a language code that is not supported, SCAYT will fall back to the default American English setting.
