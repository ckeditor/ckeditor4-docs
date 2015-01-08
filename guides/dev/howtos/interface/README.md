<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Interface


## How Do I Remove the Elements Path?

The **elements path** displays information about the HTML elements of the document for the position of the cursor.

{@img ui_elements_path.png The elements path of CKEditor}

If you want to get rid of it, use the CKEDITOR.config.removePlugins setting to remove the `elementspath` plugin.

	config.removePlugins = 'elementspath';


## How Do I Change the Size of the Editor?

Refer to the [Setting Editor Size](#!/guide/dev_size) article.

## How Do I Change the Size of the Editor on the Fly?

Refer to the [Editor Resizing Customization](#!/guide/dev_resize) article.

## How Do I Remove the Ability to Resize CKEditor?

Refer to the [Editor Resizing Customization](#!/guide/dev_resize) article.

## How Do I Limit the Width and Height for CKEditor Resizing?

Refer to the [Editor Resizing Customization](#!/guide/dev_resize) article.

## How Do I Limit the Directions for CKEditor Resizing to Horizontal or Vertical Only?

Refer to the [Editor Resizing Customization](#!/guide/dev_resize) article.

## How Do I Add the Toolbar Collapse Button?

CKEditor toolbar can be collapsed and restored by using the **Collapse Toolbar** button located in the bottom right-hand corner of the toolbar (for RTL languages — in the bottom left-hand corner).

{@img ui_collapse.png The Collapse Toolbar button in CKEditor}

If you want to enable this feature, you need to set the {@link CKEDITOR.config#toolbarCanCollapse toolbarCanCollapse} parameter to `true`.

	config.toolbarCanCollapse = true;

## How Do I Add or Remove Toolbar Buttons?

CKEditor {@link CKEDITOR.config#toolbar toolbar} is an array of button elements that you can freely add or remove.

{@img ui_toolbar.png The CKEditor toolbar}

Check the [Toolbar Customization](#!/guide/dev_toolbar) section of this guide for more information on how to customize it.


## How Do I Navigate CKEditor Using the Keyboard?

[CKEditor Accessibility Guide](http://docs.cksource.com/CKEditor_3.x/Accessibility) contains lots of useful information on using the CKEditor interface with your keyboard or with assistive devices such as screen readers.

Many functions in CKEditor have their equivalent keyboard shortcuts. This is one of the reasons why working with the editor is simple and efficient.

The [Keyboard Shortcuts](http://docs.cksource.com/CKEditor_3.x/Users_Guide/Keyboard_Shortcuts) article describes available keyboard shortcuts grouped by problem areas.


## How Do I Configure CKEditor to Use the `Arrow` Keys to Navigate Between All Toolbar Buttons?

In [CKEditor 3.6](http://ckeditor.com/blog/CKEditor_3.6_released) the concept of **toolbar button groups** was introduced to enable faster and more efficient navigation using the keyboard or assistive devices. In all previous versions of the editor, the `Tab` and `Shift+Tab` keys had the same effect as using the `Right` and `Left Arrow` keys and were used to cycle between consecutive toolbar buttons.

Since CKEditor 3.6, Tab and `Shift+Tab` navigate between toolbar button groups, while the `Arrow` keys are used to cycle between the buttons within a group.

In order to change the new default toolbar navigation mode and use the `Arrow` keys as an equivalent to `Tab` and `Shift+Tab`, use the following {@link CKEDITOR.config#toolbarGroupCycling toolbarGroupCycling} configuration setting:

	config.toolbarGroupCycling = false;