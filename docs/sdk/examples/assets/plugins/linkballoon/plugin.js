/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( function() {
	'use strict';

	CKEDITOR.plugins.add( 'linkballoon', {
		requires: 'balloontoolbar,link,openlink',

		afterInit: function( editor ) {
			editor.ui.addButton( 'OpenLink', {
				command: 'openLink',
				toolbar: 'links,50',
				label: editor.lang.openlink.menu
			} );

			editor.balloonToolbars.create( {
				buttons: 'OpenLink,Link,Unlink',
				cssSelector: 'a'
			} );
		}
	} );
} )();