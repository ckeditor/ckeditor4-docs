# Automatic Editor Height Adjustment to Content

The optional [Auto Grow](http://ckeditor.com/addon/autogrow) plugin makes it possible to configure CKEditor to automatically expand and shrink vertically depending on the amount and size of content entered in its editing area.

{@img autogrow_01.png}

Notice how the editor instance shown above has grown to fit the entire standard CKEditor demo text! See also the [working Automatic Editor Height Adjustment to Content](../samples/autogrow.html) along with its source code, ready to copy and implement with your own CKEditor instance.

## Minimum and Maximum Height

It is possible to fine-tune the automatic editor height adjustment by setting the minimum and maximum height that the editor will shrink and expand to, respectively.

* The CKEDITOR.config.autoGrow_minHeight option defines the minimum height that the editor will always assume, no matter how much content it includes.
* The CKEDITOR.config.autoGrow_maxHeight option can be set in order to prevent the situation where huge amounts of content will cause the editor to expand infinitely.

In the following example the editor will grow and shrink with the amount of content, but it will always be at least 300 pixels high and will never exceed the height of 600 pixels:

    config.extraPlugins: 'autogrow';
    config.autoGrow_minHeight: 300;
    config.autoGrow_maxHeight: 600;

{@img autogrow_02.png}

With these options set, the editor will only expand to 600 pixels high. For longer content scrollbars will appear. At thesame time, when you start deleting the content, you will see that the editor stops shrinking at 300 pixels high.
    
## Height Adjustment on Startup

By default, the editor with the Auto Grow feature enabled will adjust its height once it gets into focus, so the page that includes it will be partly redrawn. You can, however, prevent this behavior by using the CKEDITOR.config.autoGrow_onStartup option to make the editor grow the moment it is created, i.e. on page startup.

    config.autoGrow_onStartup: true;

This will ensure no page redrawing will be needed &mdash; until you start modifying the content.

## Stylistic Fine-tuning

An additional CKEDITOR.config.autoGrow_bottomSpace option lets you insert some extra space that will always be added between the content and the editor bottom bar. For example, you can set it to 50 pixels in order to prevent the editor from looking too cramped.

    config.autoGrow_bottomSpace: 50;

With this setting in place, the 50-pixel-high space below the content will always be preserved.