# Skins

The look and feel of the CKEditor user interface can be adjusted to your taste and customized through skins. Elements like the toolbar, dialog windows, buttons, and even their icons, can be changed to match the style of your website or application.

The default installation of CKEditor comes with the [Moono skin](http://ckeditor.com/addon/moono).

## Where to Look for Skins?

The [CKEditor Add-ons Repository](http://ckeditor.com/addons/skins) is an online service designed to find and share editor skins. Its structure, with comprehensive descriptions and screenshots, makes it easy to understand the skin features and the comment system lets you socialize with the CKEditor community and provide instant feedback. If you are a skin developer, the repository is also the best place to showcase your skills and reach a large user base.

## Downloading CKEditor with your Preferred Skin

[CKBuilder](http://ckeditor.com/builder) is the sister service of the CKEditor Add-ons Repository. It makes it possible to create a customized editor build by selecting the skin that best fit your needs.

Throughout the navigation of the add-ons repository you will be able to use the "Add to my editor" button to include a skin of your choice in your custom editor. When you are happy with your custom build, you can simply download it an enjoy an editing experience that is perfectly suited for your needs.

## Installing Skins Manually

If you prefer not to use CKBuilder, if you have a skin developed by yourself of by third parties, or if you just want to test a skin before going through the CKBuilder process, you can also add a skin to your local installation manually by following the steps described below:


 1. **Extracting the zip file.** Skins are usually available as `zip` files. Start with extracting the `zip` archive into a folder.

 2. **Copying the files to CKEditor.** The easiest way to install the files is by copying them into the `skins` folder of your CKEditor installation. Each skin must be placed in a sub-folder that matches its "technical" name. For example, the [Kama skin](http://ckeditor.com/addon/kama) would be installed into this folder: `<CKEditor folder>/plugins/kama`.

 3. **Enabling the skin.** Finally you need to tell CKEditor that you have a new skin for it to use. In order to do that, use the {@link CKEDITOR.config#skin skin} configuration setting:

		config.skin = 'kama';

That's all. The new skin will now be enabled in CKEditor.