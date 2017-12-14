<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Issues Tracker Site

<p class="tip">
    CKEditor issues are handled through the <a href="https://github.com/ckeditor/ckeditor-dev/issues">GitHub issues page</a> since the CKEditor 4.7 release (May 25th, 2017). The <a href="https://dev.ckeditor.com">former tracking system</a> is still available in the read-only mode and all past issues are still available publicly.
</p>

The issues page is used daily by the CKEditor core team to organize and distribute the development workflow. It is also the right place to report issues.

Before you attempt to report an issue, please make sure you read this page and thus help us optimize the management of issues.

## Required Information

Please provide the following when reporting new issues. The more information you provide, the quicker the problem may be solved:

 * **Descriptive summary** &ndash; A "right to the point" phrase that best summarizes the issue that you are having.
 * **Steps to reproduce** &ndash; This is the most important thing. We are not able to fix an issue if we cannot see it with our own eyes. A numbered list of actions to reproduce the issue is invaluable.
 * **Browser name and OS** &ndash; Your computer configuration, OS, browser name and version.
 * **Editor configuration** &ndash; Your editor version, integration method, editor build (you can attach your `build-config.js` file).
 * **Screenshot** &ndash; For interface-related issues an image speaks more than thousands of words.
 * **Sample data** &ndash; For content-related issues please attach a sample file from which we can get the text for testing.
 * **Test case file** &ndash; If possible, attach a test case file showing the issue. This is the best way to show us the problem and make it quicker to solve.

## Important

When filing an issue, please bear these important things in mind:

 * **Submit separate reports for each issue.** Do not include more than one issue in the same report.
 * Make sure **you are using the latest CKEditor version**. Maybe your issue has already been fixed.
 * Follow the instructions in the  **issue template** when reporting an issue.

## Reporting an Issue

Before clicking the following link, make sure you have read the instructions above!

Only registered GitHub users may create issues. If you are not registered, take a minute to [create a GitHub account](https://github.com/join).

Once you log in, you will be ready to [report a CKEditor issue](https://github.com/ckeditor/ckeditor-dev/issues/new).

### Labels

Every issue may be marked with the following labels:

* Status labels &mdash; current issue status:
    * <span style="background-color:#e6e6e6;padding:0 3px 0 3px">status:confirmed</span> &ndash; An issue confirmed by the development team.
    * <span style="background-color:#e6e6e6;padding:0 3px 0 3px">status:pending</span> &ndash; More information is needed to proceed with the issue.
* Type labels &mdash; the type of the issue:
    * <span style="background-color:#b60205;color:#FFF;padding:0 3px 0 3px">type:bug</span> &ndash; A bug.
    * <span style="background-color:#1d76db;color:#FFF;padding:0 3px 0 3px">type:feature</span> &ndash; A feature request.
    * <span style="background-color:#fbca04;padding:0 3px 0 3px">type:task</span>&ndash; Any other issue (refactoring, typo fix, etc).
    * <span style="background-color:#b60205;color:#FFF;padding:0 3px 0 3px">type:failingtest</span> &ndash; A failing test.
* Resolution labels &mdash; how and why the issue was resolved:
    * <span style="background-color:#444444;color:#FFF;padding:0 3px 0 3px">resolution:duplicate</span> &ndash; A duplicate of an already reported issue.
    * <span style="background-color:#444444;color:#FFF;padding:0 3px 0 3px">resolution:expired</span> &ndash; Issue reporter did not provide enough information to reproduce the issue for at least 2 weeks.
    * <span style="background-color:#444444;color:#FFF;padding:0 3px 0 3px">resolution:invalid</span> &ndash; Not a valid issue (wrong request type, support requests, etc).
    * <span style="background-color:#444444;color:#FFF;padding:0 3px 0 3px">resolution:cantreproduce</span> &ndash; A valid bug report that is not reproducible.
    * <span style="background-color:#444444;color:#FFF;padding:0 3px 0 3px">resolution:upstream</span> &ndash; Issue in the third-party software.
    * <span style="background-color:#444444;color:#FFF;padding:0 3px 0 3px">resolution:wontfix</span> &ndash; The issue is valid, however, CKSource does not plan to fix it.
    * If an issue is closed and there is no resolution label, it means that the issue was fixed and merged to the `master` or `major` branch.
* Browser labels &mdash; for browser-specific bugs:
    * <span style="background-color:#5319e7;color:#FFF;padding:0 3px 0 3px">browser:NNN</span> &ndash; The issue can only be reproduced in a particular browser.
* Plugin labels &mdash; for plugin-specific bugs:
    * <span style="background-color:#fef2c0;color:#000;padding:0 3px 0 3px">plugin:NNN</span> &ndash; The plugin which probably causes the issue.
* Changelog labels:
    * <span style="background-color:#fef2c0;color:#000;padding:0 3px 0 3px">changelog:skip</span> &ndash; A changelog entry should not be added for a given issue.
    * <span style="background-color:#fef2c0;color:#000;padding:0 3px 0 3px">changelog:api</span> &ndash; A changelog entry should be put in the API section of the changelog.
* Other &mdash; additional information:
    * <span style="background-color:#34d058;padding:0 3px 0 3px">easy</span> &ndash; Relatively easy to fix. This is a perfect issue if you are willing to [create a Pull Request](#!/guide/dev_contributing_code).
    * <span style="background-color:#b60205;color:#FFF;padding:0 3px 0 3px">regression</span> &ndash; This issue is a regression.
    * <span style="background-color:#aaaaaa;padding:0 3px 0 3px">support</span> &ndash; An issue reported by a commercially licensed client.
    * <span style="background-color:#34d058;padding:0 3px 0 3px">review:easy</span> &ndash; Pull requests that can be reviewed by a Junior Developer before being reviewed by the Reviewer.
    * <span style="background-color:#fef2c0;color:#000;padding:0 3px 0 3px">accessibility</span> &ndash; Issue related to accessibility.
    * <span style="background-color:#c5def5;color:#000;padding:0 3px 0 3px">target:NNN</span> &ndash; Denotes the branch that the issue should be merged to.
