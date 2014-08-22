# Advanced Content Filter

This article provides a basic information about content filtering in CKEditor. For detailed documentation check <a href="#!/guide/dev_advanced_content_filter">CKEditor Deep Dive</a>.

Advanced Content Filter (ACF) is a CKEditor core feature that **filters incoming HTML content**, by transforming and deleting disallowed elements, attributes, classes and styles. If you paste content into CKEditor and notice that some elements are removed, then chances are high that it was removed by ACF.

ACF by default works in **automatic mode**, it means that a vanilla CKEditor will allow only content that was "defined as allowed" by enabled CKEditor features (buttons, plugins). For example if the Image button is enabled, CKEditor will allow `<img>` tags and so on. It is a sane default behavior as otherwise user would not be able to easily work with elements that can't be recognized by any of available plugins without editing HTML source code manually.

## Configuring ACF

**Note:** Instead of writing "attributes, styles, and classes", "**properties**" will be used as a shorthand.

### Allow everything (disable ACF)

	config.allowedContent = true;

Common use case: applications, where users are familiar with [source mode](#!/guide/dev_sourcearea) editing and should be allowed to enter anything they want, where no server side filtering is done to sanitize entered data.

### Allow everything, except...

See [Disallowed Content](#!/guide/dev_disallowed_content-section-how-to-allow-everything-except...) in the Deep Dive section.

Common use case: an alternative for allowing just everything, which allows for example protecting users against copying accidentally `<script>` tags, `onclick` handlers from other websites. Keep in mind that black listing is usually a bad idea.

### Automatic mode

Automatic mode is **enabled by default**.

Common use case: any website where users are expected to enter content that matches CKEditor configuration.

### Automatic mode and allow additional tags/properties

Available through CKEDITOR.config.extraAllowedContent

Common use case: any website where users are expected to enter content that matches CKEditor configuration, along with some predefined list of additional tags which users should be able to enter, but for which no CKEditor feature is available (e.g `<dl>`, `<dt>`, `<dd>`).

    // Allow <dl>, <dt>, <dd>.
    config.extraAllowedContent = 'dl dt dd';


### Automatic mode but disallow certain tags/properties

Available through CKEDITOR.config.disallowedContent

Common use case: any website where users are expected to enter content that matches CKEditor configuration, but the automatic configuration needs minor adjustments.

#### Example: disallow inline styles
    // Disallow setting borders for images. '*' is used as a wildcard.
    config.disallowedContent = 'img{border*};

#### Example: disallow attributes
    // Example: disallow setting target for links.
    config.disallowedContent = 'a[target]';

#### Example: disallow tags
    // Example: disallow <a> element. Link button will be removed from the toolbar.
    config.disallowedContent = 'a';

#### Example: disallow inline styles to use attributes instead
    // In case of disallowing width and height styles, CKEditor will use attributes instead.
    config.disallowedContent = 'img{width,height}';

**Hint:** in automatic mode CKEDITOR.config.disallowedContent and CKEDITOR.config.extraAllowedContent can be provided together.

### Specify all allowed tags manually

It is possible to specify manually allowed tags/properties through CKEDITOR.config.allowedContent. To do this right, reading section about ACF in [CKEditor Deep Dive](#!/guide/dev_advanced_content_filter) is highly recommended.

If allowed content is specified manually, CKEditor will hide features that require elements which are not allowed.
For example, if `<table>` tag is not provided, the Table button will not be available in the toolbar, even if the table plugins is enabled.

    // Example: allow <u>, <em>, <strong>, <ul>, <li>, <a>.
    // For <a> elements, "href" attribute is required and "target" is optional.
    config.allowedContent = 'u em strong ul li;a[!href,target]';

Common use case: suitable for developers that need precise control over what users can enter. If web application has server side security filter, its configuration may be passed to CKEditor to ensure that both tools are using the same set of rules.

## Why ACF?

ACF is a feature which is not that easy to configure (when automatic mode is not suitable) and for which a proper configuration takes a while. On the other side it might be disabled in 10 seconds, why bother then?

### Provide a real WYSIWYG editor

ACF should not be used as a replacement for server side security filtering to sanitize entered data. However, if a server side filter exists then ACF will be a perfect companion, ensuring that users will see in the editor exactly the same content as after saving it.

Suppose that server side filter does not allow `<iframe>` tags. If users would be able to paste it into CKEditor and see the iframe inside wysiwyg area, wouldn't that be confusing?

### Save time

Many times the HTML structure of content on external websites is far from ideal. By copying something that looks just like three paragraphs of text user might copy a bunch of `<div>` elements that contain classes like "warning", "main", "content" which are used on your website for different purposes. After pasting such content the visual results might be unpredictable, forcing user to spend his time on cleaning carefully the content manually, if he's able to do so.
Config::get
### Remove "noise" & make your website faster

Apart from copying invisible elements and classes some browsers, like Google Chrome, copy HTML content also with styles defined through CSS classes and paste them as inline styles.

If you go to "Chrome Web Store" and copy the header, you will end up with something like:

#### Example: Pasted HTML with ACF disabled

	<h1 class="webstore-Xb-Ab-Cb-Db-Wb" style="display: table; font-size: inherit; font-weight: inherit; margin: 0px; padding: 0px;"><a class="webstore-Xb-Ab-Cb-i" href="https://chrome.google.com/webstore/category/apps" style="color: rgb(38, 38, 38); text-decoration: none; font-family: 'Open Sans', arial, sans-serif; font-size: 14px; line-height: normal; background-color: rgb(236, 236, 236);"><span class="webstore-Xb-Ab-Cb-Eb" style="font-size: 16px; position: relative; top: 5px; padding-left: 5px; width: 185px;">Chrome Web Store</span></a></h1>

Does it make sense to copy `<span class="webstore-Xb-Ab-Cb-Eb">` or to let the other website decide what font should be used inside user article?

The additional markup takes space not only in your database but also takes bandwidth as well as causes that the browser has to parse more tags than needed to render the page, which in overall results in slower page load. When browsing web with mobile devices, such details make even more difference.

#### Example: Pasted HTML with ACF enabled, standard preset

	<h1><a href="https://chrome.google.com/webstore/category/apps">Chrome Web Store</a></h1>

The result of pasting exactly the same content in Standard preset, with ACF enabled.

### Keep the content concise

Bolded text on websites can be represented by: `<strong>`, `<b>`, `<span style="font-weight:bold">`, all these tags might be copied into CKEditor by users creating content. What if your website has a special CSS rule refined for the `<strong>` tag, but not for `<span style="font-weight:bold">`? If ACF is enabled, it will transform pasted content into a consistent form.

