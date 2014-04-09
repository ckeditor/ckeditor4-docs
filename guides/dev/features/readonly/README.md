# Read-Only Mode

CKEditor API includes a few features that make it possible to **render the editor content read-only** (and thus impossible for the user to edit). At the same time some editor features that will not cause the user to modify the content will still be available. This includes, for example, the view of the content source code or features such as preview or editor interface maximization within the browser window. 

The most crucial element of the API is the [setReadOnly()](#!/api/CKEDITOR.editor-method-setReadOnly) method which puts the editor into the read-only state and restores it to the editable state.

When the editor goes from the editable into the read-only state, its [readOnly](#!/api/CKEDITOR.editor-property-readOnly) property is being set to `true` (for read-only mode) or `false` (for editable mode). The [readOnly](#!/api/CKEDITOR.editor-event-readOnly) event is also fired after each change of the `readOnly` property.

This is what CKEditor looks like when it is in read-only mode.

{@img readonly_01.png}

## Read-Only Mode on Startup

CKEditor can be configured to open in the read-only mode on startup by setting the [config.readOnly](#!/api/CKEDITOR.config-cfg-readOnly) configuration option to `true`. For example:

    config.readOnly = true;
    
The same can be achieved by setting the `disabled` attribute for the `<textarea>` element that CKEditor replaces.

## Read-Only Mode Demo

See also the [working Read-Only Mode sample](../samples/readonly.html) that showcases toggling between the read-only and editable mode.