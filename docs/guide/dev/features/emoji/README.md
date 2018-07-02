---
category: working-with-document
order: 50
url: guide/dev_emoji
menu-title: Emoji
meta-title-short: Emoji
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Emoji

<info-box info="">
    This feature was introduced in CKEditor 4.10. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The emoji feature introduces support for easy inserting of emoji characters in a unified, platform-independent way. Emojis are inserted by typing identifiers based on [Unicode Short Names](https://unicode.org/emoji/charts/emoji-list.html) preceded by a colon (`:`) in the editor and selecting the suggestion from the provided dropdown.

{@img assets/img/emoji_01.png Emoji plugin showing two emoji suggestions.}

The [Emoji](https://ckeditor.com/cke4/addon/emoji) plugin that provides this functionality is an implementation of the {@link guide/dev/features/autocomplete/README Autocomplete} feature.  

It includes an autocomplete component that will list available emojis. Each identifier should be wrapped in colon (`:`) characters, like `:slightly_smiling_face:`, `:cat_face:` or `:winking_face:`.

When you press the <kbd>Enter</kbd> or <kbd>Tab</kbd> key, the suggested value will be inserted into the editor.

{@img assets/img/emoji_03.png The editor content with emoji inserted.}

## Configuration

The emoji feature is ready-to-use out of the box, but you can customize it by modifying the default emoji list or changing the number of characters that trigger the autocompletion mechanism.

### Custom Emoji List

By default CKEditor comes with a list of around 1500 emojis, which is just a subset of the entire Unicode Standard. You are free to reduce or increase the number of loaded emojis using the {@linkapi CKEDITOR.config.emoji_emojiListUrl `config.emoji_emojiListUrl`} setting.

### Characters Needed for Autocompletion

You can adjust the number of characters needed to show the emoji list when typing. Reducing this number will improve the performance. Refer to the {@linkapi CKEDITOR.config.emoji_minChars `config.emoji_minChars`} option for more details.

## Roadmap

The first implementation of emoji support was introduced in CKEditor 4.10, and the following features are planned to be added soon:

* [Emoji list button with a search feature](https://github.com/ckeditor/ckeditor-dev/issues/2062#issuecomment-395386515)
* [Improved emoji matching with support for keywords](https://github.com/ckeditor/ckeditor-dev/issues/2181)

## Emoji Demo

See the ["Mentions, Tags and Emoji" sample](https://sdk.ckeditor.com/samples/mentions.html) that shows an example of emoji used together with the mentions feature.

## Related Features

Refer to the following resources for more information about autocomplete features:

* The {@link guide/dev/features/autocomplete/README Autocomplete} article explains how to implement smart completion for custom text matches based on user input.
* The {@link guide/dev/features/mentions/README Mentions and Tags} article explains how to implement smart completion for user input based on a chosen marker character.
