# CKEditor Section 508 Compliance

This article decribes CKEditor 4 compatibility with [Section 508 Amendment to the Rehabilitation Act of 1973](http://www.state.gov/m/irm/impact/c32157.htm).

The Voluntary Product Accessibility Template (VPAT) for Section 508 can be retrived from the [Department of State IRM Program for Accessible Computer/Communication Technology (IMPACT)](http://www.state.gov/m/irm/impact/126343.htm).

<br style="clear:both">

## Section 1194.21 Software Applications and Operating Systems - Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) When software is designed to run on a system that has a keyboard, product functions shall be executable from a keyboard where the function itself or the result of performing a function can be discerned textually.</td>
<td align="left">All CKEditor features can be reached with keyboard. <a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(b) Applications shall not disrupt or disable activated features of other products that are identified as accessibility features, where those features are developed and documented according to industry standards. Applications also shall not disrupt or disable activated features of any operating system that are identified as accessibility features where the application programming interface for those accessibility features has been documented by the manufacturer of the operating system and is available to the product developer.</td>
<td align="left">CKEditor is an application intended to be run inside a web browser, therefore it does not communicate directly with Assistive Technology. It is, however, developed in a way that ensures its full cooperation with browser accessibility features.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(c) A well-defined on-screen indication of the current focus shall be provided that moves among interactive interface elements as the input focus changes. The focus shall be programmatically exposed so that Assistive Technology can track focus and focus changes.</td>
<td align="left">CKEditor ensures that every focused element of its UI has a visual sign of that fact, e.g. an outline for buttons. Moreover, the editor exposes the currently focused element to Assistive Technology.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(d) Sufficient information about a user interface element including the identity, operation and state of the element shall be available to Assistive Technology. When an image represents a program element, the information conveyed by the image must also be available in text.</td>
<td align="left"><ul> <li>Every UI element that has a changeable state exposes its current state to Assistive Technology via WAI-ARIA bindings.</li> <li>Every UI element that contains an image provides its content as a text via an <code>alt</code> attribute or in another textual representation.</li></ul></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(e) When bitmap images are used to identify controls, status indicators, or other programmatic elements, the meaning assigned to those images shall be consistent throughout an application's performance.</td>
<td align="left">CKEditor uses distinctive icons for all of its features. Icon meanings are also consistent with commonly used icon meanings throughout the software industry.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(f) Textual information shall be provided through operating system functions for displaying text. The minimum information that shall be made available is text content, text input caret location, and text attributes.</td>
<td align="left">CKEditor is built on top of operating system functions for displaying text that are provided by a web browser. All neccessary information is provided to end-user.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(g) Applications shall not override user selected contrast and color selections and other individual display attributes.</td>
<td align="left">
<ul>
<li>CKEditor can use operating system High Contrast mode if it is run in a compliant browser.</li>
<li>CKEditor can by styled with user stylesheets.</li>
</ul></td>
<td align="left">CKEditor is optimized to use with Windows High Contrast mode.</td>
</tr>
<tr>
<td align="left">(h) When animation is displayed, the information shall be displayable in at least one non-animated presentation mode at the option of the user.</td>
<td align="left">N/A</td>
<td align="left">There are no animations in the editor.</td>
</tr>
<tr>
<td align="left">(i) Color coding shall not be used as the only means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.</td>
<td align="left">All information conveyed with color, including the color selector, is also available without color through textual labels or exposing its current value to Assistive Technology.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(j) When a product permits a user to adjust color and contrast settings, a variety of color selections capable of producing a range of contrast levels shall be provided.</td>
<td align="left">
<ul>
<li>CKEditor uses the operating system High Contrast mode if it is run in a compliant web browser.</li>
<li>CKEditor can by styled with user stylesheets.</li>
</ul></td>
<td align="left">CKEditor is optimized to use with Windows High Contrast mode.</td>
</tr>
<tr>
<td align="left">(k) Software shall not use flashing or blinking text, objects, or other elements having a flash or blink frequency greater than 2 Hz and lower than 55 Hz.</td>
<td align="left">N/A</td>
<td align="left">There is no blinking or flickering content in the editor. Moveable UI elements such as dialogs can only be moved in a smooth fashion by the user.</td>
</tr>
<tr>
<td align="left">(l) When electronic forms are used, the form shall allow people using Assistive Technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues.</td>
<td align="left"><ul><li>When CKEditor is embedded inside a form, <kbd>Tab</kbd> order works with the editor like any other regular form input.</li> <li>The editor is designed to let screen readers read out its name.</li> <li>All form elements inside the editor dialogs have proper labels exposed to Assistive Technology. Additionally, all form elements can be reached with keyboard.</li></ul></td>
<td align="left"></td>
</tr>
</tbody></table>

## Section 1194.22 Web-based Internet information and applications – Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) A text equivalent for every non-text element shall be provided (e.g., via <code>alt</code>, <code>longdesc</code>, or in element content).</td>
<td align="left">All images conveying information, such as toolbar icons, are readable in screen readers via a text label or <code>alt</code>.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(b) Equivalent alternatives for any multimedia presentation shall be synchronized with the presentation.</td>
<td align="left">N/A</td>
<td align="left">There is no video or audio content in the editor.</td>
</tr>
<tr>
<td align="left">(c) Web pages shall be designed so that all information conveyed with color is also available without color, for example from context or markup.</td>
<td align="left">
<ul>
<li>Toolbar buttons will appear as textual buttons in operating system High Contrast mode.</li>
<li>Selection of text and background colors is still possible with textual labels in the color selection panels.</li>
</ul></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(d) Documents shall be organized so they are readable without requiring an associated style sheet.</td>
<td align="left">
<ul>
<li>CKEditor and its dialogs are still usable without cascading style sheets.</li>
<li>Toolbar buttons appear as textual links without CSS.</li>
</ul></td>
<td align="left">CKEditor is optimized to use with Windows High Contrast mode.</td>
</tr>
<tr>
<td align="left">(e) Redundant text links shall be provided for each active region of a server-side image map.</td>
<td align="left">N/A</td>
<td align="left">There are no image maps in CKEditor.</td>
</tr>
<tr>
<td align="left">(f) Client-side image maps shall be provided instead of server-side image maps except where the regions cannot be defined with an available geometric shape.</td>
<td align="left">N/A</td>
<td align="left">There are no image maps in CKEditor.</td>
</tr>
<tr>
<td align="left">(g) Row and column headers shall be identified for data tables.</td>
<td align="left">N/A</td>
<td align="left">There are no data tables in the editor UI. Tables are used for layout purpose only and are properly marked as purely presentational not to interfere with the semantic structure of the editor.</td>
</tr>
<tr>
<td align="left">(h) Markup shall be used to associate data cells and header cells for data tables that have two or more logical levels of row or column headers.</td>
<td align="left">N/A</td>
<td align="left">There are no data tables in the editor UI. Tables are used for layout purpose only and are properly marked as purely presentational not to interfere with the semantic structure of the editor.</td>
</tr>
<tr>
<td align="left">(i) Frames shall be titled with text that facilitates frame identification and navigation.</td>
<td align="left">Iframe elements in CKEditor (such as the WYSIWYG editing area and drop-down lists) are given screen reader accessible labels.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(j) Pages shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.</td>
<td align="left">N/A</td>
<td align="left">There is no blinking or flickering content in CKEditor. Moveable UI elements such as dialogs can only be moved in a smooth fashion by the user.</td>
</tr>
<tr>
<td align="left">(k) A text-only page, with equivalent information or functionality, shall be provided to make a web site comply with the provisions of this part, when compliance cannot be accomplished in any other way. The content of the text-only page shall be updated whenever the primary page changes.</td>
<td align="left">CKEditor is designed to progressively enhance an existing <code>textarea</code> or another element with content, so the text-only alternative is available if JavaScript execution is disabled or an error is encountered.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(l) When pages utilize scripting languages to display content, or to create interface elements, the information provided by the script shall be identified with functional text that can be read by Assistive Technology.</td>
<td align="left">All UI elements (e.g. toolbar buttons, dialog tabs) in CKEditor come with screen reader accessible labels.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(m) When a web page requires that an applet, plug-in or other application be present on the client system to interpret page content, the page must provide a link to a plug-in or applet that complies with §1194.21(a) through (l).</td>
<td align="left">N/A</td>
<td align="left">The editor UI does not utilize any plugins or applets.</td>
</tr>
<tr>
<td align="left">(n) When electronic forms are designed to be completed on-line, the form shall allow people using Assistive Technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues.</td>
<td align="left">
<ul>
<li>When CKEditor is embedded inside a form, <kbd>Tab</kbd> order works with the editor like with any other regular form input.</li> <li>CKEditor is designed to let screen readers read out its name.</li>
<li>All form elements inside the editor dialogs have proper labels exposed to Assistive Technology. Additionally, all form elements can be reached with keyboard.</li>
</ul></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(o) A method shall be provided that permits users to skip repetitive navigation links.</td>
<td align="left">
<ul>
<li>Pressing <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> to change focus to CKEditor from the outside will put the focus directly into the editing area, instead of other focusable elements of the editor (e.g. toolbar buttons).</li>
<li>The toolbar can be accessed with <kbd>Alt+F10</kbd> and it is divided into groups that can be navigated with the <kbd>Tab</kbd> key. The navigation inside those groups is possible with <kbd>Arrow</kbd> keys.</li>
<li><a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</li>
</ul></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(p) When a timed response is required, the user shall be alerted and given sufficient time to indicate more time is required.</td>
<td align="left">N/A</td>
<td align="left">There are no timeouts in CKEditor UI elements. The only time-affected elements of the editor UI are notifications for action statuses which do not require any user input.</td>
</tr>
</tbody></table>

## Section 1194.23 Telecommunications Products - Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) Telecommunications products or systems which provide a function allowing voice communication and which do not themselves provide a TTY functionality shall provide a standard non-acoustic connection point for TTYs. Microphones shall be capable of being turned on and off to allow the user to intermix speech with TTY use.</td>
<td align="left">N/A</td>
<td align="left">CKEditor does not provide a function allowing voice communication.</td>
</tr>
<tr>
<td align="left">(b) Telecommunications products which include voice communication functionality shall support all commonly used cross-manufacturer non-proprietary standard TTY signal protocols.</td>
<td align="left">N/A</td>
<td align="left">CKEditor does not include voice communication functionality.</td>
</tr>
<tr>
<td align="left">(c) Voice mail, auto-attendant, and interactive voice response telecommunications systems shall be usable by TTY users with their TTYs.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications system.</td>
</tr>
<tr>
<td align="left">(d) Voice mail, messaging, auto-attendant, and interactive voice response telecommunications systems that require a response from a user within a time interval, shall give an alert when the time interval is about to run out, and shall provide sufficient time for the user to indicate more time is required.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications system. Additionally, there are no timeouts in it.</td>
</tr>
<tr>
<td align="left">(e) Where provided, caller identification and similar telecommunications functions shall also be available for users of TTYs, and for users who cannot see displays.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications system.</td>
</tr>
<tr>
<td align="left">(f) For transmitted voice signals, telecommunications products shall provide a gain adjustable up to a minimum of 20 dB. For incremental volume control, at least one intermediate step of 12 dB of gain shall be provided.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications product.</td>
</tr>
<tr>
<td align="left">(g) If the telecommunications product allows a user to adjust the receive volume, a function shall be provided to automatically reset the volume to the default level after every use.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications product.</td>
</tr>
<tr>
<td align="left">(h) Where a telecommunications product delivers output by an audio transducer which is normally held up to the ear, a means for effective magnetic wireless coupling to hearing technologies shall be provided.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications product.</td>
</tr>
<tr>
<td align="left">(i) Interference to hearing technologies (including hearing aids, cochlear implants, and assistive listening devices) shall be reduced to the lowest possible level that allows a user of hearing technologies to utilize the telecommunications product.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a telecommunications product.</td>
</tr>
<tr>
<td align="left">(j) Products that transmit or conduct information or communication, shall pass through cross-manufacturer, non-proprietary, industry-standard codes, translation protocols, formats or other information necessary to provide the information or communication in a usable format. Technologies which use encoding, signal compression, format transformation, or similar techniques shall not remove information needed for access or shall restore it upon delivery.</td>
<td align="left">N/A</td>
<td align="left">CKEditor does not trasmit or conduct information or communication.</td>
</tr>
<tr>
<td align="left">(k)(1) Products which have mechanically operated controls or keys shall comply with the following: Controls and Keys shall be tactilely discernible without activating the controls or keys.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no mechanically operated controls or keys.</td>
</tr>
<tr>
<td align="left">(k)(2) Products which have mechanically operated controls or keys shall comply with the following: Controls and Keys shall be operable with one hand and shall not require tight grasping, pinching, twisting of the wrist. The force required to activate controls and keys shall be 5 lbs. (22.2N) maximum.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no mechanically operated controls or keys.</td>
</tr>
<tr>
<td align="left">(k)(3) Products which have mechanically operated controls or keys shall comply with the following: If key repeat is supported, the delay before repeat shall be adjustable to at least 2 seconds. Key repeat rate shall be adjustable to 2 seconds per character.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no mechanically operated controls or keys.</td>
</tr>
<tr>
<td align="left">(k)(4) Products which have mechanically operated controls or keys shall comply with the following: The status of all locking or toggle controls or keys shall be visually discernible, and discernible either through touch or sound.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no mechanically operated controls or keys.</td>
</tr>
</tbody></table>

## Section 1194.24 Video and Multi-media Products – Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">a) All analog television displays 13 inches and larger, and computer equipment that includes analog television receiver or display circuitry, shall be equipped with caption decoder circuitry which appropriately receives, decodes, and displays closed captions from broadcast, cable, videotape, and DVD signals. As soon as practicable, but not later than July 1, 2002, widescreen digital television (DTV) displays measuring at least 7.8 inches vertically, DTV sets with conventional displays measuring at least 13 inches vertically, and stand-alone DTV tuners, whether or not they are marketed with display screens, and computer equipment that includes DTV receiver or display circuitry, shall be equipped with caption decoder circuitry which appropriately receives, decodes, and displays closed captions from broadcast, cable, videotape, and DVD signals.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not an analog television display.</td>
</tr>
<tr>
<td align="left">(b) Television tuners, including tuner cards for use in computers, shall be equipped with secondary audio program playback circuitry.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a television tuner.</td>
</tr>
<tr>
<td align="left">(c) All training and informational video and multimedia productions which support the agency's mission, regardless of format, that contain speech or other audio information necessary for the comprehension of the content, shall be open or closed captioned.</td>
<td align="left">N/A</td>
<td align="left"><a href="https://www.youtube.com/user/CKEditor/videos">Screencasts showcasing CKEditor</a> do not contain any audio information.</td>
</tr>
<tr>
<td align="left">(d) All training and informational video and multimedia productions which support the agency's mission, regardless of format, that contain visual information necessary for the comprehension of the content, shall be audio described.</td>
<td align="left"><a href="https://www.youtube.com/user/CKEditor/videos">Screencasts showcasing CKEditor</a> are additional promotional materials connected with articles containing very detailed instructions about doing specified tasks. They are thus not standalone productions, but a supplement to textual content which can be read aloud by Assistive Technology.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(e) Display or presentation of alternate text presentation or audio descriptions shall be user-selectable unless permanent.</td>
<td align="left">Information contained in <a href="https://www.youtube.com/user/CKEditor/videos">screencasts showcasing CKEditor</a> is also available in the text form on the blog as they are just supplements to textual content. Therefore text presentation is completely user-selectable as it is the primary source of content.</td>
<td align="left"></td>
</tr>
</tbody></table>

## Section 1194.25 Self-Contained, Closed Products – Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) Self contained products shall be usable by people with disabilities without requiring an end-user to attach Assistive Technology to the product. Personal headsets for private listening are not Assistive Technology.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a self-contained product. It is a software application designed to be run in a web browser.</td>
</tr>
<tr>
<td align="left">(b) When a timed response is required, the user shall be alerted and given sufficient time to indicate more time is required.</td>
<td align="left">N/A</td>
<td align="left">There are no timeouts in CKEditor UI elements. The only time-affected elements of the editor UI are notifications for action statuses which do not require any user input.</td>
</tr>
<tr>
<td align="left">(c) Where a product utilizes touchscreens or contact-sensitive controls, an input method shall be provided that complies with 1194.23 (k) (1) through (4).</td>
<td align="left">N/A</td>
<td align="left">CKEditor, as a software application, is independent of a device used as a primary input source.</td>
</tr>
<tr>
<td align="left">(d) When biometric forms of user identification or control are used, an alternative form of identification or activation, which does not require the user to possess particular biological characteristics, shall also be provided.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no biometric forms of user identification.</td>
</tr>
<tr>
<td align="left">(e) When products provide auditory output, the audio signal shall be provided at a standard signal level through an industry standard connector that will allow for private listening. The product must provide the ability to interrupt, pause, and restart the audio at anytime.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no auditory output.</td>
</tr>
<tr>
<td align="left">(f) When products deliver voice output in a public area, incremental volume control shall be provided with output amplification up to a level of at least 65 dB. Where the ambient noise level of the environment is above 45 dB, a volume gain of at least 20 dB above the ambient level shall be user selectable. A function shall be provided to automatically reset the volume to the default level after every use.</td>
<td align="left">N/A</td>
<td align="left">CKEditor does not deliver voice output in a public area.</td>
</tr>
<tr>
<td align="left">(g) Color coding shall not be used as the only means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.</td>
<td align="left">All information conveyed with color, including the color selector, is also available without color through textual labels or exposing its current value to Assistive Technology.</td>
<td align="left">CKEditor is not a self-contained product, although it complies with that requirement.</td>
</tr>
<tr>
<td align="left">(h) When a product permits a user to adjust color and contrast settings, a range of color selections capable of producing a variety of contrast levels shall be provided.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is intended to run inside a web browser which can be adjusted by the user.</td>
</tr>
<tr>
<td align="left">(i) Products shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.</td>
<td align="left">N/A</td>
<td align="left">There is no blinking or flickering content in CKEditor. Moveable UI elements such as dialogs can only be moved in a smooth fashion by the user.</td>
</tr>
<tr>
<td align="left">(j) (1) Products which are freestanding, non-portable, and intended to be used in one location and which have operable controls shall comply with the following: The position of any operable control shall be determined with respect to a vertical plane, which is 48 inches in length, centered on the operable control, and at the maximum protrusion of the product within the 48 inch length on products which are freestanding, non-portable, and intended to be used in one location and which have operable controls.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is a software application independent of the physical device which is used to run it.</td>
</tr>
<tr>
<td align="left">(j)(2) Products which are freestanding, non-portable, and intended to be used in one location and which have operable controls shall comply with the following: Where any operable control is 10 inches or less behind the reference plane, the height shall be 54 inches maximum and 15 inches minimum above the floor.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is a software application independent of the physical device which is used to run it.</td>
</tr>
<tr>
<td align="left">(j)(3) Products which are freestanding, non-portable, and intended to be used in one location and which have operable controls shall comply with the following: Where any operable control is more than 10 inches and not more than 24 inches behind the reference plane, the height shall be 46 inches maximum and 15 inches minimum above the floor.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is a software application independent of the physical device which is used to run it.</td>
</tr>
<tr>
<td align="left">(j)(4) Products which are freestanding, non-portable, and intended to be used in one location and which have operable controls shall comply with the following: Operable controls shall not be more than 24 inches behind the reference plane.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is a software application independent of the physical device which is used to run it.</td>
</tr>
</tbody></table>

## Section 1194.26 Desktop and Portable Computers

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) All mechanically operated controls and keys shall comply with 1194.23 (k) (1) through (4).</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no mechanically operated controls and keys.</td>
</tr>
<tr>
<td align="left">(b) If a product utilizes touchscreens or touch-operated controls, an input method shall be provided that complies with 1194.23 (k) (1) through (4).</td>
<td align="left">N/A</td>
<td align="left">CKEditor is a software application independent of the physical device which is used to run it.</td>
</tr>
<tr>
<td align="left">(c) When biometric forms of user identification or control are used, an alternative form of identification or activation, which does not require the user to possess particular biological characteristics, shall also be provided.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has no biometric forms of user identification.</td>
</tr>
<tr>
<td align="left">(d) Where provided, at least one of each type of expansion slots, ports and connectors shall comply with publicly available industry standards.</td>
<td align="left">N/A</td>
<td align="left">CKEditor is not a device, therefore it does not have any expansion slots, ports and connectors.</td>
</tr>
</tbody></table>

## Section 1194.31 Functional Performance Criteria – Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) At least one mode of operation and information retrieval that does not require user vision shall be provided, or support for Assistive Technology used by people who are blind or visually impaired shall be provided.</td>
<td align="left">CKEditor is an application intended to be run inside a web browser, therefore its support for Assistive Technology is provided by the web browser.</td>
<td align="left"><ul><li>CKEditor is optimized for use with Firefox (web browser) and JAWS (screen reader), as that environment is the most standards-compliant implementation of screen reading for the Web. It is assumed that since the testing is done in the most standards-compliant solution, other standards-compliant environments should also work correctly.</li> <li>CKEditor uses WAI-ARIA bindings to improve its visibility to Assistive Technology.</li></ul></td>
</tr>
<tr>
<td align="left">(b) At least one mode of operation and information retrieval that does not require visual acuity greater than 20/70 shall be provided in audio and enlarged print output working together or independently, or support for Assistive Technology used by people who are visually impaired shall be provided.</td>
<td align="left">CKEditor is an application intended to be run inside a web browser, therefore its support for Assistive Technology is provided by the web browser.</td>
<td align="left"><ul><li>CKEditor is optimized for use with Firefox (web browser) and JAWS (screen reader), as that environment is the most standards-compliant implementation of screen reading for the Web. It is assumed that since the testing is done in the most standards-compliant solution, other standards-compliant environments should also work correctly.</li> <li>CKEditor uses WAI-ARIA bindings to improve its visibility to Assistive Technology.</li></ul></td>
</tr>
<tr>
<td align="left">(c) At least one mode of operation and information retrieval that does not require user hearing shall be provided, or support for Assistive Technology used by people who are deaf or hard of hearing shall be provided.</td>
<td align="left">N/A</td>
<td align="left">CKEditor has purely visual UI.</td>
</tr>
<tr>
<td align="left">(d) Where audio information is important for the use of a product, at least one mode of operation and information retrieval shall be provided in an enhanced auditory fashion, or support for assistive hearing devices shall be provided.</td>
<td align="left">N/A</td>
<td align="left">There is no audio in CKEditor.</td>
</tr>
<tr>
<td align="left">(e) At least one mode of operation and information retrieval that does not require user speech shall be provided, or support for Assistive Technology used by people with disabilities shall be provided.</td>
<td align="left">
<ul>
<li>All CKEditor features can be reached with keyboard and/or mouse.</li>
<li><a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</li>
<li>The use of user speech is not required for operating the editor.</li>
</ul></td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(f) At least one mode of operation and information retrieval that does not require fine motor control or simultaneous actions and that is operable with limited reach and strength shall be provided.</td>
<td align="left">
<ul>
<li>All CKEditor features can be reached with keyboard and/or mouse.</li>
<li><a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</li>
<li>A mouse is thus not required for using the editor.</li>
</ul></td>
<td align="left"></td>
</tr>
</tbody></table>

## Section 1194.41 Information, Documentation and Support – Detail

<table class="section508"><thead>
<tr>
<th align="left">Criteria</th>
<th align="left">Level of Support &amp; Supporting Features</th>
<th align="left">Remarks and Explanations</th>
</tr>
</thead><tbody>
<tr>
<td align="left">(a) Product support documentation provided to end-users shall be made available in alternate formats upon request, at no additional charge.</td>
<td align="left">Documentation is available in alternate formats and is delivered to end-users upon request, at no additional charge.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(b) End-users shall have access to a description of the accessibility and compatibility features of products in alternate formats or alternate methods upon request, at no additional charge.</td>
<td align="left">Description of the accessibility and compatibility features of CKEditor is available in alternate formats and methods upon request, at no additional charge.</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">(c) Support services for products shall accommodate the communication needs of end-users with disabilities.</td>
<td align="left">The main way of providing support to end-users is via e-mail; it enables users to use their Assistive Technology with it. Additionaly, there is also an option to get support via a phone call.</td>
<td align="left"></td>
</tr>
</tbody></table>

## Related Features

Refer to the following resources for more information about accessibility in CKEditor:

* The [Accessibility Support in CKEditor](#!/guide/dev_a11y) article explains CKEditor compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The [Managing Content Accessibility with Accessibility Checker](#!/guide/dev_accessibility_checker) article describes an innovative Accessibility Checker tool that lets you inspect the accessibility level of content created in CKEditor and immediately solve any issues that are found.
* The [Keyboard Shortcuts](#!/guide/dev_shortcuts) article lists all keyboard shortcuts supported in CKEditor.
* The [Page Navigation Using the "Tab" Key](#!/guide/dev_tabindex) article discusses how CKEditor participates in the page <kbd>Tab</kbd> order.
* The [CKEditor WCAG 2.0 Compliance](#!/guide/dev_wcag) article describes CKEditor 4 compatibility with the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/) standard.
