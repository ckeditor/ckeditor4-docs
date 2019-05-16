---
category: accessibility-checker
order: 20
url: guide/dev_a11ychecker_custom_issue_types
menu-title: Custom Issue Types
meta-title-short: Custom Issue Types
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Custom Issue Types in Accessibility Checker

<info-box info="">
<p>
    This feature is provided through optional plugins (<a href="https://ckeditor.com/cke4/addon/a11ychecker">Accessibility Checker</a> and <a href="https://ckeditor.com/cke4/addon/balloonpanel">Balloon Panel</a>) that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</p>
<p>
    Accessibility Checker is available under a <a href="http://www.gnu.org/licenses/gpl.html">GPL</a> or commercial license. <a href="https://cksource.com/contact">Contact</a> us for more details.
</p>
</info-box>

Note: The following instructions work starting with Accessibility Checker **1.1.1** version.

In order to hook into the process of issue gathering there are a few things to be done:

* Registering the {@link features/accessibility_checker/README#what-exactly-are-issues issue type}.
* Hooking to the `process` event of `editor._.a11ychecker.engine`.

In this guide whenever we refer to the `editor` variable, it is an instance of {@linkapi CKEDITOR.editor CKEDITOR.editor} type, and when referring to the `a11ychecker` variable, it is a `editor._.a11ychecker` member.

## Complete Code Snippet

This guide is based on the following code:

```js
var config = {
    on: {
        instanceReady: function() {
            var editor = this,
                a11ychecker = editor._.a11ychecker;

            // Depending on whether it is a dev version or not, Accessibility Checker might not be available yet (#246).
            if ( a11ychecker.exec ) {
                a11yCheckerReady( editor )
            } else {
                a11ychecker.once( 'loaded', function() {
                    a11yCheckerReady( editor );
                } );
            }

            // This function simply registers the meta data of the custom Issues.
            function registerCustomIssueTypes( a11ychecker ) {
                a11ychecker.engine.issueDetails.preferHttpsLinks = {
                    title: 'Prefer HTTPS links',
                    descr: 'It\'s year ' + ( new Date() ).getFullYear() + ' already - our website uses HTTPS. ' +
                        'You should use a safe protocol whenever possible.'
                };

                a11ychecker.engine.issueDetails.avoidStrongs = {
                    title: 'Avoid strongs',
                    descr: 'Our users do not like <strong>strongs</strong>, use <em>emphasize</em> instead 😉'
                };
            }

            function a11yCheckerReady( editor ) {
                var a11ychecker = editor._.a11ychecker;

                registerCustomIssueTypes( a11ychecker );

                a11ychecker.engine.on( 'process', function( evt ) {
                    // This is where the actual checking occurs, and this is where you want to report custom issues.
                    var Issue = CKEDITOR.plugins.a11ychecker.Issue,
                        contentElement = evt.data.contentElement,
                        issues = evt.data.issues;

                    CKEDITOR.tools.array.forEach( contentElement.find( 'a[href^="http://ckeditor.com"]' ).toArray(), function( link ) {
                        issues.addItem( new Issue( {
                            originalElement: link,
                            testability: Issue.testability.ERROR,
                            id: 'preferHttpsLinks'
                        }, a11ychecker.engine ) );
                    } );

                    CKEDITOR.tools.array.forEach( contentElement.find( 'strong' ).toArray(), function( strong ) {
                        issues.addItem( new Issue( {
                            originalElement: strong,
                            testability: Issue.testability.NOTICE,
                            id: 'avoidStrongs'
                        }, a11ychecker.engine ) );
                    } );
                } );
            };
        }
    }
}

CKEDITOR.replace( 'editor1', config );
```

HTML code:

```html
<textarea id="editor1" cols="10" rows="10">
    &lt;p&gt;This is a &lt;a href=&quot;http://ckeditor.com&quot;&gt;http link&lt;/a&gt; that should be changed to a &lt;a href=&quot;https://ckeditor.com&quot;&gt;https link like this.&lt;/a&gt;&lt;/p&gt;
    &lt;p&gt;This &lt;strong&gt;is&lt;/strong&gt; a &lt;strong&gt;sample&lt;/strong&gt; &lt;em&gt;text&lt;/em&gt;.&lt;/p&gt;
</textarea>
```

## Registering Issue Type

Accessibility Checker is designed in the way that issue details (such as title, description and other meta data) are centralized in the Accessibility Checker checking engine, and not duplicated for each accessibility issue that occurred.

Issue details should be registered in `a11ychecker.engine.issueDetails` which acts as a dictionary. An example assignment would look like the following:

```js
a11ychecker.engine.issueDetails.avoidStrongs = {
    title: 'Avoid strongs',
    descr: 'Our users do not like <strong>strongs</strong>, use <em>emphasize</em> instead 😉'
}
```

The code above adds an `avoidStrongs` issue type (it is an ID that should be used later).

## Hooking to the `process` Event

The `process` event is fired as the Accessibility Checker engine starts gathering the issues. It features two important data members:

* `evt.data.contentElement` &ndash; This is an element with the editor output. This is where you want to search for your content issues. For more information see the `evt.data.contentElement` section below.
* `evt.data.issues` &ndash; This is a list of issues that will be later displayed to the end user. You want to add your issues to that particular list.

Look at the example below, it finds a single `<strong>` element. If present, it will simply add one issue (ID of `avoidStrongs`), anchored to that particular `<strong>` element.

```js
a11ychecker.engine.on( 'process', function( evt ) {
    var strong = evt.data.contentElement.findOne( 'strong' );

    if ( strong ) {
        issues.addItem( new Issue( {
            originalElement: strong,
            testability: Issue.testability.ERROR,
            id: 'avoidStrongs'
        }, a11ychecker.engine ) );
    }
} );
```

### `data.contentElement`

This is the place (a DOM element) where you should look for the content quality issues. This is the place that contains the _output_ of your current CKEditor 4 content.

**Why do we use this "proxy" rather than working directly on the editable?**

CKEditor 4 often stores elements that are transformed into something different from what you see in the editable (widgets, fake objects). For that reason the best solution is to check the real output HTML to search for accessibility issues.

Accessibility Checker will automatically mark these issues in the editor editable.

## Related Features

Refer to the following resources for more information about Accessibility Checker:

* The {@link features/accessibility_checker/README Managing Content Accessibility with Accessibility Checker} article explains how Accessibility Checker works.
* The {@link guide/dev/integration/a11ychecker/custom_quick_fixes/README Custom Quick Fixes in Accessibility Checker} article shows how to add custom Quick Fixes.
