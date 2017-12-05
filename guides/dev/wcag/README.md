# CKEditor WCAG 2.0 Compliance

This article decribes CKEditor 4 compatibility with the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/) standard.

<br style="clear:both">

## Principle 1: Perceivable

Information and user interface components must be presentable to users in ways they can perceive. See [reference](http://www.w3.org/TR/WCAG20/#perceivable).

<table class="wcag">
	<thead>
		<tr>
			<th scope="col">Guideline</th>
			<th scope="col">Level</th>
			<th scope="col">Description of Support</th>
			<th scope="col">Used Techniques</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="col" colspan="4">1.1 Text Alternatives: Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.</th>
		</tr>
		<tr>
			<td><b>1.1.1 Non-text Content:</b> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.
				<ul>
					<li><b>Controls, Input:</b> If non-text content is a control or accepts user input, then it has a name that describes its purpose.</li>
					<li><b>Time-Based Media:</b> If non-text content is time-based media, then text alternatives at least provide descriptive identification of the non-text content.</li>
					<li><b>Test:</b> If non-text content is a test or exercise that would be invalid if presented in text, then text alternatives at least provide descriptive identification of the non-text content.</li>
					<li><b>Sensory:</b> If non-text content is primarily intended to create a specific sensory experience, then text alternatives at least provide descriptive identification of the non-text content.</li>
					<li><b><abbr title="Completely Automated Public Turing test to tell Computers and Humans Apart">CAPTCHA</abbr>:</b> If the purpose of non-text content is to confirm that content is being accessed by a person rather than a computer, then text alternatives that identify and describe the purpose of the non-text content are provided, and alternative forms of CAPTCHA using output modes for different types of sensory perception are provided to accommodate different disabilities.</li>
					<li><b>Decoration, Formatting, Invisible:</b> If non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology.</li>
				</ul>
			</td>
			<td>A</td>
			<td>
				<ul>
					<li>All non-text content, be it UI icons or the <code>&lt;iframe&gt;</code> element used as the editing area, or any other form of non-text content, is assocciated with a proper textual label via standard HTML elements and attributes or via WAI-ARIA bindings.</li>
					<li>All images conveying information have proper <code>alt</code> attributes.</li>
					<li>Form controls are created using standard HTML elements and are provided with a textual label using proper HTML elements.</li>
					<li>All decorative images have an empty <code>alt</code> attribute or are inserted via CSS.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G94.html">G94</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G82.html">G82</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA10.html">ARIA10</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H37.html">H37</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H44.html">H44</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C9.html">C9</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H67.html">H67</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">1.2 Time-based Media: Provide alternatives for time-based media.</th>
		</tr>
		<tr>
			<td><b>1.2.1 Audio-only and Video-only (Prerecorded):</b> For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:
				<ul>
					<li><b>Prerecorded Audio-only:</b> An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content.</li>
					<li> <b>Prerecorded Video-only:</b> Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.</li>
				</ul>
			</td>
			<td>A</td>
			<td>N/A. There is no time-based media content in the editor.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>1.2.2 Captions (Prerecorded):</b> Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.</td>
			<td>A</td>
			<td>N/A. There is no time-based media content in the editor.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>1.2.3 Audio Description or Media Alternative (Prerecorded):</b> An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.</td>
			<td>A</td>
			<td>N/A. There is no time-based media content in the editor.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>1.2.4 Captions (Live):</b> Captions are provided for all live audio content in synchronized media.</td>
			<td>AA</td>
			<td>N/A. There is no time-based media content in the editor.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>1.2.5 Audio Description (Prerecorded):</b> Audio description is provided for all prerecorded video content in synchronized media.</td>
			<td>AA</td>
			<td>N/A. There is no time-based media content in the editor.</td>
			<td>–</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">1.3 Adaptable: Create content that can be presented in different ways (for example simpler layout) without losing information or structure.</th>
		</tr>
		<tr>
			<td><b>1.3.1 Info and Relationships:</b> Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.</td>
			<td>A</td>
			<td>
				<ul>
					<li>The editor is marked as an application using WAI-ARIA landmarks.</li>
					<li>The editor has an appropriate textual label that contains its name.</li>
					<li>Form controls are created using standard HTML elements and are provided with a textual label using proper HTML elements.</li>
					<li>All form fields inside the editor that are required are properly marked as such using the <code>aria-required</code> attribute.</li>
					<li>Related form controls are grouped using the <code>&lt;fieldset&gt;</code> element and are given a descriptive name using the <code>&lt;legend&gt;</code> element.</li>
					<li>All UI elements that cannot be expressed using standard HTML elements are provided with textual labels via WAI-ARIA bindings.</li>
					<li>All UI elements that have a changeable state expose their current state to Assistive Technology via standard HTML attributes. If the state cannot be expressed that way, WAI-ARIA bindings are used.</li>
					<li>All information conveyed with color, including the color selector, is also available without color through textual labels or exposing its current value to Assistive Technology.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA11.html">ARIA11</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA13.html">ARIA13</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G117.html">G117</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G115.html">G115</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G140.html">G140</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H44.html">H44</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H71.html">H71</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G162.html">G162</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA2.html">ARIA2</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C22.html">C22</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G138.html">G138</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>1.3.2 Meaningful Sequence:</b> When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.</td>
			<td>A</td>
			<td>
				<ul>
					<li>CKEditor is not a document, it is an application. Its visual structure does, however, match the order of its DOM elements.</li>
					<li>UI elements are grouped in a logical way, e.g. tolbar buttons are grouped by their functionality.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G57.html">G57</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C27.html">C27</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>1.3.3 Sensory Characteristics:</b> Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.</td>
			<td>A</td>
			<td>All editor UI elements have proper textual labels.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G96.html">G96</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">1.4 Distinguishable: Make it easier for users to see and hear content including separating foreground from background.</th>
		</tr>
		<tr>
			<td><b>1.4.1 Use of Color:</b> Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.</td>
			<td>A</td>
			<td>All information conveyed with color, including the color selector, is also available without color through textual labels or exposing its current value to Assistive Technology.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G14.html">G14</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C15.html">C15</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>1.4.2 Audio Control:</b> If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.</td>
			<td>A</td>
			<td>N/A. There is no audio content in the editor.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>1.4.3 Contrast (Minimum):</b> The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
				<ul>
					<li><b>Large Text:</b> Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;</li>
					<li><b>Incidental:</b> Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.</li>
					<li><b>Logotypes:</b> Text that is part of a logo or brand name has no minimum contrast requirement.</li>
				</ul>
			</td>
			<td>AA</td>
			<td>
				<ul>
					<li>CKEditor is able to use the High Contrast mode of the operating system. It is optimized to use Windows High Contrast mode.</li>
					<li>The editor can be styled with user stylesheets. The users can thus provide their own high contrast stylesheets.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G156.html">G156</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>1.4.4 Resize text:</b> Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.</td>
			<td>AA</td>
			<td>CKEditor is designed in a way that enables the use of user agent zoom feature.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G142.html">G142</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>1.4.5 Images of Text:</b> If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following:
				<ul>
					<li><b>Customizable:</b> The image of text can be visually customized to the user's requirements;</li>
					<li><b>Essential:</b> A particular presentation of text is essential to the information being conveyed.</li>
				</ul>
			</td>
			<td>AA</td>
			<td>
				<ul>
					<li>All editor UI elements are based on textual elements that are presented as icons using CSS.</li>
					<li>CKEditor is designed to use the High Contrast mode of the operating system and is optimized to use with Windows High Contrast mode. If the editor is used in this mode, all buttons are presented as textual.</li>
					<li>CKEditor can be styled with user stylesheets.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C22.html">C22</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C30.html">C30</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G140.html">G140</a></li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

## Principle 2: Operable

User interface components and navigation must be operable. See [reference](http://www.w3.org/TR/WCAG20/#operable).

<table class="wcag">
	<thead>
		<tr>
			<th scope="col">Guideline</th>
			<th scope="col">Level</th>
			<th scope="col">Description of Support</th>
			<th scope="col">Used Techniques</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="col" colspan="4">2.1 Keyboard Accessible: Make all functionality available from a keyboard.</th>
		</tr>
		<tr>
			<td><b>2.1.1 Keyboard:</b> All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.</td>
			<td>A</td>
			<td>
				<ul>
					<li>All CKEditor features can be reached with keyboard.</li>
					<li><a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G202.html">G202</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/SCR29.html">SCR29</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>2.1.2 No Keyboard Trap:</b> If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.</td>
			<td>A</td>
			<td>
				<ul>
					<li>The focus is trapped inside modal dialogs to prevent users from interacting with currently non-active parts of the web page. The focus is restored when the dialog is closed by clicking an appropriate button or pressing <kbd>Esc</kbd>.</li>
					<li>The focus is trapped inside the editor toolbar after pressing <kbd>Alt+F10</kbd>. The focus is restored into the editor after pressing <kbd>Esc</kbd>.</li>
					<li>Information about how to restore focus after certain actions is described in the editor "Accessibility Instructions" dialog available after pressing <kbd>Alt+0</kbd>.</li>	
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G21.html">G21</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">2.2 Enough Time: Provide users enough time to read and use content.</th>
		</tr>
		<tr>
			<td><b>2.2.1 Timing Adjustable:</b> For each time limit that is set by the content, at least one of the following is true:
				<ul>
					<li><b>Turn off:</b> The user is allowed to turn off the time limit before encountering it; or</li>
					<li><b>Adjust:</b> The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or</li>
					<li><b>Extend:</b> The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or</li>
					<li><b>Real-time Exception:</b> The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or</li>
					<li><b>Essential Exception:</b> The time limit is essential and extending it would invalidate the activity; or</li>
					<li><b>20 Hour Exception:</b> The time limit is longer than 20 hours.</li>
				</ul>
			</td>
			<td>A</td>
			<td>N/A. There are no timeouts in CKEditor UI elements. The only time-affected elements of the editor UI are notifications of action statuses which do not require any user input.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>2.2.2 Pause, Stop, Hide:</b> For moving, blinking, scrolling, or auto-updating information, all of the following are true:
				<ul>
					<li><b>Moving, blinking, scrolling:</b> For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and</li>
					<li><b>Auto-updating:</b> For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.</li>
				</ul>
			</td>
			<td>A</td>
			<td>N/A. There is no blinking or flickering content in CKEditor. Moveable UI elements such as dialogs can only be moved in a smooth fashion by the user.</td>
			<td>–</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">2.3 Seizures: Do not design content in a way that is known to cause seizures.</th>
		</tr>
		<tr>
			<td><b>2.3.1 Three Flashes or Below Threshold:</b> Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.</td>
			<td>A</td>
			<td>There is no blinking or flickering content in CKEditor. Moveable UI elements such as dialogs can only be moved in a smooth fashion by the user.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G19.html">G19</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">2.4 Navigable: Provide ways to help users navigate, find content, and determine where they are.</th>
		</tr>
		<tr>
			<td><b>2.4.1 Bypass Blocks:</b> A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.</td>
			<td>A</td>
			<td>
				<ul>
					<li>Pressing <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> to change focus to the editor from the outside will put the focus directly into the editing area, instead of into other focusable elements of the editor (e.g. toolbar buttons).</li>
					<li>The editor toolbar is accessible by pressing <kbd>Alt+F10</kbd> and it is divided into groups that can be navigated via tabbing. The navigation inside the groups is possible with <kbd>Arrow</kbd> keys.</li>
					<li><a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</li>
					<li>The editor is marked as an application using WAI-ARIA landmarks.</li>
					<li>Features that contain multiple options are expressed as collapsible lists or buttons that open modal dialogs.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA11.html">ARIA11</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/SCR28.html">SCR28</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>2.4.2 Page Titled:</b> Web pages have titles that describe topic or purpose.</td>
			<td>A</td>
			<td>
				<ul>
					<li>If CKEditor uses an <code>&lt;iframe&gt;</code> element as its editing area, this element is given a proper title via the <code>title</code> attribute that contains the editor name.</li>
					<li>If the editor is used in inline mode, this guideline is non-applicable as the editor is an integral part of a web page.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G88.html">G88</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H25.html">H25</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>2.4.3 Focus Order:</b> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.</td>
			<td>A</td>
			<td>
				<ul>
					<li>Pressing <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> to change focus to the editor from the outside will put the focus directly into the editing area, instead of into other focusable elements of the editor (e.g. toolbar buttons).</li>
					<li>The editor toolbar is accessible by pressing <kbd>Alt+F10</kbd> and it is divided into groups that can be navigated via tabbing. The navigation inside the groups is possible with <kbd>Arrow</kbd> keys.</li>
					<li><a href="#!/guide/dev_shortcuts">Keyboard shortcuts</a> are available for the most frequently used features.</li>
					<li>If a modal dialog is open, the focus is moved inside it and trapped until the dialog is closed. The tabbing order inside a dialog is consistent with the visual order.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G59.html">G59</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H4.html">H4</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C27.html">C27</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/SCR37.html">SCR37</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>2.4.4 Link Purpose (In Context):</b> The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.</td>
			<td>A</td>
			<td>All links inside CKEditor contain text that describes their purpose.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G91.html">G91</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>2.4.5 Multiple Ways:</b> More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.</td>
			<td>AA</td>
			<td>N/A. Editor is not a web page, but a component that is located inside a web page.</td>
			<td>–</td>
		</tr>
		<tr>
			<td><b>2.4.6 Headings and Labels:</b> Headings and labels describe topic or purpose.</td>
			<td>AA</td>
			<td>
				<ul>
					<li>The editor is connected with a textual label that contains its name.</li>
					<li>All UI elements are connected with textual labels that describe their purpose.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G131.html">G131</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>2.4.7 Focus Visible:</b> Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.</td>
			<td>AA</td>
			<td>The currently focused element in the editor toolbar has a changed presentation, e.g. a visibly different background color.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/C15.html">C15</a></li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

## Principle 3: Understandable

Information and the operation of user interface must be understandable. See [reference](http://www.w3.org/TR/WCAG20/#understandable).

<table class="wcag">
	<thead>
		<tr>
			<th scope="col">Guideline</th>
			<th scope="col">Level</th>
			<th scope="col">Description of Support</th>
			<th scope="col">Used Techniques</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="col" colspan="4">3.1 Readable: Make text content readable and understandable.</th>
		</tr>
		<tr>
			<td><b>3.1.1 Language of Page:</b> The default human language of each Web page can be programmatically determined.</td>
			<td>A</td>
			<td>
				<ul>
					<li>If CKEditor uses an <code>&lt;iframe&gt;</code> element as its editing area, that element is given an appropiate <code>lang</code> attribute.</li>
					<li>If the editor is used in inline mode, it uses the language specified for that web page.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H57.html">H57</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.1.2 Language of Parts:</b> The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.</td>
			<td>AA</td>
			<td>The <a href="https://ckeditor.com/cke4/addon/language">Language</a> plugin allows the editor user to properly mark parts of text as fragments in a particular language using the <code>lang</code> attribute.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H57.html">H57</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">3.2 Predictable: Make Web pages appear and operate in predictable ways.</th>
		</tr>
		<tr>
			<td><b>3.2.1 On Focus:</b> When any component receives focus, it does not initiate a change of context.</td>
			<td>A</td>
			<td>All changes must be confirmed by the user by pressing an appropriate button in a dialog or the toolbar. No changes occur just by focusing a UI element.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G107.html">G107</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.2.2 On Input:</b> Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.</td>
			<td>A</td>
			<td>No changes of context are caused by just inputting into a form field. All changes must be confirmed by the user by pressing an appropriate button in a dialog or the toolbar.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G107.html">G107</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.2.3 Consistent Navigation:</b> Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.</td>
			<td>AA</td>
			<td>The position and order of the editor toolbar is the same between navigations to the web page containing the editor.</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G61.html">G61</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.2.4 Consistent Identification:</b> Components that have the same functionality within a set of Web pages are identified consistently.</td>
			<td>AA</td>
			<td>
				<ul>
					<li>All editor features that work in a similar manner are described in the same way.</li>
					<li>Icons and textual labels are unique for each editor feature.</li>
					<li>Icon meanings are consistent with commonly used icon meanings throughout software industry.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G197.html">G197</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<th scope="col" colspan="4">3.3 Input Assistance: Help users avoid and correct mistakes.</th>
		</tr>
		<tr>
			<td><b>3.3.1 Error Identification:</b> If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.</td>
			<td>A</td>
			<td>
				<ul>
					<li>All form fields inside CKEditor that are required are properly marked as such using the <code>aria-required</code> attribute.</li>
					<li>If an error occurs due to user input, form fields are marked as invalid using the <code>aria-invalid</code> attribute and the JavaScript <code>alert()</code> function is used to display information about the error to the user.</li>
					<li>Errors are automatically detected on form submission and the focus is moved inside the first invalid field.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G83.html">G83</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA21.html">ARIA21</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/SCR18.html">SCR18</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G139.html">G139</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.3.2 Labels or Instructions:</b> Labels or instructions are provided when content requires user input.</td>
			<td>A</td>
			<td>
				<ul>
					<li>All form controls have descriptive labels that are associated with them using the <code>&lt;label&gt;</code> elements and/or WAI-ARIA bindings.</li>
					<li>Related form controls are grouped using the <code>&lt;fieldset&gt;</code> element and are given a descriptive name using the <code>&lt;legend&gt;</code> element.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G131.html">G131</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G162.html">G162</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H44.html">H44</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H71.html">H71</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.3.3 Error Suggestion:</b> If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.</td>
			<td>AA</td>
			<td>
				<ul>
					<li>If an error occurs due to user input, form fields are marked as invalid using the <code>aria-invalid</code> attribute and the JavaScript <code>alert()</code> function is used to display information about the error to the user.</li>
					<li>Information about the required input format is provided via the JavaScript <code>alert()</code> function.</li>
					<li>Errors are automatically detected on form submission and the focus is moved inside the first invalid field.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G83.html">G83</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA2.html">ARIA2</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/SCR18.html">SCR18</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G139.html">G139</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>3.3.4 Error Prevention (Legal, Financial, Data):</b> For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:
				<ul>
					<li><b>Reversible:</b> Submissions are reversible.</li>
					<li><b>Checked:</b> Data entered by the user is checked for input errors and the user is provided an opportunity to correct them.</li>
					<li><b>Confirmed:</b> A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission.</li>
				</ul>
			</td>
			<td>AA</td>
			<td>
				<ul>
					<li>Note that CKEditor as a component that is designed to be embedded inside web pages must comply with such requirements as it could be embedded inside a web page that causes legal commitments or financial transactions, modifies or deletes data, or submits user test responses.</li>
					<li>CKEditor has a built-in undo and redo manager which ensures that all changes are reversible.</li>
					<li>If an error occurs due to user input, form fields are marked as invalid using the <code>aria-invalid</code> attribute and the JavaScript <code>alert()</code> function is used to display information about the error to the user.</li>
					<li>All changes must be confirmed by the user by pressing an appropiate button in a dialog or the toolbar.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G99.html">G99</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G168.html">G168</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/G98.html">G98</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/SCR18.html">SCR18</a></li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

## Principle 4: Robust

Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. See [reference](http://www.w3.org/TR/WCAG20/#robust).

<table class="wcag">
	<thead>
		<tr>
			<th scope="col">Guideline</th>
			<th scope="col">Level</th>
			<th scope="col">Description of Support</th>
			<th scope="col">Used Techniques</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="col" colspan="4">4.1 Compatible: Maximize compatibility with current and future user agents, including assistive technologies.</th>
		</tr>
		<tr>
			<td><b>4.1.1 Parsing:</b> In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.</td>
			<td>A</td>
			<td>
				<ul>
					<li>CKEditor markup is syntactically valid HTML.</li>
					<li>There are no duplicate attributes inside the editor markup and all IDs are unique.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H74.html">H74</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H75.html">H75</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H93.html">H93</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H94.html">H94</a></li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>4.1.2 Name, Role, Value:</b> For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.</td>
			<td>A</td>
			<td>
				<ul>
					<li>The <code>&lt;iframe&gt;</code> element used as the WYSYWIG editing area has a proper <code>title</code> attribute.</li>
					<li>Form controls are created using standard HTML elements and are provided with a textual label using proper HTML elements.</li>
					<li>All UI elements that cannot be expressed using standard HTML elements are provided with textual labels via WAI-ARIA bindings.</li>
					<li>All UI elements that have a changeable state expose their current state to Assistive Technology via standard HTML attributes. If the state cannot be expressed that way, WAI-ARIA bindings are used.</li>
				</ul>
			</td>
			<td>
				<ul>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H64.html">H64</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H91.html">H91</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/H44.html">H44</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA16.html">ARIA16</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA4.html">ARIA4</a></li>
					<li><a href="http://www.w3.org/TR/WCAG20-TECHS/ARIA5.html">ARIA5</a></li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

## Related Features

Refer to the following resources for more information about accessibility in CKEditor:

* The [Accessibility Support in CKEditor](#!/guide/dev_a11y) article explains CKEditor compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The [Managing Content Accessibility with Accessibility Checker](#!/guide/dev_accessibility_checker) article describes an innovative Accessibility Checker tool that lets you inspect the accessibility level of content created in CKEditor and immediately solve any issues that are found.
* The [Keyboard Shortcuts](#!/guide/dev_shortcuts) article lists all keyboard shortcuts supported in CKEditor.
* The [Page Navigation Using the "Tab" Key](#!/guide/dev_tabindex) article discusses how CKEditor participates in the page <kbd>Tab</kbd> order.
* The [CKEditor Section 508 Compliance](#!/guide/dev_section508) article describes CKEditor 4 compatibility with [Section 508 Amendment to the Rehabilitation Act of 1973](http://www.state.gov/m/irm/impact/c32157.htm).