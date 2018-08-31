/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs' );
const buildCkeditor = require( './tools/build-ckeditor' );
const updateConfigFile = require( './tools/update-config-file' );
const chalk = require( 'chalk' );

const destinationPath = path.join( process.cwd(), 'docs', 'sdk', 'examples', 'vendors' );

module.exports = new Promise( ( resolve, reject ) => {
    makeFolder( destinationPath )
        .then( () => buildCkeditor( {
            destinationPath
        } ) )
        .then( () => updateConfigFile( {
            configFileSrc: path.join( process.cwd(), 'common-examples-config.json' ),
            configFileDst: path.join( destinationPath, 'ckeditor', 'config.js' )
        } ) )
        .then( () => {
            console.log( chalk.greenBright( 'Building CKEditor in presets complete.' ) );
            resolve();
        } )
        .catch( ( err ) => {
            process.exitCode = 1;
            reject( err );
        } );
} );

function makeFolder( createdFolder ) {
    return new Promise( ( resolve ) => {
        if ( fs.existsSync( createdFolder ) ) {
            resolve( createdFolder );
        } else {
            fs.mkdir( createdFolder );
            resolve( createdFolder );
        }
    } );
};