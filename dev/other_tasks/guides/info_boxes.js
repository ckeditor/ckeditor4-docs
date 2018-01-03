/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const cheerio = require( 'cheerio' );

module.exports = ( content ) => {
	const $ = cheerio.load( content );

	$( 'div.tip, div.requirements' ).each( function() {
		const type = $( this ).attr( 'class' ) === 'tip' ? 'hint' : 'info';
		$( this ).replaceWith( `<info-box ${ type }>${ $( this ).html() }</info-box>` );
	} );

	return $( 'body' ).html();
};
