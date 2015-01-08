<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Section 508 Amendment to the Rehabilitation Act of 1973

CKEditor is compliant with the [Section 508 Amendment to the Rehabilitation Act of 1973](http://www.state.gov/m/irm/impact/c32157.htm). The Voluntary Product Accessibility Template (VPAT) for Section 508 can be retrived from the [Department of State IRM Program for Accessible Computer/Communication Technology (IMPACT)](http://www.state.gov/m/irm/impact/126343.htm).

## Section 1194.22 Web-based Internet information and applications – Detail

<table>
	<tr>
		<th>Criteria</th>
		<th>Supporting Features</th>
		<th>Remarks and Explanations</th>
	</tr>
	<tr>
		<td>(a) A text equivalent for every non-text element shall be provided (e.g., via `alt`, `longdesc`, or in element content).</td>
		<td>Important images such as toolbar icons are readable in screenreaders. Less important images such as object placeholders and infrequently used smiley icons are given `alt=""`.</td>
		<td><br/></td>
	</tr>
	<tr>
		<td>(b) Equivalent alternatives for any multimedia presentation shall be synchronized with the presentation.</td>
		<td>N/A</td>
		<td>There are no video or audio contents in the editor.</td>
	</tr>
	<tr>
		<td>(c) Web pages shall be designed so that all information conveyed with color is also available without color, for example from context or markup.</td>
		<td>Toolbar buttons will appear as textual buttons in Windows high contrast mode. Selection of text and background colors is still possible with textual labels in the color selection panels.</td>
		<td></td>
	</tr>
	<tr>
		<td>(d) Documents shall be organized so they are readable without requiring an associated style sheet.</td>
		<td>The editor and its dialog windows are still usable without cascading style sheets. Toolbar buttons appear as textual links without CSS.</td>
		<td></td>
	</tr>
	<tr>
		<td>(e) Redundant text links shall be provided for each active region of a server-side image map.</td>
		<td>N/A</td>
		<td>There are no image maps in the editor.</td>
	</tr>
	<tr>
		<td>(f) Client-side image maps shall be provided instead of server-side image maps except where the regions cannot be defined with an available geometric shape.</td>
		<td>N/A</td>
		<td>There are no image maps in the editor.</td>
	</tr>
	<tr>
		<td>(g) Row and column headers shall be identified for data tables.</td>
		<td>N/A</td>
		<td>There are no data tables in the editor UI. Tables are used for layout purposes only.</td>
	</tr>
	<tr>
		<td>(h) Markup shall be used to associate data cells and header cells for data tables that have two or more logical levels of row or column headers.</td>
		<td>N/A</td>
		<td>There are no data tables in the editor UI. Tables are used for layout purposes only.</td>
	</tr>
	<tr>
		<td>(i) Frames shall be titled with text that facilitates frame identification and navigation.</td>
		<td>IFrames in the editor, such as the WYSIWYG editing area and drop-down lists, are given screenreader-accessible labels.</td>
		<td></td>
	</tr>
	<tr>
		<td>(j) Pages shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.</td>
		<td>N/A</td>
		<td>There is no blinking or flickering content in the editor. Moveable UI elements such as dialog windows can only be moved in a smooth fashion by the user.</td>
	</tr>
	<tr>
		<td>(k) A text-only page, with equivalent information or functionality, shall be provided to make a web site comply with the provisions of this part, when compliance cannot be accomplished in any other way. The content of the text-only page shall be updated whenever the primary page changes.</td>
		<td>If JavaScript is not supported, an equivalent text-only page with a `<textarea>` or another editable element can be created by not activating CKEditor's replace API.</td>
		<td></td>
	</tr>
	<tr>
		<td>(l) When pages utilize scripting languages to display content, or to create interface elements, the information provided by the script shall be identified with functional text that can be read by Assistive Technology.</td>
		<td>Most UI elements (e.g. toolbar buttons, dialog window tabs) in the editor come with screenreader accessible labels.</td>
		<td></td>
	</tr>
	<tr>
		<td>(m) When a web page requires that an applet, plug-in or other application be present on the client system to interpret page content, the page must provide a link to a plug-in or applet that complies with §1194.21(a) through (l).</td>
		<td>The editor UI does not utilize any plugins or applets.</td>
		<td></td>
	</tr>
	<tr>
		<td>(n) When electronic forms are designed to be completed on-line, the form shall allow people using Assistive Technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues. </td>
		<td>
			<ul>
				<li>When the editor is embedded inside a form, tab order works with the editor just like with any other regular form input.</li>
				<li>The editor is designed to let screenreaders read out its name.</li>
			</ul>
		</td>
		<td><br/></td>
	</tr>
	<tr>
		<td>(o) A method shall be provided that permits users to skip repetitive navigation links.</td>
		<td>Pressing <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> to move the focus from other page elements to the editor will put the focus directly into the editing area, instead of other focusable elements of the editor (e.g. toolbar buttons).</td>
		<td></td>
	</tr>
	<tr>
		<td>(p) When a timed response is required, the user shall be alerted and given sufficient time to indicate more time is required. </td>
		<td>N/A</td>
		<td>There are no timeouts in the editor UI elements.</td>
	</tr>
</table>
