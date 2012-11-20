# Integration


## How Do I Use CKEditor with an ASP.NET Page?

If you want to use CKEditor on your ASP.NET page, check the official **CKEditor.NET Control**. You can download it from the [CKEditor download site](http://ckeditor.com/download) and the full documentation along with installation instructions is available at [http://docs.cksource.com/CKEditor.NET](http://docs.cksource.com/CKEditor.NET).

After you download the installation package, do not forget to check the samples that are located in the `_Samples/` folder and can be run as a [standalone application](#!/guide/dev_aspnet_samples) without much work on your side.


## How Do I Integrate CKEditor with a Java Page?

If you want to use CKEditor on your Java page, check the official **CKEditor for Java** release. You can download it from the [CKEditor download site](http://ckeditor.com/download) and the documentation along with installation instructions is available [here](#!/guide/dev_java_integration).

After you download the installation package, do not forget to check the samples that are located in the `_samples/` folder and can be run as a standalone application without much work on your side.


## How Do I Integrate CKEditor with Drupal?

We have created a dedicated CKEditor for Drupal module that comes in two versions.

The first, commercial one includes a [CKFinder](http://ckfinder.com/) license as well as a dedicated e-mail support channel that you can use if you need help to install, configure, or customize the component. You can find it on the [official CKEditor website](http://ckeditor.com/ckeditor-for-drupal) along with [extensive documentation](http://docs.cksource.com/CKEditor_for_Drupal).

There is also a free version that is available on its official website: [http://drupal.org/project/ckeditor](http://drupal.org/project/ckeditor). This does not include a CKFinder license, although the support for this file browser is built-in and you can enable it after you buy a license. The e-mail support channel is also not available. You can, of course, buy a separate CKFinder license at any time after you install the module or add a custom file browser solution and integrate it with the editor.

### Installation

Whichever version you choose, the installation process is similar.

For the commercial module, use the instructions provided in the [Installation](http://docs.cksource.com/CKEditor_for_Drupal/Installation) section of the documentation.

For the free version, [download](http://drupal.org/project/ckeditor) the module (use a version that is appropriate for your Drupal release — 6 or 7) and unpack it. Upload it to the `sites/all/modules/` directory.

Download the latest CKEditor version from the official download page for the editor: [http://ckeditor.com/download](http://ckeditor.com/download).
Unpack it and upload to the `sites/all/modules/ckeditor/ckeditor/` directory.

Finally, enable the module in the administration panel and configure it to customize it to your needs.

{@img ../../images/drupal.png Configuration panel of CKEditor module for Drupal}

You can check the [demo site](http://drupal.ckeditor.com/) of **CKEditor + Drupal** to see the module at work as well as find some installation tips and screencasts.


## How Do I Integrate CKEditor with WordPress?

Use the dedicated **CKEditor for WordPress** plugin that is available on its official website: [http://wordpress.org/extend/plugins/ckeditor-for-wordpress/](http://wordpress.org/extend/plugins/ckeditor-for-wordpress/).

Download the plugin, unpack it, and upload to the `/wp-content/plugins/` directory. Go to the **Plugins** menu and activate the **CKEditor for WordPress** plugin.

You can check the [demo site](http://wordpress.ckeditor.com/) of **CKEditor + WordPress** to see the plugin at work as well as find some configuration instructions and tips.

{@img ../../images/wordpress.png CKEditor for WordPress plugin configuration panel}


## How Do I Integrate CKEditor with Joomla?

We have created a dedicated **CKEditor for Joomla!** component that comes in two versions.

The first, commercial one includes a [CKFinder](http://ckfinder.com/) license as well as a dedicated e-mail support channel that you can use if you need help to install, configure, or customize the component. You can find it on the [official CKEditor](http://ckeditor.com/ckeditor-for-joomla) website along with [extensive documentation](http://docs.cksource.com/CKEditor_for_Joomla).

There is also a free version that is available on its official website: [http://extensions.joomla.org/extensions/edition/editors/12821](http://extensions.joomla.org/extensions/edition/editors/12821). This does not include a CKFinder license, although the support for this file browser is built-in and you can enable it after you buy a license. The e-mail support channel is also not available. You can, of course, buy a separate CKFinder license at any time after you install the component or add a custom file browser solution and integrate it with the editor.

Whichever version you choose, the installation process is similar. Download the component and install it with the **Joomla! Extension Manager**. After that you need to set CKEditor as the default Joomla! editor by going to the **Site -> Global Configuration** section in Joomla! administration panel.

After the installation the **CKEditor** option will apprear in the **Components** menu. You can use it to configure the extension and customize it to your own needs.

{@img ../../images/joomla.png CKEditor for Joomla! extension configuration panel}


## How Do I Add My CKFinder License to Joomla?

Depending on the version of the CKEditor for Joomla! component, adding a valid CKFinder license differs slightly.

### Commercial CKEditor for Joomla! Component

If you are using a [commercial version of the CKEditor for Joomla! component](http://ckeditor.com/ckeditor-for-joomla) (that includes a [CKFinder](http://ckfinder.com/) license and a dedicated e-mail support channel), you do not need to enter the details of the CKFinder license separately. Your Joomla! component license will also cover the file browser.

Go to the **Components** menu of your Joomla! administration panel and choose **CKEditor** to enter the **CKEditor Configuration** section. Choose the **License Information** tab and enter your license name and key in the provided fields.

{@img ../../images/joomla_license_1.png Entering CKEditor for Joomla license data in Joomla!}

CKFinder should be enabled by default. If, however, it is not, go to the **File Browser Settings** tab and turn it on by selecting **Enabled** in the **CKFinder** field.

### Free CKEditor for Joomla! Component

If you are using the [free CKEditor for Joomla! extension](http://extensions.joomla.org/extensions/edition/editors/12821), you can always purchase a CKFinder license separately and add it to the component manually. The support for CKFinder is built-in, you only need to download and unpack the CKFinder files to the `joomla_site/plugins/editors/ckeditor/ckfinder/` directory, rename the `config_joomla.php` file to `config.php` and enable the file browser.

Go to the **Components** menu of your Joomla! administration panel and choose **CKEditor** to enter the **CKEditor Configuration** section. Choose the **File Browser Settings** tab. Turn on the file browser by selecting **Enabled** in the **CKFinder** field.

Go to the **License information** section. In the **License name** and **License key** fields enter the license data that you received by e-mail on buying the [CKFinder license](http://ckfinder.com/purchase).

{@img ../../images/joomla_license_2.png Entering CKFinder license data in Joomla!}

The licensed CKFinder version will become unlocked and the "demo" version messages will disappear.