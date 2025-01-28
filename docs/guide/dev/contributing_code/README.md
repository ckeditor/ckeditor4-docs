---
category: contributing
order: 40
url: guide/dev_contributing_code
menu-title: Contributing Code
meta-title-short: Contributing Code
---
<!--
Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md.
-->

# Contributing Code and Providing Patches to CKEditor 4

To propose a bug fix or a new functionality you need to create a pull request in the [CKEditor GitHub repository](https://github.com/ckeditor/ckeditor4) (you can read more about [pull requests](https://help.github.com/articles/using-pull-requests/) and [how to create them](https://help.github.com/articles/creating-a-pull-request/) first).

## Setting Up the Development Environment

1. [Fork the CKEditor repository](https://help.github.com/articles/fork-a-repo/) and clone your fork.
1. Set the development tools up if you are planning to make changes in the editor code. If you want to make a simple typographical change or a change in the comments or API docs, then you can skip the next steps.

	* Install [Node.js](https://nodejs.org/).
	* [Install Grunt globally](http://gruntjs.com/getting-started):

			npm install -g grunt-cli

	* Install CKEditor's development dependencies (Grunt plugins, {@link guide/dev/tests/README Bender.js}, etc.)

			cd ckeditor4
			npm install

	* Set the {@link guide/dev/tests/README testing environment} up, because your changes in the editor code will need tests.
	* Install Git hooks (currently there is only one hook that will run a linter and code style checker when you make a commit):

			grunt githooks

		Note: You can run linter and code style checker on the files that were modified (and not committed yet) by executing the default Grunt task:

			grunt

		Or on the entire repository (it takes a while...):

			grunt jshint:all && grunt jscs:all

## Branches

When the environment is set up and running you can start working on your patch. First, create a separate branch to group your changes. If there is an issue on our [GitHub issues page](https://github.com/ckeditor/ckeditor4/issues) use its number, otherwise {@link guide/dev/issues_tracker/README create a new issue} yourself and use its number or just pick any meaningful name:

	git checkout -b t/12345

## Tests

Note that all patches which change the editor code **must include tests**.

Every change which can be tested automatically should have at least one automated test. Read about {@link guide/dev/tests/README#creating-your-own-test writing tests in Bender.js}.

<info-box hint="">
 If you do not know how to write tests for your patch, you can make an {@link guide/dev/contributing_code/README#proposing-incomplete-patches incomplete pull request} and the core team will give you some hints or perhaps someone else from the community will step in.
</info-box>

Some types of features or bugs cannot be tested automatically. In such cases, create a manual test (see [this one](https://github.com/ckeditor/ckeditor4/tree/master/tests/tickets/12735) for instance).

<info-box hint="">
 To see manual tests in the Bender.js dashboard you need to change the filter from <code>is:unit</code> to <code>is:manual</code>.
</info-box>

## Creating a Pull Request

Once your patch is ready, tested and committed, push your branch to your CKEditor 4 fork:

	git push origin t/12345

And [create a pull request](https://help.github.com/articles/creating-a-pull-request/) in the official [CKEditor repository](https://github.com/ckeditor/ckeditor4).

## Review

A CKEditor 4 core developer will review your patch. We will check things like:

* Is it clear what the patch is meant to do?
* Does the patch have tests?
* Do the changes fix the issue or do what they were meant to do?
* Is the code style correct?

Reviewing takes a lot of time and the core team is not always able to find time for it. We are sorry for any late replies that may happen!

## Changes That Cannot Be Accepted as a Pull Request

There are two main groups of changes that usually cannot be accepted as pull requests:

* New plugins. If you want to propose a new functionality which does not require changes in the core plugins, we kindly ask you to create a new plugin and add it to the [Add-Ons Repository](https://ckeditor.com/cke4/addons/plugins/all). The reason for that is that the core developers are able to maintain a limited number of plugins.
* Changes in language files. All localization fixes and improvements should be done through the [CKEditor UI Translation Center](https://www.transifex.net/projects/p/ckeditor/). Read more in the [Localization](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Localization) guide.

## Proposing Incomplete Patches

It may happen that you are unsure about the change that you want to make (e.g. whether you are heading in the right direction) or that you do not know how to write tests for it. Do not worry and just propose an incomplete patch. Try to explain what obstacles you encountered, so that the core team or other developers would be able to help you.
