---
category: styling-formatting
order: 40
url: guide/dev_copyformatting
menu-title: Copying Text Formatting
meta-title-short: Copying Text Formatting
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using the Copy Formatting Feature

<info-box info="">
    This feature was introduced in <strong>CKEditor 4.6</strong>. It is provided through an optional plugin that is included in the Full preset available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also {@link guide/dev/plugins/README add it to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</info-box>

The optional [Copy Formatting](https://ckeditor.com/cke4/addon/copyformatting) plugin provides the ability to easily copy text formatting from one place in the document and apply it to another.

When enabled, the plugin adds the **Copy Formatting** (<img class="inline" src="%BASE_PATH%/assets/img/copyformatting-button.png" alt="Copy Formatting toolbar button">) toolbar button. To copy styles, place your cursor inside the text (or select a styled document fragment) and press the button or use the <kbd>Ctrl+Shift+C</kbd> keyboard shortcut. Then place the cursor inside some word or select a part of the text to apply formatting to it. The copied formatting can also be applied by using the <kbd>Ctrl+Shift+V</kbd> keyboard shortcut.

{@img assets/img/copyformatting_01.png Copied formatting being applied to a text fragment}

<info-box hint="">
    <p>
        Note that not all styles can be copied or removed. For example, Copy Formatting will not copy styles from links and will not remove links when you apply formatting to them. The default filter can be adjusted, though &mdash; read more about filter customization below.
    </p>
    <p>
        Copy Formatting only works with <strong>inline styles</strong>, so it will not copy or apply block-level styles (e.g. headers) to text.
    </p>
</info-box>

## Sticky Mode

A special sticky mode allows you to copy formatting once and apply it in more than one place. To enable it, double-click the <img class="inline" src="%BASE_PATH%/assets/img/copyformatting-button.png" alt="Copy Formatting"> button or use the <kbd>Ctrl+Shift+C</kbd> keyboard shortcut.

The sticky mode can be switched off by clicking the <img class="inline" src="%BASE_PATH%/assets/img/copyformatting-button.png" alt="Copy Formatting"> button again or by pressing the <kbd>Esc</kbd> key.

## Copy Formatting Context

By default, Copy Formatting is supported in the following contexts:

* Plain text.
* Lists.
* Tables.

This means that depending on the value of the {@linkapi CKEDITOR.config.copyFormatting_allowedContexts CKEDITOR.config.copyFormatting_allowedContexts} configuration option Copy Formatting will only support text, list and table styles.

    // Default setting: text, lists and tables supported.
    config.copyFormatting_allowedContexts = true;

    // Only allow text styles to be copied.
    config.copyFormatting_allowedContexts = [ 'text' ];

Note that if you only allow the `'text'` context, you will still be able to copy text formatting between text and tables or lists. It will, however, not be possible to copy list- and table-specific styles such as numbering type or table cell settings.

## Copy Formatting Filter

The Copy Formatting filter is configurable &mdash; you can both explicitly whitelist and blacklist the elements from which fetching styles will be allowed:

* {@linkapi CKEDITOR.config.copyFormatting_allowRules CKEDITOR.config.copyFormatting_allowRules} &ndash; Sets rules for elements from which the styles can be copied.
* {@linkapi CKEDITOR.config.copyFormatting_disallowRules CKEDITOR.config.copyFormatting_disallowRules} &ndash; Sets rules for elements from which the styles cannot be copied.

Both options are using {@link guide/dev/acf/README Advanced Content Filter} syntax &mdash; refer to the {@link guide/dev/deep_dive/advanced_content_filter/allowed_content_rules/README Allowed Content Rules} article for more information.

Formatting cannot be copied from certain types of elements. By default these elements include:

* Links.
* Headings.
* Images.
* Iframes.
* Widgets.
* Media embeds.

The example below further limits Copy Formatting to only allow {@link guide/dev/features/basicstyles/README basic text styles} (bold, italic, underline, strikethrough) to be copied:

    config.copyFormatting_allowRules = 'b s u i em strong; span{text-decoration,font-weight}';

## Keyboard Shortcuts

The Copy Formatting feature is fully {@link guide/dev/a11y/README accessible}, with dedicated state notifications for screen readers and {@link guide/dev/features/shortcuts/README keyboard shortcuts}.

By default, you can use the following keyboard shortcuts:

* <kbd>Ctrl+Shift+C</kbd> &ndash; Copies the formatting from a text fragment and enables the sticky mode.
* <kbd>Ctrl+Shift+V</kbd> &ndash; Applies the previously copied formatting to a text fragment.
* <kbd>Esc</kbd> &ndash; Disables the sticky mode.

The first two shortcuts can be customized with the {@linkapi CKEDITOR.config.copyFormatting_keystrokeCopy CKEDITOR.config.copyFormatting_keystrokeCopy} and {@linkapi CKEDITOR.config.copyFormatting_keystrokePaste CKEDITOR.config.copyFormatting_keystrokePaste} configuration options, respectively.

You can also completely disable keyboard shortcuts for Copy Formatting by setting these configuration options to `false`. Do note, though, that this is not recommended due to accessibility reasons.

    // Changes the keyboard shortcut for copying the formatting to Ctrl+Shift+B.
    config.copyFormatting_keystrokeCopy = {@linkapi CKEDITOR.CTRL CKEDITOR.CTRL} + {@linkapi CKEDITOR.SHIFT CKEDITOR.SHIFT} + 66;

    // Disables the keyboard shortcut for pasting the formatting.
    config.copyFormatting_keystrokePaste = false;

## Copy Formatting Cursors

Once activated (i.e. when a style was copied), the Copy Formatting feature causes the cursor inside the editor to change to <img class="inline" src="%BASE_PATH%/assets/img/copyformatting-cursor.svg" alt="Formatting copied cursor">. When the cursor is moved outside the editor, it changes to a dedicated "disabled" cursor (<img class="inline" src="%BASE_PATH%/assets/img/copyformatting-cursor-disabled.svg" alt="Applying copied formatting disabled cursor">) that indicates you cannot apply the copied formatting there.

The special "disabled" cursor can be switched off by setting the {@linkapi CKEDITOR.config.copyFormatting_outerCursor CKEDITOR.config.copyFormatting_outerCursor} configuration option to `false`.

    config.copyFormatting_outerCursor = false;

<info-box hint="">
    More advanced modifications of cursors used by Copy Formatting can be done by adding custom styles to the editor stylesheet.
</info-box>

## Copy Formatting Demo

See the {@linksdk copyformatting working "Using the Copy Formatting Feature" sample} that showcases the usage and customization of this feature.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The {@link guide/dev/deep_dive/advanced_content_filter/README Advanced Content Filer} article contains more in-depth technical details about ACF.
* The {@link guide/dev/deep_dive/advanced_content_filter/allowed_content_rules/README Allowed Content Rules} article explains the allowed and disallowed content rules format.
* The {@link guide/dev/features/basicstyles/README Basic Text Styles: Bold, Italic and More} article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting to text selections.
* The {@link guide/dev/features/removeformat/README Removing Text Formatting} article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The {@link guide/dev/features/format/README Applying Block-Level Text Formats} article presents how to apply formatting to entire text blocks and not just text selections.
* The {@link guide/dev/features/styles/README Applying Styles to Editor Content} article discusses creating more semantically correct text styles.
* The {@link guide/dev/features/colorbutton/README Setting Text and Background Color} article explains how to use and customize the **Text Color** and **Background Color** features.

