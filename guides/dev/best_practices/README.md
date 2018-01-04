<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor Best Practices

This article contains a list of some best practices that we recommend when implementing CKEditor. Check the links for more information about particular items.

## Installation

### Upgrade regularly
CKEditor should be [upgraded frequently](#!/guide/dev_upgrade) as bug fixes and new features, including support for new browser versions, are not backported.

If you modified any distribution files to add your custom configuration, pay special attention to not overwrite your content (including `config.js`, `contents.css`, `styles.js` and custom template files) when upgrading.

### Use minified versions
You should always use minified CKEditor versions ([official releases](https://ckeditor.com/ckeditor-4/download/), [optimized](https://ckeditor.com/cke4/builder) [builds](#!/guide/dev_build)) in production environments. The [development, source code version](#!/guide/dev_source) is only suitable for tests and development.

Additionally, it is good to enable `gzip` compression in your server settings.

### Do not be afraid of custom builds
If you want to skip some editor features, [customize your build with CKBuilder](https://ckeditor.com/cke4/builder) and remove unneeded functionality.

It is a bad practice to download the Full package and then [remove plugins](#!/api/CKEDITOR.config-cfg-removePlugins) or [buttons](#!/api/CKEDITOR.config-cfg-removeButtons) in your configuration. You will only be loading unnecessary stuff without any good reason.

### Use CKBuilder to add plugins
If you want to install additional plugins, [use CKBuilder instead of adding them manually](#!/guide/dev_plugins).

This will reduce the risk of omitting plugin dependencies and in the created optimized build all plugins will be merged into one file, which will reduce time needed to load them.

## Configuration

### Configure content filtering
[Advanced Content Filter](#!/guide/dev_acf) is a cool feature which assures that the content inserted by the user blends in with your website in the best possible way. If you have any issues with it, do not turn it off, but instead configure it to match your requirements.

For example, to enable `<iframe>` and `<style>` elements, allow two additional attributes (`id` and `rel` given in square brackets) for all (`*` is a wildcard) already enabled elements, and allow usage of any class names (see `(*)`) for them, use the following code:

	config.extraAllowedContent = 'iframe style;*[id,rel](*)';

### Pasting as plain text &ne; content filtering
Setting {@link CKEDITOR.config#forcePasteAsPlainText} to `true` will not replace the content filtering features that [Advanced Content Filter](#!/guide/dev_advanced_content_filter) can provide. It will however make it impossible for users to paste items such as tables or lists, where structure matters most.

### Use Enter mode P
Changing the [Enter Mode](#!/api/CKEDITOR.config-cfg-enterMode) setting to `BR` or `DIV` is not recommended. The default `CKEDITOR.ENTER_P` mode is fully supported by all editor features and plugins and is also the most correct one in terms of best practices for creating web content.

If you do it to control paragraph spacing, you should use stylesheets instead. Edit the `contents.css` file and set up a suitable `margin` value for `<p>` elements, for example:

	p { margin: 0; }

### Configure Styles drop-down
If you are using a CKEditor build which includes the Styles drop-down (like Standard or Full), take a few minutes to [configure it](#!/guide/dev_styles) after you install the editor.

The default styles included in the `styles.js` file are just examples which will not work without the matching `contents.css` file. They will also not work in the inline editor which uses page stylesheets instead of the `contents.css` file.

## Integration

### Input clean HTML code
You should only ever input clean, standards-compliant HTML code into CKEditor. [Incorrect markup will be modified by CKEditor](#!/guide/dev_basics-section-how-ckeditor-works) which may lead to unexpected results.

### Use UTF-8
To avoid problems with character encoding, use UTF-8 for your websites and your database. Just set the `<meta>` element for your pages to:

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

or, if you are using the HTML5 `DOCTYPE`, to:

	<meta charset="utf-8">

### Use CKEditor for what it was made for
Last but not least, [use CKEditor for what it was designed for](#!/guide/dev_basics-section-what-ckeditor-is). Learn from the best: Visit the [CKEditor SDK](https://sdk.ckeditor.com/) to see plenty of valid editor use cases, with source code ready to copy and implement in your own solution!

## Security

### Filter content server-side

**No editor features (such as [Advanced Content Filter (ACF)](#!/guide/dev_acf) or paste filter) should be treated as security filters.** If the content that is to be loaded into CKEditor comes from untrusted sources (e.g. the users of your website), you should always filter it on the server side to avoid potential XSS issues &mdash; just like you would do it for any other content intended to be published on your website. The same applies to publishing content on your website. Before displaying content on your website coming from untrusted users, regardless whether CKEditor is enabled or not, you should filter the content against XSS. The reason is that malicious users can disable CKEditor in a browser or use software to alter the POST request and send anything. 

### Use ACF in default, automatic mode

Configuring ACF to accept additional tags and attributes that are unsupported by CKEditor features may result in XSS vulnerabilities.

For example, if you decide to allow all attributes in HTML elements, you will allow users to enter `onclick`, `onload`, `onerror` handlers. If you decide to allow all HMTL elements, users will be able to insert all elements which are easy to use for XSS attacks, e.g. `<iframe>`s, `<script>` tags or `<meta>` tags.

Although ACF is not a security filter, leaving it in defult, automatic mode should minimise the risk of XSS issues.

### Disable source mode

[Source mode](#!/guide/dev_sourcearea) is an advanced feature that lets your users insert HTML code into your website and is not really needed in most use cases (after all, you are installing a WYSIWYG editor to avoid the need to write content in HTML). Disabling it is thus highly recommended.

