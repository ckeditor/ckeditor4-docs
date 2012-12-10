# Plugins

CKEditor is totally based on plugins. In fact, the editor core is an empty box, which is them filled with features provided by plugins. Even the editor interface, like toolbars, buttons and the editing area are plugins.

The default installation of CKEditor, that you probably are using now, comes with a set of plugins present on it. You can add plugins into your editor, bring nice and useful features for your users.

## Where to look for plugins?

The [CKEditor Add-ons Repository](http://ckeditor.com/addons/plugins) is an online service designed to find and share plugins. It makes it easy to understand the plugins features and to socialize with the CKEditor community. It's also the best place to showcase your skills and reach a large user base, if you are a plugin developer.

## Creating a Custom Editor with CKBuilder

CKBuilder is the sister service of the CKEditor Add-ons Repository, making it possible to create a customized editor, by selecting plugins the plugins that best fit your needs.

Through the navigation of the add-ons repository, you'll be able to use the "Add to my editor button" to send your preferred plugins to your custom editor. Once done, you can simply download it an enjoy an editing experience that is perfect for your needs.

## Installing Plugins Manually

If you prefer not to use CKBuilder, if you have plugins developer by yourself of by third parties or if you just want to test plugins before going through the CKBuilder process, you can also add plugins to your local installation, by following a few steps:


 1. **Extracting the zip file:** Plugins are usually available as zip files. So, to start, be sure to have the zip extracted into a folder.

 2. **Copying the files into CKEditor:** The easiest way to install the files is by simply copying them into the `plugins` folder of your CKEditor installation. They must be placed into a sub-folder that matches the "technical" name of the plugin. For example, the [Magic Line plugin](http://ckeditor.com/addon/magicline) would be installed into this folder: `<CKEditor folder>/plugins/magicline`.

 3. **Enabling the plugin:** Now it is time to tell CKEditor that you have a new plugin for it. For that, you simply use the {@link CKEDITOR.config#extraPlugins extraPlugins} configuration option:

		config.extraPlugins = 'magicline';

That's all. Your plugin will be now enabled in CKEditor.