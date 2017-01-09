<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# High Contrast Compatibility

The MS Windows operating systems offers an accessibility feature called "High Contrast", which turns the entire system UI into a two colors environment. This can be controlled by the user, but usual we have "black on white" or "white on black". This feature is used by people with sight disabilities that makes it hard to identify contrast differences on object colors.

In High Contrast, all colors go away. Most of the applications UIs because just lines and boxes holding text labels or black and white icons.

To quickly enable High Contrast easily on Windows, just use <kbd>SHIFT+ALT+PRINT_SCREEN</kbd>. Do that now! Additional settings can be controlled in the Windows Control Panel.

CKEditor offers great support for High Contrast, limited to Firefox and Internet Explorer (other browsers don't support High Contrast).  When enabled, the editor is rendered as clear lines and the toolbar buttons present text labels, instead of icon images.

Skin developers must take this in consideration and make the necessary CSS styling to support High Contrast. This can be easily done by using the `.cke_hc` class name, which is set at the outer element of the editor UI. Usage examples can be find in the [Moono skin](#!/guide/skin_sdk_intro-section-2) files.
