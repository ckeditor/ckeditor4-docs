---
category: file-manager
order: 60
url: guide/dev_ckfinder_integration
menu-title: CKFinder Integration
meta-title-short: CKFinder Integration
---
# CKFinder Integration

The aim of this article is to explain how to integrate CKEditor 4 with [CKFinder](https://ckeditor.com/ckfinder/), a powerful and easy to use Ajax file manager and uploader. See [the demo](https://ckeditor.com/docs/ckfinder/demo/ckfinder3/samples/ckeditor.html) for a live demonstration.

<info-box info="">
	CKFinder is a <a href="https://ckeditor.com/ckfinder/">commercial application</a> that was designed with CKEditor compatibility in mind. It is currently available as version 3.x for PHP, ASP.NET and Java and version 2.x for ASP and ColdFusion.
</info-box>

## CKFinder 3

[CKFinder 3](https://ckeditor.com/ckfinder/) is available for PHP, ASP.NET and Java.

The integration with CKFinder 3 can be conducted in two ways:

* Using the `CKFinder.setupCKEditor()` method.
* Manually, by passing additional configuration settings to the CKEditor instance.

The image below shows CKFinder 3 integrated with CKEditor 4, with the file manager being opened from the editor Image Properties dialog window.

{@img assets/img/ckeditor_with_ckfinder3.png CKFinder 3 file manager integrated with CKEditor 4 WYSIWYG editor}

### Using `CKFinder.setupCKEditor()`

The simplest way to integrate CKFinder 3 with CKEditor 4 is using the [`CKFinder.setupCKEditor()`](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/api/CKFinder-method-setupCKEditor) method.

This method takes the CKEditor instance which will be set up as the first argument (`editor`). If no argument is passed or the `editor` argument is null, CKFinder will integrate with all CKEditor 4 instances.

```js
var editor = {@linkapi CKEDITOR.replace CKEDITOR.replace}( 'editor1' );
CKFinder.setupCKEditor( editor );
```

Please check the `samples/ckeditor.html` sample distributed with CKFinder 3 to see the full working example of this integration method.

Refer to the [CKFinder 3 documentation](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_ckeditor-section-ckfinder.setupckeditor%28%29) for more details and examples of:

* Integrating CKFinder with a selected CKEditor 4 instance.
* Integrating CKFinder with all existing and future CKEditor 4 instances.
* Passing CKFinder configuration options while integrating with CKEditor 4.

### Manual Integration with Configuration Settings

In order to manually configure CKEditor 4 to use CKFinder, you need to pass additional configuration settings to the CKEditor instance.

For example, to enable CKFinder in a CKEditor instance using the same settings for all editor dialog windows:

```js
CKEDITOR.replace( 'editor1', {
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
	filebrowserWindowWidth: '1000',
	filebrowserWindowHeight: '700'
} );
```

See the [CKFinder 3 documentation](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_ckeditor-section-manual-integration) for more details and examples of:

* Setting the {@linkapi CKEDITOR.config#filebrowserBrowseUrl `config.filebrowserBrowseUrl`} and {@linkapi CKEDITOR.config#filebrowserUploadUrl `config.filebrowserUploadUrl`} options.
* Setting available resource types.
* Changing the file manager window size.
* Setting target resource type and target folder for quick uploads.
* Providing different configuration for selected CKEditor 4 dialog windows.

## CKFinder 2

The integration with CKFinder 2 may be conducted in two ways:

* By using the [`CKFinder.setupCKEditor()`](https://docs-old.ckeditor.com/ckfinder_2.x_api/symbols/CKFinder.html#.setupCKEditor) method available in the [CKFinder 2 API](https://docs-old.ckeditor.com/ckfinder_2.x_api/).
* Manually, by setting CKEditor 4 configuration options.

The image below shows CKFinder 2 integrated with CKEditor, with the file manager being opened from the editor Image Properties dialog window.

{@img assets/img/ckeditor_with_ckfinder.png CKFinder 2 file manager integrated with CKEditor 4 WYSIWYG editor}

### Using `CKFinder.setupCKEditor()`

The example below shows the use of the [`CKFinder.setupCKEditor()`](https://docs-old.ckeditor.com/ckfinder_2.x_api/symbols/CKFinder.html#.setupCKEditor) method to insert a CKEditor 4 instance with CKFinder 2 integrated.

This method takes the CKEditor instance which will be set up as the first argument (`editor`). If no argument is passed or the `editor` argument is null, CKFinder will integrate with all CKEditor instances.

The second parameter of the `CKFinder.setupCKEditor()` method is the file manager configuration which may be just the path to the CKFinder installation.

```js
var editor = {@linkapi CKEDITOR.replace CKEDITOR.replace}( 'editor1' );
CKFinder.setupCKEditor( editor, '/ckfinder/' );
```

Please check the `_samples/ckeditor.html` sample distributed with CKFinder 2 to see the full working example of this integration method.

Refer to the appropriate "CKEditor Integration" article of the [CKFinder 2 Developer's Guide](https://docs-old.ckeditor.com/CKFinder_2.x/Developers_Guide) for more details and examples of:

* Integrating CKFinder with a selected CKEditor 4 instance.
* Integrating CKFinder with all existing and future CKEditor 4 instances.
* Passing CKFinder configuration options while integrating with CKEditor 4.

### Manual Integration with Configuration Settings

In order to manually configure CKEditor 4 to use CKFinder, you need to pass additional configuration settings to the CKEditor instance.

The sample below shows the configuration code that can be used to insert a CKEditor instance with CKFinder integrated. The browse and upload paths for images are configured separately from CKFinder default paths. The file manager window size was also set.

```js
CKEDITOR.replace( 'editor1', {
	filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
	filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?Type=Images',
	filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
	filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
	filebrowserWindowWidth : '1000',
	filebrowserWindowHeight : '700'
});
```

The example above is valid for the PHP environment. Note that `/ckfinder/` is a base path to the CKFinder 2 installation directory.

If you are using CKFinder 2 for ASP, ASP.NET, Java, or ColdFusion, remember to change `php` above to the correct extension:

* `asp` &ndash; [CKFinder for ASP](https://docs-old.ckeditor.com/CKFinder_2.x/Developers_Guide/ASP/CKEditor_Integration)
* `aspx` &ndash; [CKFinder for ASP.NET](https://docs-old.ckeditor.com/CKFinder_2.x/Developers_Guide/ASP.NET/CKEditor_Integration)
* `cfm` &ndash; [CKFinder for ColdFusion](https://docs-old.ckeditor.com/CKFinder_2.x/Developers_Guide/ColdFusion/CKEditor_Integration)
* `java` &ndash; [CKFinder for Java](https://docs-old.ckeditor.com/CKFinder_2.x/Developers_Guide/Java/CKEditor_Integration)
* `php` &ndash; [CKFinder for PHP](https://docs-old.ckeditor.com/CKFinder_2.x/Developers_Guide/PHP/CKEditor_Integration)

## Further Reading

For more information on integrating CKEditor 4 with a file manager refer to the following articles:

* {@link guide/dev/integration/file_browse_upload/README File Manager Integration}
* {@link guide/dev/integration/file_browse_upload/file_manager_configuration/README Advanced File Manager Configuration}
* {@link guide/dev/integration/file_browse_upload/file_browser_api/README File Browser API - Creating a Custom File Manager}
* {@link guide/dev/integration/file_browse_upload/dialog_add_file_browser/README Adding the File Manager to Dialog Windows}
* {@link guide/dev/integration/file_browse_upload/file_upload/README Uploading Pasted and Dropped Files}
