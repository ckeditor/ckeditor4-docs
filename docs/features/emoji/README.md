---
category: working-with-document
order: 50
url: features/emoji
menu-title: Emoji
meta-title-short: Emoji
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Emoji

<info-box info="">
    This feature was introduced in CKEditor 4.10. It is provided through optional plugins that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The emoji feature introduces support for easy inserting of emoji characters in a unified, platform-independent way. Emojis are inserted by typing identifiers based on [Unicode Short Names](https://unicode.org/emoji/charts/emoji-list.html) preceded by a colon (`:`) in the editor and selecting the suggestion from the provided dropdown.

The emoji can also be selected manually from the dedicated dropdown that opens when you select the Emoji List button from the toolbar.

{@img assets/img/emoji_01.png Emoji plugin showing two emoji suggestions.}

The [Emoji](https://ckeditor.com/cke4/addon/emoji) plugin that provides this functionality is an implementation of the {@link features/autocomplete/README Autocomplete} feature.

It includes an autocomplete component that will list available emojis. Each identifier should be wrapped in colon (`:`) characters, like `:slightly_smiling_face:`, `:cat_face:` or `:winking_face:`.

When you press the <kbd>Enter</kbd> or <kbd>Tab</kbd> key, the suggested value will be inserted into the editor.

{@img assets/img/emoji_03.png The editor content with emoji inserted.}

## Dropdown

Starting with CKEditor 4.11 the Emoji plugin also features a toolbar button that opens a dropdown where you can browse all the available emojis.

{@img assets/img/emoji_04.png Emoji dropdown with search input focused.}

Clicking any icon in the categories section will scroll the dropdown to the given category.

You can also use the text filter input (the search bar) to type and narrow down the results. This filter also matches keywords, so if the database contains emoji like `:man_health_worker:` and `:woman_health_worker:` with the `doctor` keyword, then typing `doctor` will also include these two results.

## Configuration

The emoji feature is ready-to-use out of the box, but you can customize it by modifying the default emoji list or changing the number of characters that trigger the autocompletion mechanism.

### Custom Emoji List

By default CKEditor comes with a list of around 1500 emojis, which is just a subset of the entire Unicode Standard. You are free to reduce or increase the number of loaded emojis using the {@linkapi CKEDITOR.config.emoji_emojiListUrl `config.emoji_emojiListUrl`} setting.

### Characters Needed for Autocompletion

You can adjust the number of characters needed to show the emoji list when typing. Reducing this number will improve the performance. Refer to the {@linkapi CKEDITOR.config.emoji_minChars `config.emoji_minChars`} option for more details.

## Emoji Demo

See the {@linksdk mentions "Mentions, Tags and Emoji" sample} that shows an example of emoji used together with the mentions feature.

## Related Features

Refer to the following resources for more information about autocomplete features:

* The {@link features/autocomplete/README Autocomplete} article explains how to implement smart completion for custom text matches based on user input.
* The {@link features/mentions/README Mentions and Tags} article explains how to implement smart completion for user input based on a chosen marker character.
