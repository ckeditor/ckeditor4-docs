<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Using the Copy Formatting Feature

<p class="requirements">
    This feature was introduced in <strong>CKEditor 4.6</strong>. It is provided through an optional plugin that is included in the Full preset available from the official CKEditor <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site. You can also <a href="#!/guide/dev_plugins">add it to your custom build</a> with <a href="https://ckeditor.com/cke4/builder">CKBuilder</a>.
</p>

The optional [Copy Formatting](https://ckeditor.com/cke4/addon/copyformatting) plugin provides the ability to easily copy text formatting from one place in the document and apply it to another.

When enabled, the plugin adds the **Copy Formatting** (<img src="guides/dev_copyformatting/copyformatting-button.png" alt="Copy Formatting toolbar button" style="vertical-align: bottom;">) toolbar button. To copy styles, place your cursor inside the text (or select a styled document fragment) and press the button or use the <kbd>Ctrl+Shift+C</kbd> keyboard shortcut. Then place the cursor inside some word or select a part of the text to apply formatting to it. The copied formatting can also be applied by using the <kbd>Ctrl+Shift+V</kbd> keyboard shortcut.

{@img copyformatting_01.png Copied formatting being applied to a text fragment}

<div class="tip">
    <p>
        Note that not all styles can be copied or removed. For example, Copy Formatting will not copy styles from links and will not remove links when you apply formatting to them. The default filter can be adjusted, though &mdash; read more about filter customization below.
    </p>
    <p>
        Copy Formatting only works with <strong>inline styles</strong>, so it will not copy or apply block-level styles (e.g. headers) to text.
    </p>
</div>

## Sticky Mode

A special sticky mode allows you to copy formatting once and apply it in more than one place. To enable it, double-click the <img src="guides/dev_copyformatting/copyformatting-button.png" alt="Copy Formatting" style="vertical-align: bottom;"> button or use the <kbd>Ctrl+Shift+C</kbd> keyboard shortcut.

The sticky mode can be switched off by clicking the <img src="guides/dev_copyformatting/copyformatting-button.png" alt="Copy Formatting" style="vertical-align: bottom;"> button again or by pressing the <kbd>Esc</kbd> key.

## Copy Formatting Context

By default, Copy Formatting is supported in the following contexts:

* Plain text.
* Lists.
* Tables.

This means that depending on the value of the CKEDITOR.config.copyFormatting_allowedContexts configuration option Copy Formatting will only support text, list and table styles.

    // Default setting: text, lists and tables supported.
    config.copyFormatting_allowedContexts = true;

    // Only allow text styles to be copied.
    config.copyFormatting_allowedContexts = [ 'text' ];

Note that if you only allow the `'text'` context, you will still be able to copy text formatting between text and tables or lists. It will, however, not be possible to copy list- and table-specific styles such as numbering type or table cell settings.

## Copy Formatting Filter

The Copy Formatting filter is configurable &mdash; you can both explicitly whitelist and blacklist the elements from which fetching styles will be allowed:

* CKEDITOR.config.copyFormatting_allowRules &ndash; Sets rules for elements from which the styles can be copied.
* CKEDITOR.config.copyFormatting_disallowRules &ndash; Sets rules for elements from which the styles cannot be copied.

Both options are using [Advanced Content Filter](#!/guide/dev_acf) syntax &mdash; refer to the [Allowed Content Rules](#!/guide/dev_allowed_content_rules) article for more information.

Formatting cannot be copied from certain types of elements. By default these elements include:

* Links.
* Headings.
* Images.
* Iframes.
* Widgets.
* Media embeds.

The example below further limits Copy Formatting to only allow [basic text styles](#!/guide/dev_basicstyles) (bold, italic, underline, strikethrough) to be copied:

    config.copyFormatting_allowRules = 'b s u i em strong; span{text-decoration,font-weight}';

## Keyboard Shortcuts

The Copy Formatting feature is fully [accessible](#!/guide/dev_a11y), with dedicated state notifications for screen readers and [keyboard shortcuts](#!/guide/dev_shortcuts).

By default, you can use the following keyboard shortcuts:

* <kbd>Ctrl+Shift+C</kbd> &ndash; Copies the formatting from a text fragment and enables the sticky mode.
* <kbd>Ctrl+Shift+V</kbd> &ndash; Applies the previously copied formatting to a text fragment.
* <kbd>Esc</kbd> &ndash; Disables the sticky mode.

The first two shortcuts can be customized with the CKEDITOR.config.copyFormatting_keystrokeCopy and CKEDITOR.config.copyFormatting_keystrokePaste configuration options, respectively.

You can also completely disable keyboard shortcuts for Copy Formatting by setting these configuration options to `false`. Do note, though, that this is not recommended due to accessibility reasons.

    // Changes the keyboard shortcut for copying the formatting to Ctrl+Shift+B.
    config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 66;

    // Disables the keyboard shortcut for pasting the formatting.
    config.copyFormatting_keystrokePaste = false;

## Copy Formatting Cursors

Once activated (i.e. when a style was copied), the Copy Formatting feature causes the cursor inside the editor to change to <img src="guides/dev_copyformatting/copyformatting-cursor.svg" alt="Formatting copied cursor" style="vertical-align: bottom;">. When the cursor is moved outside the editor, it changes to a dedicated "disabled" cursor (<img src="guides/dev_copyformatting/copyformatting-cursor-disabled.svg" alt="Applying copied formatting disabled cursor" style="vertical-align: bottom;">) that indicates you cannot apply the copied formatting there.

The special "disabled" cursor can be switched off by setting the CKEDITOR.config.copyFormatting_outerCursor configuration option to `false`.

    config.copyFormatting_outerCursor = false;

<p class="tip">
    More advanced modifications of cursors used by Copy Formatting can be done by adding custom styles to the editor stylesheet.
</p>

## Copy Formatting Demo

See the [working "Using the Copy Formatting Feature" sample](https://sdk.ckeditor.com/samples/copyformatting.html) that showcases the usage and customization of this feature.

## Related Features

Refer to the following resources for more information about text styling and formatting:

* The [Advanced Content Filer](#!/guide/dev_advanced_content_filter) article contains more in-depth technical details about ACF.
* The [Allowed Content Rules](#!/guide/dev_allowed_content_rules) article explains the allowed and disallowed content rules format.
* The [Basic Text Styles: Bold, Italic and More](#!/guide/dev_basicstyles) article explains how to apply bold, italic, underline, strikethrough, subscript and superscript formatting to text selections.
* The [Removing Text Formatting](#!/guide/dev_removeformat) article explains how to quickly remove any text formatting that is applied through inline HTML elements and CSS styles.
* The [Applying Block-Level Text Formats](#!/guide/dev_format) article presents how to apply formatting to entire text blocks and not just text selections.
* The [Applying Styles to Editor Content](#!/guide/dev_styles) article discusses creating more semantically correct text styles.
* The [Setting Text and Background Color](#!/guide/dev_colorbutton) article explains how to use and customize the **Text Color** and **Background Color** features.

