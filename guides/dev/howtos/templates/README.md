# Templates

## How Do I Add Custom CKEditor Templates?

To add new templates, create a custom JavaScript file containing your template definitions. You can base your file on the built-in `default.js` file that can be found in the `plugins/templates/templates/` directory of CKEditor.

When your definitions are ready, use the {@link CKEDITOR.config#templates_files templates_files} configuration setting to point to the custom template definition file.

	config.templates_files = [ '/mytemplates.js' ];

More details on defining custom templates can be found in the [Templates](#!/guide/dev_templates) article of the [CKEditor 3.x Developer's Guide](#!/guide/dev).