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

@todo: "based on" what are they based on?

Emoji plugin allows for easy inserting emoji characters in a unified, platform independent way. Emojis are inserted by typing codes based on @todo in the editor editable. Emoji also features autocomplete component that will list available emojis. Each identifier should be wrapped in colon `:` characters, like `:slightly_smiling_face:`, `:cat_face:` or `:winking_face:`.

## Configuration

### Custom Emoji List

By default CKEditor comes with a list of around 1500 emojis, which is just a subset of entire Unicode Standard. You are free to reduce or increase the number of loaded emojis using {@linkapi CKEDITOR.config.emoji_emojiListUrl `config.emoji_emojiListUrl`} property.

### Characters Needed For Auto Completion

You can adjust the number of character needed to show the emoji list while typing. Reducing this number will improve the performance. See {@linkapi CKEDITOR.config.emoji_minChars `config.emoji_minChars`} for more details.

## Related Features

Refer to the following resources for more information about autocomplete features:

* The {@link guide/dev/features/autocomplete/README Autocomplete} article explains how to implement smart completion for custom text matches based on user input.
* The {@link guide/dev/features/mentions/README Mentions and Tags} article explains how to implement smart completion for user input based on a chosen marker character.