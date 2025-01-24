---
category: howtos
order: 60
url: guide/dev_howtos_interface
menu-title: Interface
meta-title-short: Interface
---
<!--
Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Interface

The following article contains tips about customizing the editor interface, including its size, toolbar and the elements path.

## How Do I Remove the Elements Path?

The **elements path** displays information about the HTML elements of the document for the position of the cursor.

{@img assets/img/elementspath_03.png The elements path of CKEditor}

If you want to get rid of it, it is most recommended that you remove the [Elements Path](https://ckeditor.com/cke4/addon/elementspath) plugin in [online builder](https://ckeditor.com/cke4/builder) when creating your custom build.

Alternatively, you can use the {@linkapi CKEDITOR.config.removePlugins CKEDITOR.config.removePlugins} setting to remove the plugin:

	config.removePlugins = 'elementspath';


## How Do I Change the Size of the Editor?

Refer to the {@link features/size/README Setting Editor Size} article.

## How Do I Change the Size of the Editor on the Fly?

Refer to the {@link features/resize/README Editor Resizing Customization} article.

## How Do I Remove the Ability to Resize CKEditor 4?

Refer to the {@link features/resize/README Editor Resizing Customization} article.

## How Do I Limit the Width and Height for CKEditor 4 Resizing?

Refer to the {@link features/resize/README Editor Resizing Customization} article.

## How Do I Limit the Directions for CKEditor 4 Resizing to Horizontal or Vertical Only?

Refer to the {@link features/resize/README Editor Resizing Customization} article.

## How Do I Add the Toolbar Collapse Button?

CKEditor 4 toolbar can be collapsed and restored by using the **Collapse Toolbar** button located in the bottom right-hand corner of the toolbar (for RTL languages — in the bottom left-hand corner). By default, the Collapse Toolbar feature is disabled.

{@img assets/img/toolbarcollapse_01.png The Collapse Toolbar button in CKEditor}

If you want to enable this feature, you need to set the {@linkapi CKEDITOR.config#toolbarCanCollapse CKEDITOR.config#toolbarCanCollapse} option to `true`:

	config.toolbarCanCollapse = true;

## How Do I Add or Remove Toolbar Buttons?

CKEditor 4 {@linkapi CKEDITOR.config#toolbar toolbar} is an array of button elements that you can freely add or remove.

{@img assets/img/toolbar_05.png The CKEditor toolbar}

Since version 4.5 each CKEditor installation package includes a handy tool called Toolbar Configurator that makes toolbar customization a breeze. Please refer to the {@link features/toolbar/README Toolbar Configuration} article for more information on how to use it.

## How Do I Navigate CKEditor 4 Using the Keyboard?

The {@link guide/dev/a11y/README Accessibility Support in CKEditor} contains lots of useful information on using the CKEditor 4 interface with your keyboard or with assistive devices such as screen readers.

CKEditor 4 takes part in the <kbd>Tab</kbd> order of a web page that it is embedded in. Read more {@link features/tabindex/README here} and see the {@linkexample tabindex working demo} here.

Many functions in CKEditor 4 have their equivalent keyboard shortcuts. This is one of the reasons why working with the editor is simple and efficient.

The {@link features/shortcuts/README Keyboard Shortcuts} article describes available keyboard shortcuts grouped by problem areas.


## How Do I Configure CKEditor 4 to Use the `Arrow` Keys to Navigate Between All Toolbar Buttons?

In [CKEditor 3.6](https://ckeditor.com/blog/CKEditor-3.6-Released/) the concept of **toolbar button groups** was introduced to enable faster and more efficient navigation using the keyboard or assistive devices. In all previous versions of the editor, the <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> keys had the same effect as using the <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd> keys and were used to cycle between consecutive toolbar buttons.

Since CKEditor 3.6, <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> navigate between toolbar button groups, while the <kbd>Arrow</kbd> keys are used to cycle between the buttons within a group.

In order to change the default toolbar navigation mode and use the <kbd>Arrow</kbd> keys as an equivalent to <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd>, use the following {@linkapi CKEDITOR.config#toolbarGroupCycling CKEDITOR.config#toolbarGroupCycling} configuration setting:

	config.toolbarGroupCycling = false;

Please note that it is not recommended to change this setting to `false` due to accessibility reasons.
