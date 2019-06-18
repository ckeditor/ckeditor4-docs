---
category: accessibility-checker
order: 30
url: guide/dev_a11ychecker_custom_quick_fixes
menu-title: Custom Quick Fixes
meta-title-short: Custom Quick Fixes
---
<!--
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Custom Quick Fixes in Accessibility Checker

<info-box info="">
<p>
    This feature is provided through optional plugins (<a href="https://ckeditor.com/cke4/addon/a11ychecker">Accessibility Checker</a> and <a href="https://ckeditor.com/cke4/addon/balloonpanel">Balloon Panel</a>) that are not included in the CKEditor presets available from the <a href="https://ckeditor.com/ckeditor-4/download/">Download</a> site and {@link guide/dev/plugins/README need to be added to your custom build} with <a href="https://ckeditor.com/cke4/builder">online builder</a>.
</p>
<p>
    Accessibility Checker is available under a <a href="http://www.gnu.org/licenses/gpl.html">GPL</a> or commercial license. <a href="https://cksource.com/contact">Contact</a> us for more details.
</p>
</info-box>

Note: The following instructions work starting with Accessibility Checker **1.1.1** version.

Before reading this guide please make sure you read the {@link guide/dev/integration/a11ychecker/custom_issue_types/README Creating Custom Issue Types} guide.

To register a custom Quick Fix you need to:

* Register the Quick Fix type (class) - this defines the Quick Fix logic.
* Bind the Quick Fix with Issue IDs - so that Accessibility Checker knows that a given Quick Fix applies to a particular issue type.

Quick Fixes are stored as JavaScript types in the static `CKEDITOR.plugins.a11ychecker.quickFixes` namespace. A new Quick Fix type must extend the base `QuickFix` (or inheriting) type.

## Sample Code

The code below adds a simple issue for each `<strong>` element. It suggests changing it into an `<em>` element.

The Quick Fix does the transformation for the user.

Note that this Quick Fix extends the `ElementReplace` type, to avoid repeating the logic.


```js
var config = {
    height: 150,

    on: {
        instanceReady: function() {
            var editor = this,
                a11ychecker = editor._.a11ychecker;

            // Depending on whether it is a dev version or not, AC might not be available yet (#246).
            if ( a11ychecker.exec ) {
                a11yCheckerReady( editor )
            } else {
                a11ychecker.once( 'loaded', function() {
                    a11yCheckerReady( editor );
                } );
            }

            function a11yCheckerReady( editor ) {
                var a11ychecker = editor._.a11ychecker,
                    a11ycheckerStatic = CKEDITOR.plugins.a11ychecker;

                // Register Quick Fix.
                a11ycheckerStatic.quickFixes.get( {
                    name: 'ElementReplace',
                    callback: function( ElementReplace ) {
                        /**
                         * Replaces `<strong>` elements with `<em>`.
                         *
                         * @member CKEDITOR.plugins.a11ychecker.ElementReplace
                         * @class StrongReplace
                         * @constructor
                         * @param {CKEDITOR.plugins.a11ychecker.Issue} issue
                         */
                        function StrongReplace( issue ) {
                            ElementReplace.call( this, issue );
                        }

                        StrongReplace.prototype = new ElementReplace();
                        StrongReplace.prototype.constructor = StrongReplace;

                        /**
                         * Returns the name of the tag that `issue.element` should be converted to.
                         *
                         * @member CKEDITOR.plugins.a11ychecker.ElementReplace.StrongReplace
                         * @param {Object} formAttributes Form attributes from `fix` method.
                         * @returns {String}
                         */
                        StrongReplace.prototype.getTargetName = function( formAttributes ) {
                            return 'em';
                        };

                        a11ycheckerStatic.quickFixes.add( 'StrongReplace', StrongReplace );
                    }
                } );

                // Bind Quick Fix.
                a11ychecker.engine.fixesMapping.avoidStrongs = [ 'StrongReplace' ];

                a11ychecker.engine.on( 'process', function( evt ) {
                    var Issue = a11ycheckerStatic.Issue,
                        strongs = evt.data.contentElement.find( 'strong' ),
                        issues = evt.data.issues;

                    a11ychecker.engine.issueDetails.avoidStrongs = {
                        title: 'Avoid strongs',
                        descr: 'Our customers do not like <strong>strongs</strong>, use <em>emphasize</em> instead 😉'
                    }

                    CKEDITOR.tools.array.forEach( strongs.toArray(), function( strong ) {
                        issues.addItem( new Issue( {
                            originalElement: strong,
                            testability: Issue.testability.ERROR,
                            id: 'avoidStrongs'
                        }, a11ychecker.engine ) );
                    } );
                } );
            };
        }
    }
}
```

## Related Features

Refer to the following resources for more information about Accessibility Checker:

* The {@link features/accessibility_checker/README Managing Content Accessibility with Accessibility Checker} article explains how Accessibility Checker works.
* The {@link guide/dev/integration/a11ychecker/custom_issue_types/README Custom Issue Types in Accessibility Checker} article shows how to add custom issue types.
