/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

module.exports = function( grunt ) {
	grunt.registerMultiTask( 'jsduck', 'Compiles documentation', function() {
		var dargs = require( 'dargs' ),
			options = this.options(),
			src = this.data.src,
			done = this.async();

		var args = src.concat( [ '--output', options.output ], dargs( options ) );

		var jsduck = grunt.util.spawn( {
			cmd: this.data.cmd,
			args: args,
			opts: {
				// Simply pass JSDuck output to Grunt.
				stdio: 'inherit'
			}
		}, function( error, result, code ) {
			done( error );
		} );
	} );
};
