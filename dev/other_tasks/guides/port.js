/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

'use strict';

const glob = require( 'glob' );
const path = require( 'path' );
const fs = require( 'fs-extra' );
const mime = require( 'mime' );
const addFrontMatter = require( './front_matter' );

module.exports = ( {
	srcDir,
	dstDir,
	assetsDir,
	guidesConfig
} = {} ) => {
	fs.emptyDirSync( path.resolve( dstDir ) );
	fs.emptyDirSync( path.resolve( assetsDir ) );

	const sourceFilePaths = glob.sync( path.join( srcDir, '**', '*' ), {
		ignore: [
			'**/icon.png',
			'**/guides.json'
		],
		nodir: true
	} );
	const filesToRename = [];

	for ( const filePath of sourceFilePaths ) {
		let outputPath;
		const mimeType = mime.getType( filePath );
		let fileContent = fs.readFileSync( filePath );

		if ( mimeType === 'text/markdown' ) {
			// TODO: Process the file.
			fileContent = addFrontMatter( fileContent, filePath.replace( 'guides/', '' ), guidesConfig );

			outputPath = path.resolve( dstDir, filePath.replace( 'guides/', '' ) );
		} else if ( mimeType.startsWith( 'image/' ) ) {
			outputPath = path.resolve( assetsDir, 'img', path.basename( filePath ) );
		} else {
			outputPath = path.resolve( assetsDir, path.basename( filePath ) );
		}

		const outputDir = path.dirname( outputPath );

		if ( fs.existsSync( outputPath ) ) {
			filesToRename.push( filePath );

			continue;
		}

		if ( filesToRename.length > 0 ) {
			continue;
		}

		// if ( !fs.existsSync( outputDir ) ) {
		// 	fs.mkdirsSync( outputDir );
		// }

		try {
			fs.outputFileSync( outputPath, fileContent )
			console.log( `Successfully written ${ outputPath }` )
		} catch ( err ) {
			console.error( `Error writing ${ outputPath }: ${ err }` )
		}

		// try {
		// 	fs.copySync( path.resolve( filePath ), outputPath )
		// 	console.log( `Successfully written ${ outputPath }` )
		// } catch ( err ) {
		// 	console.error( `Error writing ${ outputPath }: ${ err }` )
		// }
	}

	if ( filesToRename.length > 0 ) {
		console.error( 'There are file name conflicts. Please rename or remove listed files and run this task again:' );

		for ( const file of filesToRename ) {
			console.log( `Conflict: ${ file }` );
		}
	}
};
