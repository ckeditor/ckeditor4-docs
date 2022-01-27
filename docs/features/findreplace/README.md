---
category: working-with-document
order: 35
url: features/findreplace
menu-title: Find and Replace
meta-title-short: Find and Replace
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using the Find and Replace Feature

The CKEditor 4 [Find and Replace feature](https://ckeditor.com/cke4/addon/find) allows for finding and replacing any text in the editor easily. It helps the user find words, word parts or phrases matching the case of the searched text, which is especially helpful in lengthy documents and one that may utilize certain words in different contexts. It also lets the editor replace a chosen one or all instances of the searched phrase with a single click, making tedious, repeated changes fast and easy. This may e.g. help ensuring the cohesion of an edited piece of code, while renaming a variable or a function.

## Usage

The Find and Replace plugin shows a dropdown with available options available from the main toolbar. It allows to match search text based on selected criteria and replace it accordingly.

You can either use the Find button to begin with the search dialog and look for specific words and phrases in the content, using search criteria, or use the Replace button to directly open the find and replace panel that enables the user to substitute searched text with a new one. You can switch between these two dialogs with a single mouse click while using the feature.

{@img assets/img/find_and_replace_0.png 616 The find and replace panel.}

## Formatting the search highlight

To adjust the way the search highlights the results in the content, the {@linkapi CKEDITOR.config.find_highlight CKEDITOR.config.find_highlight} property is used. You can determine the font and background color of the highlight with it.

```js
// Highlight search results with blue on yellow.
config.find_highlight = {
    element: 'span',
    styles: { 'background-color': '#ff0', color: '#00f' }
};
```

## Find and Replace Demo

See the {@linkexample findreplace working "Find and Replace" sample} that showcases the plugin.
