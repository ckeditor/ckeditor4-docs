---
category: toolbar
order: 60
url: features/toolbarlocation
menu-title: Toolbar Location
meta-title-short: Toolbar Location
---
<!--
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Toolbar Location

CKEditor 4 allows you to customize the editor toolbar location. By default, in {@link guide/dev/framed/README classic}, `iframe`-based editors the toolbar is placed in the top part of the editor UI, above the editing area.

You can, however, use the {@linkapi CKEDITOR.config.toolbarLocation CKEDITOR.config.toolbarLocation} configuration setting to change this option. For the default editor implementation you can choose between the `top` (the default) and the `bottom` setting.

For example, to put the toolbar at the bottom of the interface, use the following option:

    config.toolbarLocation = 'bottom';

To receive the result such as this:

{@img assets/img/toolbarlocation_01.png}

Please note that this option is only applicable to {@link guide/dev/framed/README classic} editor. In case of {@link guide/dev/inline/README inline} editor the toolbar position is set dynamically depending on the position of the editable element on the screen.

## Toolbar Location Demo

See the {@linkexample toolbarlocation working "Toolbar Location Adjustment" sample} that showcases how to place the editor toolbar at the bottom of its interface.

## Related Features

Refer to the following resources for more information about the editor toolbar:

 * The {@link features/toolbar/README Toolbar Configuration} article explains how to set up the editor toolbar using the toolbar configurator (CKEditor 4.5+).
 * The {@link features/toolbarconcepts/README Understanding CKEditor Toolbar Concepts} article explains the basic concepts behind the editor toolbar.
 * The {@link features/sharedspace/README Shared Toolbar and Bottom Bar} feature lets you place the toolbar in a designated page element and share it among multiple editor instances used on one page.
