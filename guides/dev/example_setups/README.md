<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->
# Example CKEditor Setups

This article is a detailed explanation of sample editor configurations shown on the [CKEditor 4 Homepage](https://ckeditor.com/ckeditor-4/).

## Article Editor

The Article Editor demo showcases an editor designed mainly for writing web text content like blog posts, articles etc.

<p class="tip">
  Visit the <a href="https://github.com/ckeditor/ckeditor-docs-samples/tree/master/editors">ckeditor-docs-samples</a> GitHub repository to learn more about this configuration.
</p>

The Article Editor is based on the [Standard package](https://ckeditor.com/ckeditor-4/download/) with a few modifications:

 * Added five additional plugins:
   * [Auto Embed](https://ckeditor.com/cke4/addon/autoembed) and [Semantic Media Embed](https://ckeditor.com/cke4/addon/embedsemantic) for inserting [embedded media resources](#!/guide/dev_media_embed) like videos (e.g. from YouTube, Vimeo), tweets or slideshows.
   * [Enhanced Image](https://ckeditor.com/cke4/addon/image2) to provide [captioned images](#!/guide/dev_captionedimage).
   * [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) and [Upload File](https://ckeditor.com/cke4/addon/uploadfile) to support [file uploads via drag&drop and pasting](#!/guide/dev_drop_paste) images from clipboard.
 * Adjusted the [toolbar configuration](#!/guide/dev_toolbar) to display buttons in a single row.
 * Adjusted [content CSS styles](#!/guide/dev_styles), including usage of [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) font from [Google Fonts](https://developers.google.com/fonts/docs/getting_started).

<div class="responsive">
{@img editor1.png Article Editor}
</div>

## Document Editor

The Document Editor demo showcases a more robust editor designed for creating documents which are usually later printed or exported to PDF files using tools like [wkhtmltopdf](https://github.com/wkhtmltopdf/wkhtmltopdf) or [PhantomJS](https://github.com/ariya/phantomjs) (note: PhantomJS 2.x currently has a [known zoom issue](https://github.com/ariya/phantomjs/issues/13997)).

<p class="tip">
  Visit the <a href="https://github.com/ckeditor/ckeditor-docs-samples/tree/master/editors">ckeditor-docs-samples</a> GitHub repository to learn more about this configuration.
</p>

The Document Editor is based on the [Full package](https://ckeditor.com/ckeditor-4/download/) with a few modifications:

 * Added three additional plugins:
   * [Table Resize](https://ckeditor.com/cke4/addon/tableresize) to enable [table columns resizing](#!/guide/dev_table-section-table-resizing-with-your-mouse).
   * [Upload Image](https://ckeditor.com/cke4/addon/uploadimage) and [Upload File](https://ckeditor.com/cke4/addon/uploadfile) to support [file uploads via drag&drop and pasting](#!/guide/dev_drop_paste) images from clipboard.
 * Adjusted the [toolbar configuration](#!/guide/dev_toolbar) to display buttons in a single row.
 * Reduced the number of buttons in the toolbar (Full preset comes with plenty of them).
 * Adjusted [content CSS styles](#!/guide/dev_styles) to render the document in a way that resembles a real sheet of paper.


<div class="responsive">
{@img editor2.png Document Editor}
</div>

## Inline Editor

The Inline Editor demo showcases [inline editing](#!/guide/dev_inline) that allows you to edit any element on the page in-place.

<p class="tip">
  Visit the <a href="https://github.com/ckeditor/ckeditor-docs-samples/tree/master/editors">ckeditor-docs-samples</a> GitHub repository to learn more about this configuration.
</p>

Inline editor provides a real WYSIWYG experience "out of the box" because unlike in [classic editor](#!/guide/dev_framed), there is no `<iframe>` element surrounding the editing area. The CSS styles used for editor content are exactly the same as on the target page where the content is rendered.

<div class="responsive">
{@img editor3.png Inline Editor}
</div>

## Accessibility Checker

This demo showcases the <strong>Accessibility Checker</strong> plugin &mdash; an innovative solution that lets you inspect the accessibility level of content created in CKEditor and immediately solve any accessibility issues that are found.

<p class="tip">
  Visit the <a href="https://sdk.ckeditor.com/samples/accessibilitychecker.html">CKEditor SDK</a> website to try out this configuration.
</p>

<div class="responsive">
{@img editor6.png Accessibility Checker}
</div>

## Hints for Production Environment (All Setups)

All setups above used some additional plugins which are not included by default in the Basic, Standard or Full distributions.

There are multiple ways of loading the CKEditor library inside an application (each of them having its pros and cons) that are especially important when multiple additional plugins are loaded.

For better understanding of key differences please refer to [CKEditor Best Practices](#!/guide/dev_best_practices) and [Advanced Installation Concepts](#!/guide/dev_advanced_installation).

### Manual Download and Installation of Additional Plugins (Not Recommended)

Although at a first glance it looks like the simplest way of adding plugins to CKEditor, it is not only inefficient but also may result
in a headache when trying to add plugin A, that requires plugin B, that requires plugin C (...and so on).

In a brief summary it involves the following steps:
<ol>
    <li>Downloading the predefined package (Basic/Standard/Full) from the <a href="https://ckeditor.com/ckeditor-4/download/">Download page</a>.</li>
    <li>Downloading additional plugins manually from the <a href="https://ckeditor.com/cke4/addons/plugins/all/all">Add-ons Repository</a>.</li>
    <li>Downloading plugins required by additional plugins manually.</li>
    <li>Enabling additional plugins manually through CKEDITOR.config.extraPlugins.</li>
</ol>

<table border="1" class="hints">
<tr><td class="hints-benchmark">Benchmark</td><td class="hints-result">Result</td><td>Comments</td></tr>
<tr><th>Plugin installation complexity</th><td style="width:60px">High</td>
<td>Need to manually download all dependencies.</td></tr>
<tr><th>Toolbar configuration complexity</th><td>Moderate</td><td>Only after CKEDITOR.config.extraPlugins is set the toolbar configurator will render all available buttons.</td></tr>
<tr><th>Complexity of future upgrades</th><td>High</td><td>Need to manually download all plugins and dependencies again.</td></tr>
<tr><th>Number of files requested by the browser</th><td>High</td><td>Each plugin results in a couple of additional HTTP requests (plugin, language file, icon).</td></tr>
<tr><th>Performance</th><td>Low</td><td>Large number of HTTP requests.</td></tr>
</table>

### Using CDN

This is the easiest way of using CKEditor if additional third-party plugins are not used. Using CKEditor from CDN involves the following steps:
<ol>
    <li>Adding a <code>&lt;script&gt;</code> tag that loads <code>ckeditor.js</code> from CDN. For more information refer to the <a href="http://cdn.ckeditor.com/">CDN documentation</a>.</li>
    <li>In case of using third-party plugins:
        <ol>
            <li>Downloading them manually from the <a href="https://ckeditor.com/cke4/addons/plugins/all">Add-ons Repository</a>.</li>
            <li>Downloading plugin requirements manually.</li>
        </ol>
     </li>
    <li>Enabling additional plugins manually through CKEDITOR.config.extraPlugins.</li>
</ol>

<table border="1" class="hints">
<tr><td class="hints-benchmark">Benchmark</td><td class="hints-result">Result</td><td>Comments</td></tr>
<tr><th>Plugin installation complexity</th><td style="width:60px">Moderate - High</td>
<td>Plugins authored by CKSource are available on CDN and can be easily enabled throogh CKEDITOR.config.extraPlugins. Third-party plugins need to be downloaded locally and <a href="http://cdn.ckeditor.com/#plugins">enabled as external plugins</a>.</td></tr>
<tr><th>Toolbar configuration complexity</th><td>High</td><td>The toolbar configurator is not available so understanding what button names to use may be challenging.</td></tr>
<tr><th>Complexity of future upgrades</th><td>Low - Moderate</td><td>As easy as changing the version number in a single <code>&lt;script&gt;</code> tag. Locally stored third-party plugins must be updated manually.</td></tr>
<tr><th>Number of files requested by the browser</th><td>High</td><td>Each plugin results in a couple of additional HTTP requests (plugin, language file, icon).</td></tr>
<tr><th>Performance</th><td>Moderate - High</td><td>Larger number of HTTP requests is compensated by fast network and endpoints located very close to the end user. Additional benefit caused by the fact that browsers load requests from multiple domains in parallel.</td></tr>
</table>

### Using Builder (Recommended)

Using [Builder](https://ckeditor.com/cke4/builder) to build a bundle with all required plugins is highly recommended in case of using customized packages, especially those with additional third-party plugins.

Refer to the [Installing Plugins &ndash; Online Builder Installation](#!/guide/dev_plugins-section-through-ckbuilder) article for information about building a custom editor package.

<table border="1" class="hints">
<tr><td class="hints-benchmark">Benchmark</td><td class="hints-result">Result</td><td>Comments</td></tr>
<tr><th>Plugin installation complexity</th><td style="width:60px">Low</td>
<td>As simple as selecting additional plugins from the list of all available plugins.</td></tr>
<tr><th>Toolbar configuration complexity</th><td>Low</td><td>The toolbar configurator is included in the downloaded CKEditor package and is aware of all included plugins.</td></tr>
<tr><th>Complexity of future upgrades</th><td>Low</td><td>As easy as uploading the <code>build-config.js</code> file to the <a href="https://ckeditor.com/cke4/builder">Online Builder</a> and regenerating the package.</td></tr>
<tr><th>Number of files requested by the browser</th><td>Low</td><td>Plugins are bundled into a single <code>ckeditor.js</code> file. Icons are merged into a sprite. Language files are merged.</td></tr>
<tr><th>Performance</th><td>High</td><td>The only problem might be in slow networks where CKEditor is hosted and/or in a misconfigured server without file compression enabled. Such setup would influence not only CKEditor but would also slow down the whole web application.</td></tr>
</table>
