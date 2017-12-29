/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const path = require( 'path' );

module.exports = ( content, filePath, guidesConfig ) => {
	const guideConfig = getGuideConfig( path.dirname( filePath ), guidesConfig );

	if ( !guideConfig ) {
		// throw new Error( `Couldn't find guide config for ${ filePath }` );
		return null;
	}

	let frontMatter = [ '---' ];
	frontMatter.push( makeCategory( guideConfig.parent ) );
	const order = makeOrder( guideConfig.item, guideConfig.parent );

	if ( order ) {
		frontMatter.push( `order: ${ order }` );
	}

	frontMatter.push( `url: guide/${ guideConfig.item.name }` );
	frontMatter.push( `menu-title: ${ guideConfig.item.title }` );
	frontMatter.push( `meta-title-short: ${ guideConfig.item.title }` );

	if ( guideConfig.item[ 'meta-description' ] ) {
		frontMatter.push( `meta-description: ${ guideConfig.item[ 'meta-description' ] }` );
	}

	frontMatter.push( '---' );
	frontMatter = frontMatter.join( '\n' );

	return frontMatter + '\n' + content;
};

// Find guide's data in guides.json.
function getGuideConfig( filePath, guidesData, parent ) {
	for ( const item of guidesData ) {
		if ( item.url === filePath ) {
			return {
				item,
				parent
			};
		}

		let result;

		if ( item.items && item.items.length > 0 ) {
			result = getGuideConfig( filePath, item.items, item );
		}

		if ( result ) {
			return result;
		}
	}
}

function makeCategory( parent ) {
	if ( !parent ) {
		return 'category: none';
	}

	return `category: ${ parent.title.toLowerCase().replace( /,\s/g, '-' ).replace( /\s/g, '-' ) }`;
}

function makeOrder( item, parent ) {
	const index = parent && parent.items ? parent.items.indexOf( item ) : -1;

	if ( index !== -1 ) {
		return ( index + 1 ) * 20;
	}
}
