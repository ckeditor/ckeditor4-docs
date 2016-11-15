<!--
Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->
# Example CKEditor Setups

This article is a detailed explanation of sample editor configurations on [CKEditor Home page](http://ckeditor.com) and [CKEditor Features page](http://ckeditor.com/features).

## Article Editor

The Article Editor demo showcases an editor designed mainly for writing text content like blog posts, articles etc. 
<p class="tip">
To try out this configuration visit the <a href="https://github.com/ckeditor/ckeditor-docs-samples/tree/master/editors">ckeditor-docs-samples</a> GitHub repository.
</p>

The Article Editor is based on the [Standard package](http://ckeditor.com/download) with a few modifications:

 * Added five additional plugins:
   * [Auto Embed](http://ckeditor.com/addon/autoembed) and [Semantic Media Embed](http://ckeditor.com/addon/embedsemantic) for inserting embeded media like videos (e.g. from Youtube, Vimeo).
   * [Enhanced Image](http://ckeditor.com/addon/image2) to provide captioned images.
   * [Upload Image](http://ckeditor.com/addon/uploadimage), [Upload File](http://ckeditor.com/addon/uploadfile) to support file uploads via drag&drop and pasting images from clipboard.
 * Adjusted the toolbar configuration to display buttons in a single row.
 * Adjusted CSS styles, including usage of Roboto font from [Google Fonts](https://developers.google.com/fonts/docs/getting_started).

<div class="responsive">
{@img editor1.png Article Editor}
</div>

## Document Editor

The Document Editor demo showcases an editor designed for creating documents which are usually later printed or exported into PDF files using tools like [wkhtmltopdf](https://github.com/wkhtmltopdf/wkhtmltopdf) or [PhantomJS](https://github.com/ariya/phantomjs) (note: PhantomJS 2.x has currently a [known zoom issue](https://github.com/ariya/phantomjs/issues/13997)). 

<p class="tip">
To try out this configuration visit the <a href="https://github.com/ckeditor/ckeditor-docs-samples/tree/master/editors">ckeditor-docs-samples</a> GitHub repository.
</p>

The Document Editor is based on the [Full package](http://ckeditor.com/download) with a few modifications:

 * Added three additional plugins:
   * [Table Resize](http://ckeditor.com/addon/tableresize) to enable table columns resizing.
   * [Upload Image](http://ckeditor.com/addon/uploadimage), [Upload File](http://ckeditor.com/addon/uploadfile) to support file uploads via drag & drop and pasting images from clipboard.
 * Adjusted the toolbar configuration to display buttons in a single row.
 * Reduced the number of buttons in the toolbar (full preset comes with plenty of them). 
 * Adjusted CSS styles, to render the document in a way that resembles a real sheet of paper.


<div class="responsive">
{@img editor2.png Document Editor}
</div>

## Inline Editor

The Inline Editor demo showcases [inline editing](http://sdk.ckeditor.com/samples/inline.html), which allows you to edit any element on the page in-place.
 
<p class="tip">
To try out this configuration visit the <a href="http://sdk.ckeditor.com/samples/inline.html">CKEditor SDK</a> website.
</p>

Inline editor provides a real WYSIWYG experience "out of the box", because unlike in [classic editor](http://sdk.ckeditor.com/samples/classic.html), there is no <code>&lt;iframe&gt;</code> element surrounding the editing area. The CSS styles used for editor content are exactly the same as on the target page where content is rendered.

<div class="responsive">
{@img editor3.png Inline Editor}
</div>

## Developer Site Editor

The Developer Site Editor demo showcases a sample editor for technical websites. The most interesting features presented in this configuration are <em>Code Snippets</em> and 
<em>Mathematical Formulas</em>. Both plugins support independent blocks of content rendered with the help of external JavaScript libraries. 
 
<p class="tip">
To try out this configuration visit the <a href="https://github.com/ckeditor/ckeditor-docs-samples/tree/master/editors">ckeditor-docs-samples</a> GitHub repository.
</p>

The Developer Site Editor is based on the [Standard package](http://ckeditor.com/download) with a few modifications:

 * Added five additional plugins:
   * [Code Snippet](http://ckeditor.com/addon/codesnippet) and [Mathematical Formulas](http://ckeditor.com/addon/mathjax) for inserting code snippets and mathematical formulas.
   * [Enhanced Image](http://ckeditor.com/addon/image2) to provide captioned images.
   * [Upload Image](http://ckeditor.com/addon/uploadimage), [Upload File](http://ckeditor.com/addon/uploadfile) to support file uploads via drag & drop and pasting images from clipboard.
 * Adjusted the toolbar configuration to display buttons in a single row, also removed a few buttons.

<div class="responsive">
{@img editor4.png Developer Site Editor}
</div>

## Drag & Drop

The Drag & Drop demo showcases possible usage of CKEditor interface for handling drag and drop operations.

<p class="tip">
To try out this configuration visit the <a href="http://sdk.ckeditor.com/samples/draganddrop.html">CKEditor SDK</a> website.
</p>

The Drag & Drop sample allows you to drag contacts from the list on the right-hand side to the inline editor on the left-hand side. They are inserted into the editor as custom [widgets](#!/guide/dev_widgets) representing the h-card microformat.

<div class="responsive">
{@img editor5.png Drag & Drop}
</div>

## Accessibility Checker

This demo showcases the <strong>Accessibility Checker</strong> plugin &ndash; an innovative solution that lets you inspect the accessibility level of content created in CKEditor and immediately solve any accessibility issues that are found.

<p class="tip">
To try out this configuration visit the <a href="http://sdk.ckeditor.com/samples/accessibilitychecker.html">CKEditor SDK</a> website.
</p>

<div class="responsive">
{@img editor6.png Accessibility Checker}
</div>

## Hints for Production Environment (All Setups)

All setups above used some additional plugins which are not included by default in basic/standard/full distributions. 

There are multiple ways of loading CKEditor library inside an application (each of them having its pros and cons) that are especially important when multiple additional plugins are loaded.
For better understanding of key differences also read [CKEditor Best Practices](#!/guide/dev_best_practices) and [Advanced Installation Concepts](#!/guide/dev_advanced_installation>).

### Manual download & installation of additional plugins (not recommended)

Although at a first glance it looks like the simplest way of adding plugins to CKEditor, it is not only inefficient but also may result
in headache when trying to add a plugin A, that requires plugin B, that requires plugin C (...and so on).

In a brief summary it involves the following steps:
<ol>
    <li>Downloading predefined package (basic/standard/full) from the <a href="http://ckeditor.com/download">download page</a>.</li>
    <li>Downloading additional plugins manually from the <a href="http://ckeditor.com/addons/plugins/all">addons repository</a>.</li>
    <li>Downloading plugins required by additional plugins manually.</li>
    <li>Enabling additional plugins manually through CKEDITOR.config.extraPlugins.</li>
</ol>

<table border="1" class="hints">
<tr><td class="hints-benchmark">Benchmark</td><td class="hints-result">Result</td><td>Comments</td>
<tr><th>Plugin installation complexity</th><td style="width:60px">High</td>
<td>Need to manually download all dependencies.</td></tr>
<tr><th>Toolbar configuration complexity</th><td>Moderate</td><td>Only after CKEDITOR.config.extraPlugins is set the toolbar configurator will render all available buttons.</td></tr>
<tr><th>Complexity of future upgrades</th><td>High</td><td>Need to manually download all plugins and dependencies again.</td></tr>
<tr><th>Number of files requested by browser</th><td>High</td><td>Each plugin results in a couple of additional HTTP requests (plugin, language file, icon).</td></tr>
<tr><th>Performance</th><td>Low</td><td>Large number of HTTP requests.</td></tr>
</table>

### Using CDN

The easiest way of using CKEditor if additional 3rd party plugins are not used. Using CKEditor from CDN involves the following steps:
<ol>
    <li>Adding a <code>&lt;script&gt;</code> tag that loads ckeditor.js from CDN. For more information read <a href="http://cdn.ckeditor.com/">CDN documentation</a>.</li>
    <li>In case of using 3rd party plugins:
        <ol>
            <li>Downloading them manually from the <a href="http://ckeditor.com/addons/plugins/all">add-ons repository</a>.</li>
            <li>Downloading plugins requirements manually.</li>
        </ol>
     </li>
    <li>Enabling additional plugins manually through CKEDITOR.config.extraPlugins.</li>
</ol>

<table border="1" class="hints">
<tr><td class="hints-benchmark">Benchmark</td><td class="hints-result">Result</td><td>Comments</td>
<tr><th>Plugin installation complexity</th><td style="width:60px">Moderate - High</td>
<td>Plugins authored by CKSource are available on CDN and can be easily enabled throogh CKEDITOR.config.extraPlugins. Other 3rd party plugins need to be downloaded locally and <a href="http://cdn.ckeditor.com/#plugins">enabled as external plugins</a>.</td></tr>
<tr><th>Toolbar configuration complexity</th><td>High</td><td>The toolbar configurator is not available so understanding what button names to use may be challenging.</td></tr>
<tr><th>Complexity of future upgrades</th><td>Low - Moderate</td><td>As easy as changing the version number in a single script tag. Locally stored 3rd party plugins must be updated manually.</td></tr>
<tr><th>Number of files requested by browser</th><td>High</td><td>Each plugin results in a couple of additional HTTP requests (plugin, language file, icon).</td></tr>
<tr><th>Performance</th><td>Moderate - High</td><td>Larger number of HTTP requests is compensated by fast network and endpoints located very close to the end user. Additional benefit caused by the fact that browsers load requests from multiple domains in pararel.</td></tr>
</table>

### Using Builder (recommended)
 
Using Builder to build a bundle with all required plugins is highly recommended in case of using customized packages, especially the one with additional 3rd party plugins.

For an information on how to build a customized package, check [Installing Plugins &ndash; Online Builder Installation](#!/guide/dev_plugins-section-through-ckbuilder).

<table border="1" class="hints">
<tr><td class="hints-benchmark">Benchmark</td><td class="hints-result">Result</td><td>Comments</td>
<tr><th>Plugin installation complexity</th><td style="width:60px">Low</td>
<td>As simple as selecting additional plugins from the list of all available plugins.</td></tr>
<tr><th>Toolbar configuration complexity</th><td>Low</td><td>The toolbar configurator is included in the downloaded CKEditor package and is aware of all included plugins.</td></tr>
<tr><th>Complexity of future upgrades</th><td>Low</td><td>As easy as uploading the `build-config.js` file to the <a href="http://ckeditor.com/builder">Online Builder</a> and regenerating the package.</td></tr>
<tr><th>Number of files requested by browser</th><td>Low</td><td>Plugins are bundled into a single ckeditor.js file. Icons are merged into sprite. Language files are merged.</td></tr>
<tr><th>Performance</th><td>High</td><td>The only problem might be in slow network where CKEditor is hosted and/or misconfigured server without file compression enabled. Such setup would influence not only CKEditor but would also slow down the whole web application.</td></tr>
</table>
