/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.plugins.setLang( 'a11ychecker', 'en', {
	toolbar: 'Check Accessibility',
	closeBtn: 'Close',
	testability: {
		'0': 'notice',
		'0.5': 'warning',
		'1': 'error'
	},
	ignoreBtn: 'Ignore',
	ignoreBtnTitle: 'Ignore this issue',
	stopIgnoreBtn: 'Stop ignoring',
	listeningInfo: 'Waiting for manual content changes. When done, click <strong>Check again</strong> below.',
	listeningCheckAgain: 'Check again',
	balloonLabel: 'Accessibility Checker',
	navigationNext: 'Next',
	navigationNextTitle: 'Next issue',
	navigationPrev: 'Previous',
	navigationPrevTitle: 'Previous issue',
	quickFixButton: 'Quick fix',
	quickFixButtonTitle: 'Quick fix this issue',
	navigationCounter: 'Issue {current} of {total} ({testability})',
	noIssuesMessage: 'The document does not contain any accessibility issues.'
} );
