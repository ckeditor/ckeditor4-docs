/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

const fs = require( 'fs' );

const promisify = require( './promisify.js' );

module.exports = ( { configFileSrc, configFileDst } ) => new Promise( ( resolve, reject ) => {
    let commonConfig = {};
    promisify( fs.stat, fs )( configFileSrc )
        .then( status => {
            if ( status.isFile() ) {
                return promisify( fs.readFile, fs)( configFileSrc );
            } else {
                reject();
            }
        } )
        .then( data => data.toString() )
        .then( data => { 
            commonConfig = JSON.parse( data );
        } )
        .then( () => promisify( fs.stat, fs )( configFileDst ) )
        .then( status => {
            if ( status.isFile() ) {
                return promisify( fs.readFile, fs)( configFileDst );
            } else {
                reject();
            }
        } )
        .then( data => data.toString() )
        .then( data => {
            let insertedData = '\t// Custom config injected by \'update-config-file.js\' script.\n';
            for ( const key in commonConfig ) {
                if ( commonConfig.hasOwnProperty( key ) ) {
                    insertedData += `\tconfig.${ key } = '${ commonConfig[ key ] }';\n`;
                }
            }
            insertedData += '\t// End of injected config.\n';
            return data.replace( /function\( config \) \{\n/, 'function( config ) {\n' + insertedData );
        } )
        .then( data => promisify( fs.writeFile, fs )( configFileDst, data, 'utf8' ) )
        .then( () => {
            resolve();
        } );
} );
