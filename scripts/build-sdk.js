/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const path = require( 'path' );
const fs = require( 'fs' );
const buildCkeditor = require( './tools/build-ckeditor' );
const updateConfigFile = require( './tools/update-config-file' );
const chalk = require( 'chalk' );
const promisify = require( './tools/promisify.js' );

module.exports = new Promise( ( resolve, reject ) => {
    let destinationPath;

    getConfigSdkPath()
        .then( configParts => path.join( process.cwd(), 'docs', ...configParts, 'vendors' ) )
        .then( dstPth => {
            destinationPath = dstPth;
        } )
        .then( () => makeFolder( destinationPath ) )
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

function getConfigSdkPath() {
    return new Promise( ( resolve, reject ) => {
        const umbertoJsonPath = path.join( process.cwd(), 'umberto.json' );
        promisify( fs.readFile, fs )( umbertoJsonPath, 'utf8' )
            .then( data => data.toString() )
            .then( data => JSON.parse( data ) )
            .then( data => {
                const sdkGroup = data.groups.find( g => g.id === 'sdk' );
                resolve( sdkGroup.sourceDir.split( '/' ) );
            } )
            .catch( err => {
                reject( err );
            } );
    } );
}