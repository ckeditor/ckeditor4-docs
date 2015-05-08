<!--
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md.
-->

# Contributing to CKEditor

This section explains how you can contribute to CKEditor development. CKEditor is an Open Source product that is free for anyone to download, use, and customize. It has an amazing community around it that supports it in all possible ways. If you would like to contribute to its development, you can consider the following actions:

1. [Report bugs](#!/guide/dev_issues_readme) or feature requests and submit patches on our [Development site](http://dev.ckeditor.com/).

2. Fork CKEditor at [GitHub](https://github.com/ckeditor/ckeditor-dev), fix bugs or propose new functionality by using [pull requests](#!/guide/dev_contributing-section-contributing-patches).

3. Create your own plugins or skins and submit them to [CKEditor Add-Ons Repository](http://ckeditor.com/addons/plugins).

4. Help [localize CKEditor](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Localization) into your native language and update existing localizations by joining us at the [CKEditor UI Translation Center](https://www.transifex.net/projects/p/ckeditor/).

5. Join StackOverflow and share your knowledge with [fellow CKEditor users and developers](http://stackoverflow.com/questions/tagged/ckeditor).

**Your help will be much appreciated!**

## Contributing Patches ##

To propose a bug fix or a new functionality you need to create a pull request in the [CKEditor's GitHub repository](https://github.com/ckeditor/ckeditor-dev) (you can read more about [pull requests](https://help.github.com/articles/using-pull-requests/) and [how to create them](https://help.github.com/articles/creating-a-pull-request/)).

### Setting Up the Development Environment

1. [Fork CKEditor repository](https://help.github.com/articles/fork-a-repo/) and clone your fork.
1. Set the development tools up if you are planning to make changes in the code. If you want to make a simple typographical change or a change in comments or API docs, then you can skip the next steps.

	* Install [Node.js](https://nodejs.org/).
	* [Install Grunt globally](http://gruntjs.com/getting-started):

			npm install -g grunt-cli

	* Install CKEditor's development dependencies (Grunt plugins, [Bender.js](#!/guide/dev_tests), etc.)

			cd ckeditor-dev
			npm install

	* Set the [testing environment](#!/guide/dev_tests) up, because your changes in the code will need tests.
	* Install Git hooks (currently there is only one hook that will run a linter and code style checker when you make a commit):

			grunt githooks

		Note: You can run linter and code style checker on the files that were modified (and not committed yet) by executing the default Grunt task:

			grunt

		Or on the entire repository (it takes a while...):

			grunt jshint:all && grunt jscs:all

### Branches

When the environment is set up and working you can start working on your patch. First, create a separate branch to group your changes. If there's a ticket on http://dev.ckeditor.com use its number, otherwise create a new ticket yourself and use its number or just pick any meaningful name:

	git checkout -b t/12345

### Tests

Note that all patches which change the code must include tests.

Every change which can be tested automatically should have at least one automated test. Read about [writing tests in Bender.js](#!/guide/dev_tests-section-creating-your-own-test).

<p class="tip">If you do not know how to write tests for your patch, you can make an <a href="#!/guide/dev_contributing-section-proposing-incomplete-patches">incomplete pull request</a> and the core team will give you some hints or perhaps someone else from the community will step in.</p>

Some type of features or bugs cannot be tested automatically. In such cases, make sure to create a manual test (see [this one](https://github.com/ckeditor/ckeditor-dev/tree/master/tests/tickets/12735) for instance).

<p class="tip">To see manual tests in Bender.js dashboard you need to change the filter from "is:unit" to "is:manual".</p>

### Creating a Pull Request

Once your patch is ready, tested and committed, push your branch to your fork:

	git push origin t/12345

And [create a pull request](http://gruntjs.com/getting-started) in [CKEditor's repository](https://github.com/ckeditor/ckeditor-dev).

### Review

The CKEditor core developer will review your patch. They will check things like:

* is it clear what the patch is meant to do?
* does the patch have tests?
* do the changes fix the issue or do what were meant to do?
* is the code style correct?

Reviewing takes a lot of time and the core team is not always able to find time for it. Therefore, we are sorry for any late replies that may happen.

### Changes That Cannot Be Accepted As Pull Request

There are two main groups of changes that usually cannot be accepted as pull requests:

* New plugins. If you want to propose a new functionality which does not require changes in the core plugins, we kindly ask you to add it to the [Add-Ons Repository](http://ckeditor.com/addons/plugins). The reason for that is that the core developers are able to maintain a limited number of plugins.
* Changes in language files. All localization fixes and improvements must be done through the [CKEditor UI Translation Center](https://www.transifex.net/projects/p/ckeditor/). Read more in the [Localization](http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Localization) guide.

### Proposing Incomplete Patches

It may happen that you are unsure about the change that you want to make (e.g. whether you are heading the right direction) or that you do not know how to write tests for it. Do not worry and just propose an incomplete patch. Try to explain what obstacles you encountered, so the core team or other developers will be able to help you.

## Resources ##

The following resources might be helpful if you decide to contribute to CKEditor development:

1. **[Reporting Issues](#!/guide/dev_issues_readme)** &ndash; Learn how to check if the issue you are experiencing is a genuine CKEditor bug.

2. **[Issues Tracker Site](#!/guide/dev_issues_tracker)** &ndash; See how our bug tracker works and what should be included in a proper bug report.

3. **[Code Documentation Standards](#!/guide/dev_code_documentation)** &ndash; Information about CKEditor source code documentation.

4. **[Testing Environment and Writing Tests](#!/guide/dev_tests)** &ndash; Information about installing and running CKEditor testing environment and introduction to writing CKEditor tests.