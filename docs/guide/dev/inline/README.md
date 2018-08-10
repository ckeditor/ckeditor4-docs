---
category: inserting-ckeditor
order: 60
url: guide/dev_inline
menu-title: Inline Editing
meta-title-short: Inline Editing
---
<!--
Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Inline Editing

Inline Editing is a new technology introduced in CKEditor 4 that allows you to **select any editable element on the page and edit it in-place**. As a result, the editor can be used to edit content that looks just like the final page.

It is a total WYSIWYG experience, because not only the edited content looks like the final outcome, but also the page and the context where the content is placed is the real one. Unlike in {@link guide/dev/framed/README classic editor}, there is no `<iframe>` element created for the editing area. The CSS styles used for editor content are exactly the same as on the target page where this content is rendered!

To try it out, see the {@linksdk inline inline editing demo}.

<img src="%BASE_PATH%/assets/img/inline_example.png" alt="Inline editor example">

## Content Styles = Page Styles

Inline editing is a true WYSIWYG experience and on the contrary to classic editing, the styles that are used for edited content come directly from the document stylesheet. This means that inline editors ignore default CKEditor content styles provided through the {@linkapi CKEDITOR.config.contentsCss CKEDITOR.config.contentsCss} configuration option and use the styles from the page that CKEditor is rendered on.

## Enabling Inline Editing

Inline Editing is enabled directly on HTML elements through the HTML5 `contenteditable` attribute.

Suppose, for example, that you want to make a `<div>` element with an ID of `editor1` editable. In order to achieve this, it is enough to do the following:

``` html
<div id="editor1" contenteditable="true">
    <h1>Inline Editing in Action!</h1>
    <p>The "div" element that contains this text is now editable.</p>
</div>
```

It is also possible to enable inline editing with explicit code, by calling the {@linkapi CKEDITOR.inline CKEDITOR.inline} method for the element that needs to have it enabled. Note that in this case you need to turn off automatic editor creation first by setting the {@linkapi CKEDITOR.disableAutoInline CKEDITOR.disableAutoInline} option to `true`.

Do remember that if the DOM element for which inline editing is being enabled does not have the `contenteditable` attribute set to `true`, the editor will start in read-only mode.

``` html
<div id="editor1" contenteditable="true">
    <h1>Inline Editing in Action!</h1>
    <p>The "div" element that contains this text is now editable.</p>
</div>
<script>
    // Turn off automatic editor creation first.
    {@linkapi CKEDITOR.disableAutoInline CKEDITOR.disableAutoInline} = true;
    {@linkapi CKEDITOR.inline CKEDITOR.inline}( 'editor1' );
</script>
```

When you click inside the content of this `<div>` element, the CKEditor toolbar will appear.

<info-box hint=""> The list of elements that support inline editing is available in the {@linkapi CKEDITOR.dtd.s-editable CKEDITOR.dtd.$editable} property.
</info-box>

## Inline Editing for Textarea

Since CKEditor 4.2 you can also turn `<textarea>` elements into inline editors. When you call the {@linkapi CKEDITOR.inline CKEDITOR.inline} method on a `<textarea>`, an additional `<div>` element with inline editing enabled will replace the original `<textarea>`.

## Inline Editing Demo

See the {@linksdk inline working "Inline Editor" sample} that showcases a few usage scenarios for inline editing.

## Further Reading

Check the following articles to learn more about other editor types and learn how to get and save the editor data:

* {@link guide/dev/framed/README Classic editing} is the usage scenario where the editor is most often represented by a toolbar and an editing area placed in a specific position on the page, usually as a part of a form that you use to submit some content to the server.
* {@link guide/dev/savedata/README Getting and Saving Data in CKEditor} explains how to retrieve data from any editor instance and send it to your server.
