<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Content Filtering (ACF)

<p class="requirements">
	This article provides basic information about editor content filtering feature which was introduced in <strong>CKEditor 4.1</strong>. For detailed documentation about this feature check the <a href="#!/guide/dev_advanced_content_filter">CKEditor Deep Dive</a> section.
</p>

Advanced Content Filter (ACF) is a CKEditor core feature that **filters incoming HTML content** by transforming and deleting disallowed elements, attributes, classes and styles. If you paste content into CKEditor and notice that some elements are removed, then chances are high that it was removed by ACF.

By default, ACF works in **automatic mode**. It means that out-of-the-box CKEditor will only allow content that was *defined as allowed* by enabled editor features (buttons, plugins). For example if the **Image** button is enabled, CKEditor will allow `<img>` tags and so on. This default behavior makes sense as otherwise the user would not be able to easily work with elements that cannot be recognized by any of available plugins without editing the HTML source code manually.

## Configuring ACF

**Note:** In this article, instead of writing "attributes, styles, and classes", "**properties**" will be used as a shorthand.

### Allow everything (disable ACF)

	config.allowedContent = true;

Common use case: Applications whose users are familiar with [source mode editing](#!/guide/dev_sourcearea) and should be allowed to enter anything they want, where no server-side filtering is done to sanitize submitted data.

### Allow everything, except...

See [Disallowed Content](#!/guide/dev_disallowed_content-section-how-to-allow-everything-except...) in the Deep Dive section.

Common use case: An alternative to allowing just everything, which helps, for example, protect users from accidental copying  of the `<script>` tags or `onclick` handlers from other websites. Keep in mind that blacklisting is usually a bad idea.

### Automatic mode

Automatic mode is **enabled by default**.

Common use case: Any website where users are expected to enter content that matches CKEditor configuration set by the website developer.

### Automatic mode and allow additional tags/properties

Available through CKEDITOR.config.extraAllowedContent.

Common use case: Any website where users are expected to enter content that matches CKEditor configuration along with a predefined list of additional tags that the users should be able to enter, but for which no supporting CKEditor feature is available (e.g `<dl>`, `<dt>`, `<dd>`).

    // Allow <dl>, <dt>, <dd>.
    config.extraAllowedContent = 'dl dt dd';

### Automatic mode but disallow certain tags/properties

Available through CKEDITOR.config.disallowedContent

Common use case: Any website where users are expected to enter content that matches CKEditor configuration, but the automatic configuration needs minor adjustments.

#### Example: Disallow inline styles
    // Disallow setting borders for images. '*' is used as a wildcard.
    config.disallowedContent = 'img{border*};

#### Example: Disallow attributes
    // Disallow setting a target for links.
    config.disallowedContent = 'a[target]';

#### Example: Disallow tags
    // Disallow <a> element. The Link button will be removed from the toolbar.
    config.disallowedContent = 'a';

#### Example: Disallow inline styles and use attributes instead
    // In case of disallowing width and height styles, CKEditor will use attributes instead.
    config.disallowedContent = 'img{width,height}';

**Hint:** In automatic mode CKEDITOR.config.disallowedContent and CKEDITOR.config.extraAllowedContent can be provided together.

### Specify all allowed tags manually

It is possible to manually specify allowed tags or properties through CKEDITOR.config.allowedContent. To do this right, it is recommended you get familiar with the section about ACF in the [CKEditor Deep Dive](#!/guide/dev_advanced_content_filter) section.

If allowed content is specified manually, CKEditor will hide features that require elements which are not allowed.
For example, if the `<table>` tag is not included in the manual ACF configuration, the **Table** button will not be available in the toolbar, even if the Table plugin is enabled.

    // Example: Allow <u>, <em>, <strong>, <ul>, <li>, <a>.
    // For <a> elements, "href" attribute is required and "target" is optional.
    config.allowedContent = 'u em strong ul li;a[!href,target]';

Common use case: Suitable for developers that need precise control over what users can enter. If a web application has a server-side security filter implemented, its configuration may be passed to CKEditor to ensure that both tools are using the same set of rules.

## Why ACF?

ACF is a feature which is not that easy to configure (when the automatic mode is not suitable) and its fine-tuning might take a while. On the other hand this editor feature might be disabled in ten seconds, so why bother to do it right?

### Provide a real WYSIWYG editor

ACF should not be used as a replacement to server-side security filtering that sanitizes entered data. If, however, a server-side filter exists, ACF will be its perfect companion that ensures the users will see exactly the same content in the editor as after saving it.

Suppose that server-side filter does not allow the `<iframe>` tag. If users would be able to paste it into CKEditor and see the iframe inside the WYSIWYG area, would that not be confusing?

### Save time

Many times the HTML structure of content on external websites is far from perfect. By copying something that looks just like three paragraphs of text a user may actually copy a bunch of `<div>` elements that contain classes like "warning", "main", "content" which are used on your website for different purposes. After pasting this content into the editor the visual results might be unpredictable, forcing the user to spend his time on cleaning the content manually (provided that he is able to do so).

### Remove "noise" and make your website faster

Apart from copying invisible elements and classes, some browsers (like Google Chrome) also copy HTML content with styles defined through CSS classes and paste them as inline styles.

If you go to "Chrome Web Store" and copy the header, you will end up with something like:

#### Example: Pasted HTML with ACF disabled

	<h1 class="webstore-Xb-Ab-Cb-Db-Wb" style="display: table; font-size: inherit; font-weight: inherit; margin: 0px; padding: 0px;"><a class="webstore-Xb-Ab-Cb-i" href="https://chrome.google.com/webstore/category/apps" style="color: rgb(38, 38, 38); text-decoration: none; font-family: 'Open Sans', arial, sans-serif; font-size: 14px; line-height: normal; background-color: rgb(236, 236, 236);"><span class="webstore-Xb-Ab-Cb-Eb" style="font-size: 16px; position: relative; top: 5px; padding-left: 5px; width: 185px;">Chrome Web Store</span></a></h1>

Does it make sense to copy `<span class="webstore-Xb-Ab-Cb-Eb">` or to let another website decide which font should be used inside the article?

Additional markup takes space not only in your database but it also takes bandwidth. It also forces the browser to parse more tags than needed to render the page, which overall results in a slower page load. When you are browsing the Internet with mobile devices, such details really make a difference.

#### Example: Pasted HTML with ACF enabled, standard preset

	<h1><a href="https://chrome.google.com/webstore/category/apps">Chrome Web Store</a></h1>

The result of pasting the same content in the Standard preset, with ACF enabled.

### Keep the content concise

Bold text can be represented on websites by `<strong>`, `<b>`, or `<span style="font-weight:bold">` elements. All these tags might be copied into CKEditor by content creators. What if your website has a special CSS rule defined for the `<strong>` tag, but not for `<span style="font-weight:bold">`? If ACF is enabled, it will [transform pasted content](#!/guide/dev_advanced_content_filter-section-content-transformations) into a consistent form.

## Advanced Content Filter Demos

The following samples are available for two ACF modes:

* The [Advanced Content Filter &ndash; Automatic Mode](http://sdk.ckeditor.com/samples/acf.html) sample shows the default implementation of ACF and its customization.
* The [Advanced Content Filter &ndash; Custom Mode](http://sdk.ckeditor.com/samples/acfcustom.html) sample shows how the custom ACF mode works.

## Further Reading

Refer to the following resources for more information about content filtering:

* The [Advanced Content Filer](#!/guide/dev_advanced_content_filter) article contains more in-depth technical details about ACF.
* The [Allowed Content Rules](#!/guide/dev_allowed_content_rules) article explains the allowed and disallowed content rules format.
* The [Disallowed Content](#!/guide/dev_disallowed_content) article explains how blacklisting works in ACF.
* The [Integrating Plugins with Advanced Content Filter](#!/guide/plugin_sdk_integration_with_acf) article explains how to adjust custom plugins to properly implement content filtering.