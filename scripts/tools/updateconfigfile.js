/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const fs = require( 'fs-extra' );

module.exports = ( { configFileSrc, configFileDst } ) => new Promise( ( resolve, reject ) => {
	Promise.all( [ fs.readJson( configFileSrc ), fs.readFile( configFileDst ).then( data => data.toString() ) ] )
		.then( ( [ srcConfig, dstFile ] ) => {
			let insertedData = '\t// Common config injected by examples building script.\n';
			for ( const key in srcConfig ) {
				if ( srcConfig.hasOwnProperty( key ) && typeof srcConfig[ key ] === 'string' ) {
					insertedData += `\tconfig.${ key } = '${ srcConfig[ key ] }';\n`;
				}
			}
			insertedData += '\t// End of injected config.\n';
			return dstFile.replace( /function\( config \) \{\n/, 'function( config ) {\n' + insertedData );
		} )
		.then( data => fs.writeFile( configFileDst, data, 'utf8' ) )
		.then( () => {
			resolve();
		} )
		.catch( err => reject( err ) );
} );
