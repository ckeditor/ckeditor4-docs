---
category: advanced-concepts
order: 100
url: guide/skin_sdk_hc
menu-title: High Contrast
meta-title-short: High Contrast
---
<!--
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# High Contrast Compatibility

Microsoft Windows operating systems offer an accessibility feature called "High Contrast", which turns the entire system UI into a two-color environment. This can be controlled by the user and usually the UI is shown as "black on white" or "white on black". This feature is used by people with visual disabilities that make it hard to identify contrast differences of object colors.

In High Contrast, all colors go away. Most of the application UIs become just lines and boxes holding text labels or black and white icons.

To quickly enable High Contrast on Windows, use the <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>PrntScr</kbd>. Do that now! Additional settings can be controlled in the Windows Control Panel.

CKEditor 4 offers great support for High Contrast, limited to Firefox, Edge and Internet Explorer (as other browsers do not support this feature). When enabled, the editor is rendered as clear lines and the toolbar buttons present text labels instead of icon images.

Skin developers must take this into consideration and make the necessary CSS styling to support High Contrast. This can be done by using the `.cke_hc` class name, which is set at the outer element of the editor UI. Usage examples can be found in the {@link guide/skin_sdk/intro/README#the-moono-skin Moono skin} files.
