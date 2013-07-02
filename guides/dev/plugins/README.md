# Plugins

CKEditor is based on plugins. In fact, the editor core is initially an empty box, which is then filled with features provided by plugins. Even the editor interface, like toolbars, buttons, and the editing area, are plugins, too!

The default installation of CKEditor (that you are probably using now) comes with a set of plugins already included. At any moment you can enrich your editor with additional plugins and as a result, bring new useful features for your users.

## Where to Look for Plugins?

The [CKEditor Add-ons Repository](http://ckeditor.com/addons/plugins) is an online service designed to find and share editor plugins. Its structure, with plugin categories, comprehensive descriptions, and screenshots, makes it easy to understand the plugin features and the comment system lets you socialize with the CKEditor community and provide instant feedback. If you are a plugin developer, the repository is also the best place to showcase your skills and reach a large user base.

## Creating a Custom Editor with CKBuilder

[CKBuilder](http://ckeditor.com/builder) is the sister service of the CKEditor Add-ons Repository. It makes it possible to create a customized editor build by selecting the plugins that best fit your needs.

Throughout the navigation of the add-ons repository you will be able to use the "Add to my editor" button to include plugins of your choice in your custom editor. When you are happy with your custom build, you can simply download it an enjoy an editing experience that is perfectly suited for your needs.

## Installing Plugins Manually

If you prefer not to use CKBuilder, if you have plugins developed by yourself of by third parties, or if you just want to test plugins before going through the CKBuilder process, you can also add plugins to your local installation manually by following the steps described below:


 1. **Extracting the zip file.** Plugins are usually available as `zip` files. Start with extracting the `zip` archive into a folder.

 2. **Copying the files to CKEditor.** The easiest way to install the files is by copying them into the `plugins` folder of your CKEditor installation. Each plugin must be placed in a sub-folder that matches its "technical" name. For example, the [Magic Line plugin](http://ckeditor.com/addon/magicline) would be installed into this folder: `<CKEditor folder>/plugins/magicline`.

 3. **Enabling the plugin.** Finally you need to tell CKEditor that you have a new plugin for it. In order to do that, use the {@link CKEDITOR.config#extraPlugins extraPlugins} configuration setting:

		config.extraPlugins = 'magicline';

That's all. Your plugin will now be enabled in CKEditor.