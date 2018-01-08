/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const path = require( 'path' );
const cheerio = require( 'cheerio' );

module.exports = ( content, guidesConfig ) => {
	let newContent = content;

	// Fix JSDoc links.
	const regexpJsd = /{@link\s+(CKEDITOR[^\s}]*)\s*([^}]*)}/g;

	newContent = newContent.replace( regexpJsd, ( match, href, linkText ) => {
		return `{@linkapi ${ href } ${ linkText }}`;
	} );

	// Fix backtick links.
	const regexpBt = /\`(CKEDITOR[^\s\`)(}{]*)\`/g;

	newContent = newContent.replace( regexpBt, ( match, href ) => {
		return `{@linkapi ${ href } ${ href }}`;
	} );

	// Fix markdown links.
	const regexpMd = /\[([^\]]+)\]\((#!\/[^\s)]+)\)/g;

	newContent = newContent.replace( regexpMd, ( match, linkText, href ) => {
		if ( href.startsWith( '#!/guide' ) ) {
			return buildLinkToGuide( match, linkText, href, guidesConfig );
		} else if ( href.startsWith( '#!/api' ) ) {
			return buildLinkToAPI( linkText, href );
		} else {
			console.warn( 'Unexpected link.' );
		}
	} );

	// Fix HTML links.
	const $ = cheerio.load( newContent, {
		decodeEntities: false,
		xmlMode: true
	} );

	$( 'a' ).each( function() {
		const match = $( this ).toString();
		const linkText = $( this ).text();
		const href = $( this ).attr( 'href' );

		if ( !href ) {
			return true;
		}

		if ( href.startsWith( '#!/guide' ) ) {
			$( this ).replaceWith( buildLinkToGuide( match, linkText, href, guidesConfig ) );
		} else if ( href.startsWith( '#!/api' ) ) {
			$( this ).replaceWith( buildLinkToAPI( linkText, href ) );
		}
	} );

	newContent = $.html();

	return newContent;
};

function buildLinkToGuide( match, linkText, href, guidesConfig ) {
	if ( href === '#!/guide' ) {
		return `{@link guide/index ${ linkText }}`;
	}

	href = href.replace( '-section-', '#' )
		.replace( /%22/g, '' );

	const guideNamePre = path.basename( href );
	const hashIndex = guideNamePre.indexOf( '#' );
	const hashAndRest = hashIndex > 0 ? guideNamePre.substring( hashIndex ) : '';
	const guideName = hashIndex > 0 ? guideNamePre.substring( 0, hashIndex ) : guideNamePre;
	const targetGuideConfig = getGuideConfig( guideName, guidesConfig );

	if ( !targetGuideConfig ) {
		console.warn( `Couldnt find guideConfig for link ${ match }` );

		return match;
	}

	const newHref = path.join( 'guide', targetGuideConfig.url, 'README' );

	return `{@link ${ newHref }${ hashAndRest } ${ linkText }}`;
}

function buildLinkToAPI( linkText, href ) {
	href = href.replace( '-section-', '#' )
		.replace( '-property-S-', '#' )
		.replace( '-property-', '#' )
		.replace( '-static-method-', '#' )
		.replace( '-method-', '#' )
		.replace( '-event-', '#' )
		.replace( '-cfg-', '#' );

	if ( href === '#!/api' ) {
		return `{@link api/index ${ linkText }}`;
	}

	const apiHref = path.basename( href );

	return `{@linkapi ${ apiHref } ${ linkText }}`;
}

function getGuideConfig( name, guidesData ) {
	for ( const item of guidesData ) {
		if ( item.name === name ) {
			return item;
		}

		let result;

		if ( item.items && item.items.length > 0 ) {
			result = getGuideConfig( name, item.items );
		}

		if ( result ) {
			return result;
		}
	}
}
