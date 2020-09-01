---
category: getting-started
order: 20
url: guide/dev_installation
menu-title: Quick Start Guide
meta-title-short: Quick Start Guide
---
<!--
Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# CKEditor 4 Quick Start Guide

The aim of this article is to get you up and running with CKEditor 4 in two minutes.

## Install from the npm Registry

To install [the official CKEditor 4 npm package](https://www.npmjs.com/package/ckeditor4) run:

```
npm install ckeditor4
```

For more detailed information you can check the guide on {@link guide/dev/package_managers/README Installing CKEditor 4 with Package Managers}.

## Download from Official Site

### Download

Visit the official [CKEditor 4 Download](https://ckeditor.com/ckeditor-4/download/) site. For a production site we recommend you choose the default **Standard Package** and click the **Download** button to get the `.zip` installation file. If you want to try out more editor features, you can download the **Full Package** instead.

<a href="https://ckeditor.com/ckeditor-4/download/"><img src="%BASE_PATH%/assets/img/ckeditor_quick_start_download.png" alt="CKEditor 4 Download site" width="914" height="440"/></a>

### Unpacking

Unpack (extract) the downloaded `.zip` archive to the `ckeditor4` directory in the root of your website.

## Using the CDN

Instead of downloading CKEditor 4 to your server and hosting it you can also use the CDN version. Go to the [official CKEditor CDN](http://cdn.ckeditor.com/) page for more details.

## Integrate with Popular Frameworks

### CKEditor 4 Angular Integration

To install the official CKEditor 4 Angular component, run:

```
npm install ckeditor4-angular
```

By default it will automatically fetch the latest CKEditor 4 [standard-all preset](https://ckeditor.com/cke4/presets-all) via CDN. Check the {@link guide/dev/integration/angular/README Angular Integration guide} on how it can be changed and how to configure the component to fit you needs.

### CKEditor 4 React Integration

To install the official CKEditor 4 React component, run:

```
npm install ckeditor4-react
```

By default it will automatically fetch the latest CKEditor 4 [standard-all preset](https://ckeditor.com/cke4/presets-all) via CDN. Check the {@link guide/dev/integration/react/README React Integration guide} on how it can be changed and how to configure the component to fit you needs.

### CKEditor 4 Vue Integration

To install the official CKEditor 4 Vue component, run:

```
npm install ckeditor4-vue
```

By default it will automatically fetch the latest CKEditor 4 [standard-all preset](https://ckeditor.com/cke4/presets-all) via CDN. Check the {@link guide/dev/integration/vue/README Vue Integration guide} on how it can be changed and how to configure the component to fit you needs.

## Trying Out

CKEditor 4 comes with a sample that you can check to verify if the installation was successful as well as a few "next steps" ideas and references to further resources.

Open the following page in the browser to see the sample:
`http://<your site="">/ckeditor4/samples/index.html`

When using the npm package open the following:
`http://<your site="">/node_modules/ckeditor4/samples/index.html`

<img src="%BASE_PATH%/assets/img/ckeditor_sample.png" alt="CKEditor 4 sample available in each installation package" width="802" height="530">

Additionally, you can click the Toolbar Configurator button on the editor sample page to open a handy tool that will let you {@link features/toolbar/README adjust the toolbar} to your needs.

## Adding CKEditor 4 to Your Page

If the sample works correctly, you are ready to build your own site with CKEditor 4 included.

To start, create a simple HTML page with a `<textarea>` element in it. You will then need to do two things:

1. Include the `<script>` element loading CKEditor 4 in your page.
2. Use the {@linkapi CKEDITOR#replace `CKEDITOR.replace()`} method to replace the existing `<textarea>` element with CKEditor 4.

See the following example:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>A Simple Page with CKEditor 4</title>
        <!-- Make sure the path to CKEditor is correct. -->
        <script src="../ckeditor.js"></script>
    </head>
    <body>
        <form>
            <textarea name="editor1" id="editor1" rows="10" cols="80">
                This is my textarea to be replaced with CKEditor 4.
            </textarea>
            <script>
                // Replace the <textarea id="editor1"> with a CKEditor 4
                // instance, using default configuration.
                {@linkapi CKEDITOR.replace CKEDITOR.replace}( 'editor1' );
            </script>
        </form>
    </body>
</html>
```

When you are done, open your test page in the browser.

**Congratulations! You have just installed and used CKEditor 4 on your own page in virtually no time!**

{@img assets/img/ckeditor_on_page.png CKEditor 4 added to your sample page}

## Next Steps

Go ahead and play a bit more with the sample; try to change your configuration as suggested to customize it. And when you are ready to dive a bit deeper into CKEditor 4, you can try the following:

1. Check the {@link guide/dev/configuration/README Setting Configuration} article to see how to adjust the editor to your needs.
1. Get familiar with {@link guide/dev/acf/README Advanced Content Filter}. This is a useful tool that adjusts the content inserted into CKEditor 4 to the features that are enabled and filters out disallowed content.
1. {@link features/toolbar/README Modify your toolbar} to only include the features that you need. You can find the useful visual toolbar configurator directly in your editor sample.
1. Learn about CKEditor 4 features in the {@link features/index Features Overview} section.
1. Visit the {@linkexample index CKEditor 4 Examples} to see the **huge collection of working editor samples** showcasing its features, with source code readily available to see and download.
1. Browse the [Add-ons Repository](https://ckeditor.com/cke4/addons/plugins/all) for some additional plugins or skins.
1. Use [online builder](https://ckeditor.com/cke4/builder) to create your custom CKEditor 4 build.
1. Browse the {@link guide/index Developer's Guide} for some further ideas on what to do with CKEditor 4 and join the CKEditor community at [Stack Overflow](http://stackoverflow.com/questions/tagged/ckeditor) to discuss all CKEditor things with fellow developers!
