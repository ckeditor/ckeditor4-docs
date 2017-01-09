<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Right-to-Left (RTL) Reading Direction

Most of us are used to read text from the left side of the page to the right, just like this text in English. This sounds obvious, but on several languages used around the world this is not true. They are read starting at the right to the left. This is known as the "RTL" reading (or writing) direction. Some of these languages are Arabic, Hebrew, Persian and Uyghur.

On software, RTL is an important aspect and it is well supported by Operating System and their applications. CKEditor is not an exception and offers exceptional support for RTL user interfaces.

Not that, for an application, RTL means that everything that we are used to see at one side of the screen, goes to the opposite side. If the close button is at top-right, it is move to top-left on RTL. A toolbar starts on the left, it will then start on the right. It is like seeing the application in a mirror.

Skin developers must take this in consideration and make the necessary CSS styling to support RTL interfaces. This can be easily done by using the `.cke_rtl` class name, which is set at the outer element of the editor UI. Usage examples can be find in the [Moono skin](#!/guide/skin_sdk_intro-section-2) files.
