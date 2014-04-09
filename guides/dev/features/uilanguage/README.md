# Adjusting CKEditor UI Language

CKEditor is translated into over 60 languages and by default, it is displayed in the user's language (as set in the browser or operating system settings). If the matching language version is not available, the editor user interface will be displayed in the default language version (most commonly: English).

<p class="tip">
    Please note that CKEditor localizations are mostly provided by our awesome community through the <a href="https://www.transifex.com/projects/p/ckeditor/">CKEditor UI Translation Center</a>, so if you would like to help with translating CKEditor into your native language or correct an existing localization, do not hesitate to join us!
</p>

## Setting the Default Language

The website developer can set the default language that will be used for CKEditor UI if the user's language is not available. English is the default setting here, but you can adjust this to your needs by modifying the [config.defaultLanguage](#!/api/CKEDITOR.config-cfg-defaultLanguage) configuration option.

For example, if your website is targeted at the German audience, you may want to set the default CKEditor UI language to German, too:

    config.defaultLanguage = 'de';

This will cause CKEditor to be displayed in German to all users for whom a matching localization cannot be found.

{@img uilanguage_01.png}

## Overriding User Language Settings

The developer is also able to force CKEditor to always use just one pre-defined UI localization. This will mean that no matter what locale settings the user browsers and operating systems use, CKEditor will always be displayed in the language set by the developer.

This feature may come in handy for all homogeneous environments where the entire user base speaks the same language. The developer will then be able to create a [custom build](http://ckeditor.com/builder) stripped of all redundant language files except for the desired localization.

If you want to define the language that will override all user settings, use the [config.language](#!/api/CKEDITOR.config-cfg-language) configuration setting.

For example, if your website is in German and you want to display the German language version of the CKEditor UI to all your visitors (no matter what their locale settings are), use the following setting:

    config.language = 'de';

This will cause CKEditor interface to be displayed in German to all users, overriding their browser-stored preferences.

## UI Languages Demo

See also the [working UI Languages sample](../samples/uilanguages.html) that showcases all available CKEditor user interface localizations and includes a simple script that lets the user choose a different language version.