# Skins

The CKEditor user interface look and feel can be totally customized through skins. Elements like the toolbar, dialogs, buttons and even their icons, can be changed to match your preferred style.

The default installation of CKEditor comes with the [Moono skin](http://ckeditor.com/addon/moono).

## Where to look for skins?

The [CKEditor Add-ons Repository](http://preview.ckeditor.com/addons/skins) is an online service designed to find and share skins. It's also the best place to showcase your skills and reach a large user base, if you are a skin developer.

## Downloading CKEditor with your preferred skin

[CKBuilder](http://ckeditor.com/builder) is the sister service of the CKEditor Add-ons Repository, making it possible to create a customized editor with any skin you want.

## Installing Skins Manually

If you prefer not to use CKBuilder, if you have skins developed by yourself of by third parties or if you just want to test skins before going through the CKBuilder process, you can also add skins to your local installation, by following a few steps:


 1. **Extracting the zip file:** Skins are usually available as zip files. So, to start, be sure to have the zip extracted into a folder.

 2. **Copying the files into CKEditor:** The easiest way to install the files is by simply copying them into the `skins` folder of your CKEditor installation. They must be placed into a sub-folder that matches the "technical" name of the skin. For example, the [Kama skin](http://ckeditor.com/addon/kama) would be installed into this folder: `<CKEditor folder>/skins/kama`.

 3. **Enabling the plugin:** Now you must just setup CKEditor, by using the {@link CKEDITOR.config#skin skin} configuration option:

		config.skin = 'kama';

That's all. The new skin will be now enabled in CKEditor.