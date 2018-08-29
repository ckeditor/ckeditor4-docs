/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs' );
const buildCkeditor = require( './tools/build-ckeditor' );
const updateConfigFile = require( './tools/update-config-file' );
const promisify = require( './tools/promisify' );

const destinationPath = path.join( process.cwd(), 'docs', 'sdk', 'examples', 'vendors' );

module.exports = new Promise( ( resolve, reject ) => {
    makeFolder( destinationPath )
        .then( () => {
            console.log( 'Building CKEitor inside presets started.' );
            return buildCkeditor( {
                destinationPath,
                dev: false
            } )
        } )
        .then( () => {
            console.log( 'Inject variables into config' );
            return updateConfigFile( {
                configFileSrc: path.join( process.cwd(), 'common-examples-config.json' ),
                configFileDst: path.join( destinationPath, 'ckeditor', 'config.js' )
            } )
        } )
        .then( () => {
            console.log( 'Building CKEditor in presets complete.' );
            resolve();
        } )
        .catch( ( err ) => {
            process.exitCode = 1;
            reject( err );
        } );
} );

function makeFolder( createdFolder ) {
    return new Promise( ( resolve, reject ) => {
        if ( fs.existsSync( createdFolder ) ) {
            resolve( createdFolder );
        } else {
            fs.mkdir( createdFolder );
            resolve( createdFolder );
        }
    } );
};