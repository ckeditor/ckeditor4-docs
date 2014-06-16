# Creating Captioned Images

<p class="requirements">
	This feature was introduced in CKEditor 4.3.
</p>

The optional [Enhanced Image](http://ckeditor.com/addon/image2) plugin introduces a new widget type &mdash; a captioned image. It replaces the standard [Image](http://ckeditor.com/addon/image) plugin with a new captioned image that has the following capabilities:

* It allows for adding **image captions** (that will not be separated from the image when its location changes).
* It has [all advantages of widgets](#!/guide/dev_widgets-section-common-usage-scenarios), i.e. you can **treat the image and its caption as one entity** and select, delete, or move it in the editor content area as a whole.
* It supports **drag and drop** for changing the image position.
* It provides **image alignment**, including centering, with inline styles or CSS classes.
* It includes hassle-free dynamic **"click and drag" resizing**.

The following image shows a captioned image inserted into the editor content. When you hover it with your mouse, the editable areas (the image and its caption) become outlined. The resizing and positioning handles along with their tooltips will appear, too.

{@img captionedimage_01.png}

## File Browser Integration

The Enhanced Image plugin can be [integrated with a file browser](#!/guide/dev_file_browse_upload) like [CKFinder](http://cksource.com/ckfinder) just like the standard Image plugin. Thanks to this you will be able to upload your images to the server or browse the server for images to be inserted into the editor content.

The image below shows the plugin's Image Properties dialog window with the file browser integrated. The Browse Server button as well as the Upload tab will appear.

{@img captionedimage_02.png}

## Captioned Image Demo 

See the [working Creating Captioned Images sample](../samples/captionedimage.html) that showcases the Enhanced Image plugin with its captioning, "drag and drop" positioning and "click and drag" resizing.