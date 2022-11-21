---
category: working-with-document
order: 20
url: features/spellcheck
menu-title: Spelling and Grammar Checking
meta-title-short: Spell Checking
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Proofreading, Spelling and Grammar Checking

<info-box info="">
    The out-of-the-box spelling and grammar checking functionality is provided through plugins that are included in the Standard and Full presets available from the official CKEditor 4 <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add them to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

CKEditor 4 can be configured to use either native spell checking capabilities provided by the browser or to use an external spell checking web service.

## Native Browser Spell Checker

By default, native browser spell check functionality is disabled in the editor. Use the {@linkapi CKEDITOR.config.disableNativeSpellChecker `config.disableNativeSpellChecker`} configuration option to enable it:

```js
config.disableNativeSpellChecker = false;
```

After reloading the editor you should be able to see the spelling corrections underlined in your editor content.

**Note**: If the [Context Menu](https://ckeditor.com/cke4/addon/contextmenu) plugin is enabled, it is necessary to hold the <kbd>Ctrl</kbd> key when right-clicking misspelled words to see their suggestions.

**Note**: The spell check functionality is not available natively for all browsers.

## Spell Check As You Type (SCAYT)

The [SpellCheckAsYouType (SCAYT)](https://ckeditor.com/cke4/addon/scayt) plugin provides inline spelling and grammar checking, much like the native browser spell checker, well-integrated with the CKEditor 4 context menu.

It is provided by [WebSpellChecker](https://webspellchecker.com/wsc-scayt-ckeditor4/). It uses the WebSpellChecker web services, transferring the text to their servers and performing spelling and grammar checking. This is a cross-browser solution.

{@img assets/img/scayt_02.png 876 Spell Check As You Type in CKEditor 4 WYSIWYG editor}

## Distraction-free Proofreading

<info-box info="">
    This is a commercial solution provided by our partner, [WebSpellChecker](https://webspellchecker.com/). You can report any issues in its [GitHub repository](https://github.com/WebSpellChecker/wproofreader).
</info-box>

[WProofreader SDK](https://webspellchecker.com/wsc-proofreader) is an AI-driven, multi-language text correction proofreading tool. It offers the functionality of handy as-you-type and in-dialog proofreading options in a modern, distraction-free UI. Spelling, grammar, and punctuation suggestions are available on hover as you type or in a separate convenient dialog aggregating all mistakes in one place.

{@img assets/img/wproofreader_01.png 722 Spelling and grammar checking with WProofreader in CKEditor 4 WYSIWYG editor}

The WProofreader badge in the bottom-right corner shows you the total number of mistakes detected. Hover an underlined word to display the WProofreader suggestions for any of the spelling and grammar mistakes found. The suggestion card allows the user to employ the feature on the go.

{@img assets/img/wproofreader_02.png 722 Distraction-free proofreader badge in CKEditor 4 WYSIWYG editor}

If you want to see an overview of all mistakes, click the “Proofread in dialog” icon in the badge. It will invoke a detached floating dialog, which is easy to navigate and perfect for dedicated proofreading sessions. Turning it on brings a dialog similar to the on-hover one, but substantially larger. It is a detached, floating window that can be conveniently moved around as needed, which is especially important on small screens. It also supports accessibility, as moving it left may be more convenient for left-handed persons or more comfortable in the case of right-to-left languages.

{@img assets/img/wproofreader_03.png 720 Proofreading dialog in CKEditor 4 WYSIWYG editor}

In order to use the WProofreader, you need to add a few lines of configuration to your editor:

```js
window.WEBSPELLCHECKER_CONFIG = {
    autoSearch: true,
    theme: ‘gray’, // changes default theme to gray
	serviceId: 'your-service-ID', // required for the cloud-based version only
	serviceProtocol: ‘https’,
	servicePort: ‘443’,
	serviceHost: ‘svc.webspellchecker.net’, // needs to be changed for the on-prem version
	servicePath: ‘api’
};
```

And load the following script on your site:

```html
<script type="text/javascript" src="https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js"></script>
```

WProofreader is a commercial solution, so you need to [purchase a license](https://ckeditor.com/contact/) and then add your `serviceId` to the configuration. You can also [request a free trial ID](https://ckeditor.com/contact/).

For more detailed documentation, refer to the [official WProofreader "Getting Started" guide](https://docs.webspellchecker.net/pages/viewpage.action?pageId=442663877).

## Supported Languages

### Language support

The most popular languages offered by WebSpellChecker solutions include: American English, Australian English, Arabic, Brazilian Portuguese, British English, Canadian English, Canadian French, Danish, Dutch, Finnish, French, German, Greek, Hebrew, Italian, Indonesian, Norwegian Bokmål, Norwegian Nynorsk, Portuguese, Spanish, Swedish, Turkish, and Ukrainian. There are, however, more languages available from the WebSpellChecker site. Grammar checking is available for over 20 languages.

The AI-driven approach for English, German, and Spanish is a recent addition to the software. It offers a far better checking quality, and generates proofreading suggestions based on the context of a sentence. It provides more suitable suggestions that address mistakes with 3 times the accuracy compared to a traditional mechanism.

Here you can check the [full list of available languages](https://webspellchecker.com/additional-dictionaries/).

### Specialized dictionaries

Apart from the language dictionaries, WebSpellChecker offers two specialized dictionaries: medical and legal.

### Custom dictionaries

Custom dictionaries can be used in two ways.

One is the **user-level dictionary** that can be expanded during the regular use by adding new words. This is a perfect solution for users working on specific content that may contain slang or professional jargon.

The other is the so-called **company-level dictionary**. These premade dictionaries can be uploaded by system administrators or CKEditor 5 integrators and made available across the company, accessible for all users. This way all benefits of a user-generated dictionary can be shared among the team, making the proofreading process more structured and controlled.

### Multi-language Support

If you have content in multiple languages, the spell and grammar check feature can automatically detect the text language properly. It is enough to choose “Auto Detect” in the Language dropdown of the WProofreader settings. Suggestions for spelling,grammar, and punctuation (if available) will be displayed properly for each text fragment.

{@img assets/img/wproofreader_04.png 654 Choose the auto-detect language option.}

## Customization Options

The SCAYT plugin includes numerous configuration options that let you customize the default spell checking language, the number of SCAYT suggestions available or the content of the spell checker context menu.

You can find them on the {@linkapi CKEDITOR.config `CKEDITOR.config`} API page, starting from `scayt_`.

<info-box hint="">
    The out-of-the-box spell checking functionality of SCAYT is ad-supported. If you want to remove the ads, you can <a href="https://ckeditor.com/contact/">purchase a license here</a>.
</info-box>

## Spell Checking Demo

See the {@linkexample spellchecker working "Proofreading, Spelling and Grammar Checking" sample} that showcases all official spell and grammar checking solutions.
