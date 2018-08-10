---
category: inserting-ckeditor
order: 20
url: guide/dev_ckeditor_js_load
menu-title: Loading CKEditor
meta-title-short: Loading CKEditor
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Loading CKEditor Script

CKEditor is a JavaScript application. To load it, you need to include a single file reference in your page. If you {@link guide/dev/installation/README installed} CKEditor in the `ckeditor` directory in the root of your website, you need to insert the following code fragment into the `<head>` section of your page:

``` html
<head>
    ...
    <script src="/ckeditor/ckeditor.js"></script>
</head>
```

When this file is loaded, the {@link api/index CKEditor JavaScript API} is ready to be used.

When adding CKEditor to your web pages, use the original file name (`ckeditor.js`). If you want to use a different file name, or even merge the CKEditor script into another JavaScript file, refer to the {@link guide/dev/basepath/README Specifying the Editor Path} article first.

## Creating Editor Instances

Now that the CKEditor JavaScript API is available on the page, you can use it to create editor instances. There are two different options available in order to achieve this. In order to examine both usage scenarios, choose the preferred option below to get more information.

### Classic Editing
{@link guide/dev/framed/README Classic editing} is the most common way to use CKEditor, when the editor is usually represented by a toolbar and an editing area placed in a specific position on the page. Sometimes it is also called "framed editing", because in this scenario the editor creates a temporary `<iframe>` element for itself.

{@linksdk classic See the demo here}. Read all about this editor type in the {@link guide/dev/framed/README Classic Editing} article.

{@img assets/img/classic_example.png Classic editor example}

### Inline Editing
{@link guide/dev/inline/README Inline editing} is an innovative feature that can be used for content which needs to look like the final page, giving you a true <abbr title="What You See Is What You Get">WYSIWYG</abbr> experience. Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute. The editor toolbar appears automatically for these elements, floating on the page.

{@linksdk inline See the demo here}. Read all about this editor type in the {@link guide/dev/inline/README Inline Editing} article.

{@img assets/img/inline_example.png Inline editor example}
