---
category: accessibility-support
order: 20
url: guide/dev_accessibility_checker
menu-title: Accessibility Checker
meta-title-short: Accessibility Checker
---
# Managing Content Accessibility with Accessibility Checker

<info-box info="">
<p>
	This feature is provided through optional plugins (<a href="https://ckeditor.com/cke4/addon/a11ychecker">Accessibility Checker</a> and <a href="https://ckeditor.com/cke4/addon/balloonpanel">Balloon Panel</a>) that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</p>
<p>
	Accessibility Checker is available under a <a href="http://www.gnu.org/licenses/gpl.html">GPL</a> or commercial license. <a href="https://cksource.com/contact">Contact</a> us for more details.
</p>
<p>
	Quail, the default accessibility tests library, requires <strong>jQuery 1.x or later</strong> to run. You thus need to add jQuery 1.x (or later) to any site that is going to use Accessibility Checker.
</p>
</info-box>

Accessibility Checker is an innovative solution that lets you **inspect the accessibility level** of content created in CKEditor and **immediately solve** any accessibility issues that are found.

It is built upon three key elements:

* User Interface optimized for quick problem solving.
* Flexibility allowing you to use the accessibility checking engine of your choice.
* Quick Fix feature letting you fix common problems fully automatically.

## Summary: How Does It Work?

A typical accessibility checking process can be simplified to the following three steps.

### Step One: Content Validation

Accessibility Checker inspects output HTML code against predefined patterns of common accessibility problems. For that purpose Accessibility Checker uses a dedicated **accessibility checking engine**.

The default checking engine is [Quail](http://quailjs.org), but you are free to integrate any other library you want &mdash; it can be written in JavaScript, PHP, Java, .NET or any other language of your choice.

### Step Two: Report Issues

Accessibility Checker will list all issues found and highlight them in the document. It will provide a more detailed description of what is wrong with each issue so the user can verify and solve the problem.

### Step Three: Fix the Issue

Fix the markup to make your content free from accessibility issues. Thanks to the {@link guide/dev/features/accessibility_checker/README#using-quick-fixes Quick Fix feature} correcting common problems is as easy as clicking a button. When there is no Quick Fix available, you can switch Accessibility Checker {@link guide/dev/features/accessibility_checker/README#listening-mode into listening mode} and make necessary corrections to your content manually, following the checking engine recommendations provided in the panel.

## Running Accessibility Checker

You can enable Accessibility Checker by clicking the **Check Accessibility** (<img class="inline" src="%BASE_PATH%/assets/img/a11ychecker.png" alt="Check Accessibility" title="Check Accessibility">) toolbar button. Once the button is clicked, Accessibility Checker will perform the content checking process. Typically it takes a fraction of a second. Depending on the result, Accessibility Checker will switch to **checking mode** or inform you that the document contains no accessibility issues.

### Issues Found &mdash; Checking Mode

When Accessibility Checker finds some issues, it will display a panel containing the tools needed for understanding and solving the problem.

{@img assets/img/a11ychecker_01.png CKEditor Accessibility Checker in Checking Mode}

Accessibility problems are presented as one issue at a time, allowing you to iterate over the entire list. Issues can also be ignored (see {@link guide/dev/features/accessibility_checker/README#ignoring-issues Ignoring Issues}). For more information about checking mode please refer to the {@link guide/dev/features/accessibility_checker/README#checking-mode Checking Mode} section.

### No Issues

If no issues are found in the document, Accessibility Checker will inform you about it.

{@img assets/img/a11ychecker_02.png Accessibility Checker dialog shown when no issues are found}

This means that your content is validated.

## What Exactly Are Issues?

An issue represents a single accessibility problem in your content, as defined by your checking engine. Issue are grouped into different types:

* **Error** &ndash; The checking engine is 100% certain that the highlighted element contains an accessibility issue.
* **Warning** &ndash; The checking engine discovered that there is a possibility of a given error, but it does not have a 100% certainty.
* **Notice** &ndash; The checking engine has no way to detect this issue, so it points an issue only as a notice and the user can verify if the content satisfies the given rule.

In checking mode the highlight color will slightly differ (ranging from red for an error through yellow for a warning to gray for a notice) in order to hint the issue type.

Refer to the {@link guide/dev/integration/a11ychecker/custom_issue_types/README Custom Issue Types in Accessibility Checker} tutorial for information about adding your own issue types.

## Checking Mode

Checking mode is enabled when there is at least one issue in the editor content. It shows a panel containing all key information about the currently focused issue.

It is designed for:

* Quick problem identification (with a meaningful title, description, help links).
* Navigation over the detected issues.
* Fixing the problems, ideally without leaving the panel.

Checking mode will work on a single issue at a time, allowing you to iterate over all issues found in the document.

The following picture highlights the most important parts of the panel shown in the checking mode.

{@img assets/img/a11ychecker_03.png Checking mode panel with highlighted parts}

### Navigating over Issues

Multiple ways to go through issues are available.

#### Navigation Buttons

Use the **Previous** or **Next** buttons in the Accessibility Checker panel to move between issues.

{@img assets/img/a11ychecker_04.png Navigation using the Next and Previous buttons}

#### Clicking a Selected Issue

Since issues are highlighted in the editor, you can click an issue with your mouse. It will focus the first issue within the selected element. The possibility to focus an issue is indicated by a hightlight and a cursor change.

{@img assets/img/a11ychecker_05.png Navigation using the mouse}

#### Using the Keyboard

You can also use the keyboard to move through issues. A few keyboard shortcuts were defined to make navigation easy and intuitive.

Please refer to the {@link guide/dev/features/accessibility_checker/README#keyboard-shortcuts Keyboard Shortcuts} section for a complete list of available keystrokes.

### Using Quick Fixes

Quick Fix is a powerful feature designed to solve issues as quickly as possible, without leaving the Accessibility Checker panel.

There are two Quick Fix types:

* **Automatic** &ndash; Does not require any user input at all to fix the problem.
* **Semi-automatic** &ndash; Requires the user to provide some information before applying the Quick Fix.

#### Working with Quick Fixes

Depending on the Quick Fix type, two approaches are possible.

##### Automatic Quick Fix

For automatic Quick Fixes the user's job is to just press the **Quick Fix** button in the Accessibility Checker panel.

{@img assets/img/a11ychecker_06.png Accessibility Checker automatic Quick Fix example}

Once the button is pressed, the fix is applied. This will result in a change of the HTML source of your content.

##### Semi-Automatic Quick Fix

A semi-automatic Quick Fix requires some action from the user, typically requested by a form text input in the Accessibility Checker panel. For example:

{@img assets/img/a11ychecker_07.png Semi-automatic Quick Fix example}

Initially this image has no alternative text so Quick Fix asks the user to provide it as it is unable to determine this automatically.

##### User Input Validation

Quick Fixes are also smart enough to validate the user input data if needed.

For example, it is recommended that an alternative text for an image should be shorter than 100 characters. If the user enters a text that is longer than 100 characters into the "Alternative Text" field and tries to apply it with a Quick Fix, Accessibility Checker will raise an error warning the user that the text is too long.

{@img assets/img/a11ychecker_08.png Invalid user-provided data causes a validation error}

#### Adding Quick Fixes

Quick Fix feature was created with extensibility in mind, so it is very easy for a developer to add new, custom Quick Fixes to Accessibility Checker.

Refer to the {@link guide/dev/integration/a11ychecker/custom_quick_fixes/README Custom Quick Fixes in Accessibility Checker} tutorial for information about adding your own Quick Fixes.

### Ignoring Issues

Issues reported by Accessibility Checker can also be ignored. This can be done by clicking the **Ignore** button for each selected issue in the Accessibility Checker panel.

{@img assets/img/a11ychecker_09.png Issue ignore button}

If an issue is ignored, it will gain a very subtle highlight which no longer indicates the initial issue type, as shown below.

{@img assets/img/a11ychecker_10.png Ignored issue higlighting}

It is still possible to open Accessibility Checker on an ignored issue by clicking it, navigating to it with your keyboard or moving to it from the previous or next issue.

Once the issue is ignored you can also unset its ignore status by clicking the **Stop ignoring** button.

{@img assets/img/a11ychecker_11.png Stop ignoring button}

### Switching to Listening Mode

When you wish to introduce some manual changes to your content, Accessibility Checker will switch to listening mode, waiting for your changes to be done.

There are two ways of switching Accessibility Checker to listening mode after its initial activation:

* Clicking anywhere in the CKEditor content area.
* Pressing the listening mode {@link guide/dev/features/accessibility_checker/README#keyboard-shortcuts keyboard shortcut}.

## Listening Mode

Listening mode is enabled when you want to make a quick change to the document.

In listening mode Accessibility Checker minimizes itself and waits until you are finished editing your content. Listening mode will put the following indicator in the bottom right-hand corner of your browser:

{@img assets/img/a11ychecker_12.png Accessibility Checker listening mode indicator}

When you are done with your changes, you can return to checking the content by clicking the **Check again** button.

## Keyboard Shortcuts

Accessibility Checker comes with good keyboard support. The following table describes default keystrokes and actions assigned to them.

### Keyboard Shortcuts for Windows / Linux

<table class="a11ychecker">
	<thead>
		<tr>
			<th>Command</th>
			<th>Keystroke</th>
			<th>Restrictions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Open or close Accessibility Checker</td>
			<td><kbd>Ctrl+Alt+E</kbd></td>
			<td/>
		</tr>
		<tr>
			<td>Next issue</td>
			<td><kbd>Ctrl+E</kbd></td>
			<td>Checking mode only</td>
		</tr>
		<tr>
			<td>Previous issue</td>
			<td><kbd>Ctrl+Shift+E</kbd></td>
			<td>Checking mode only</td>
		</tr>
		<tr>
			<td>Close Accessibility Checker</td>
			<td><kbd>Esc</kbd></td>
			<td/>
		</tr>
		<tr>
			<td>Switch to listening mode</td>
			<td><kbd>Shift+Esc</kbd></td>
			<td>Checking mode only</td>
		</tr>
		<tr>
			<td>Switch to checking mode</td>
			<td><kbd>Shift+Esc</kbd></td>
			<td>Listening mode only</td>
		</tr>
	</tbody>
</table>

### Keyboard Shortcuts for Mac

<table class="a11ychecker">
	<thead>
		<tr>
			<th>Command</th>
			<th>Keystroke</th>
			<th>Restrictions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Open or close Accessibility Checker</td>
			<td><kbd>Command+Option+E</kbd></td>
			<td/>
		</tr>
		<tr>
			<td>Next issue</td>
			<td><kbd>Command+E</kbd></td>
			<td>Checking mode only</td>
		</tr>
		<tr>
			<td>Previous issue</td>
			<td><kbd>Command+Shift+E</kbd></td>
			<td>Checking mode only</td>
		</tr>
		<tr>
			<td>Close Accessibility Checker</td>
			<td><kbd>Esc</kbd></td>
			<td/>
		</tr>
		<tr>
			<td>Switch to listening mode</td>
			<td><kbd>Shift+Esc</kbd></td>
			<td>Checking mode only</td>
		</tr>
		<tr>
			<td>Switch to checking mode</td>
			<td><kbd>Shift+Esc</kbd></td>
			<td>Listening mode only</td>
		</tr>
	</tbody>
</table>

Please note that the predefined keyboard shortcuts can be changed with the custom configuration.

## Accessibility Checker Demo

See the {@linksdk accessibilitychecker working "Accessibility Checker" sample} where you can try how to detect and fix accessibility issues in your editor content.

## Related Features

Refer to the following resources for more information about accessibility in CKEditor:

* The {@link guide/dev/a11y/README Accessibility Support in CKEditor} article explains CKEditor compliance with some well-known accessibility standards and gives an overview of available accessibility-related features.
* The {@link guide/dev/features/shortcuts/README Keyboard Shortcuts} article lists all keyboard shortcuts supported in CKEditor.
* The {@link guide/dev/features/tabindex/README Page Navigation Using the "Tab" Key} article discusses how CKEditor participates in the page <kbd>Tab</kbd> order.
* The {@link guide/dev/section508/README CKEditor Section 508 Compliance} article describes CKEditor 4 compatibility with [Section 508 Amendment to the Rehabilitation Act of 1973](http://www.state.gov/m/irm/impact/c32157.htm).
* The {@link guide/dev/wcag/README CKEditor WCAG 2.0 Compliance} article describes CKEditor 4 compatibility with the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/) standard.
* The {@link guide/dev/integration/a11ychecker/custom_issue_types/README Custom Issue Types in Accessibility Checker} article shows how to add custom issue types.
* The {@link guide/dev/integration/a11ychecker/custom_quick_fixes/README Custom Quick Fixes in Accessibility Checker} article shows how to add custom Quick Fixes.