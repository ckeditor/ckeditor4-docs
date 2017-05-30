<!--
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Issues Tracker Site

CKEditor issues are handled in the [GitHub issues page](https://github.com/ckeditor/ckeditor-dev/issues) since the 4.7.0 release
which took place on May 25th, 2017. The [former tracking system](https://dev.ckeditor.com) is still available in the read-only mode and all past issues are still available publicly.

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

Only registered GitHub users may create issues, if you are not registered, take a minute to [create a GitHub account](https://github.com/join).

This is it. Once you log in, you will be ready to [report a CKEditor issue](https://github.com/ckeditor/ckeditor-dev/issues/new).

### Labels

Every issue may be marked with the following labels:

* Status labels - current issue status
    * <span style="background-color:#e6e6e6">status:pending</span> - more information is needed to proceed with the issue,
    * <span style="background-color:#e6e6e6">status:confirmed</span> - issue confirmed by the development team
* Type labels - the type of the issue
    * <span style="background-color:#b60205;color:#FFF">type:bug</span> - a bug,
    * <span style="background-color:#1d76db;color:#FFF">type:feature</span> - a feature,
    * <span style="background-color:#fbca04">type:task</span> - any other issue (refactoring, typo fix, etc)
* Resolution labels - how and why issue was resolved
    * <span style="background-color:#444444;color:#FFF">resolution:fixed</span> - issue had been fixed and merged to `master`/`major` branch,
    * <span style="background-color:#444444;color:#FFF">resolution:invalid</span> - not a valid issue (not reproducible, 3rd-party bug, etc),
    * <span style="background-color:#444444;color:#FFF">resolution:duplicate</span> - duplicate of already reported issue,
    * <span style="background-color:#444444;color:#FFF">resolution:wontfix</span> - the issue is valid, however CKSource does not plan to fix it
* Other - additional information
    * <span style="background-color:#aaaaaa">support</span> - issue reported by the licensed client,
    * <span style="background-color:#34d058">easy</span> - relatively easy to fix, this is a perfect issue if you are willing to [create a Pull Request](#!/guide/dev_contributing_code)