/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

const Umberto = require( 'umberto' );

module.exports = function( grunt ) {
	const packageVersion = grunt.file.readJSON( 'package.json' ).version;

	require( 'load-grunt-tasks' )( grunt );
	grunt.loadTasks( 'dev/tasks' );

	grunt.registerTask( 'api', [ 'jsduck:api' ] );
	grunt.registerTask( 'umberto', function() {
		const done = this.async();

		const skipApi = grunt.option( 'skipApi' );
		const skipValidation = grunt.option( 'skipValidation' );
		const dev = grunt.option( 'dev' );
		const clean = grunt.option( 'clean' );

		return Umberto.buildSingleProject( {
			skipApi,
			skipValidation,
			dev,
			clean
		} )
			.then( () => { done() } )
			.catch( err => {
				grunt.log.error( `Building Documentation failed: ${ err }` );
				done();
			} );
	} );

	grunt.registerTask( 'prepare-examples', function() {
		const buildSdk = require( './scripts/buildsdk' );

		const done = this.async();
		return buildSdk
			.then( () => {
				done();
			} )
			.catch( err => {
				if ( err ) {
					process.exitCode = 1;
					grunt.log.error( `Building Documentation failed: ${ err }` );
				}
			} );
	} );

	grunt.registerTask( 'fix-scayt-docs', function() {
		const done = this.async();
		const scaytMap = grunt.file.readJSON( 'scayturls.json' );
		let file = grunt.file.read( 'docs/api/data/CKEDITOR.config.json' );

		for ( const key in scaytMap ) {
			file = file.replace( new RegExp( '@@' + key , 'g' ), scaytMap[ key ] );
		}

		grunt.file.write( 'docs/api/data/CKEDITOR.config.json', file );

		done();
	} );

	// Hacky way to add build-angular task, but otherwise we have some webpack errors about circular references when building.
	// Also there is some conflict between two webpack configurations, building react in same way is working workaround.
	grunt.registerTask( 'build-angular', buildIntegrationTask( 'angular' ) );
	grunt.registerTask( 'build-react', buildIntegrationTask( 'react' ) );
	grunt.registerTask( 'build-vue', buildIntegrationTask( 'vue' ) );

	// Build docs for production/multidocs. It assumes Umberto is run by external process - useful when building as part of projects bundle.
	grunt.registerTask( 'before-build', [ 'clean', 'copy', 'api', 'fix-scayt-docs', 'prepare-examples', 'build-angular', 'build-react', 'build-vue' ] );

	grunt.registerTask( 'build', [ 'before-build', 'umberto' ] );
	grunt.registerTask( 'build-serve', [ 'build', 'connect' ] );

	grunt.registerTask( 'docs', function() {
		grunt.log.error( 'WARNING: \'docs\' task is deprecated please use \'build\' task instead!' );
		grunt.task.run( 'build' );
	} );

	grunt.registerTask( 'docs-serve', function() {
		grunt.log.error( 'WARNING: \'docs-serve\' task is deprecated please use \'build-serve\' task instead!' );
		grunt.task.run( 'build-serve' );
	} );

	grunt.registerTask( 'docs-prod', function() {
		grunt.log.error( 'WARNING: \'docs-prod\' task is deprecated please use \'before-build\' task instead!' );
		grunt.task.run( 'before-build' );
	} );

	grunt.initConfig( {
		path: grunt.option( 'path' ) || getCKEditorPath(),

		clean: {
			'docs-samples': [
				'docs/sdk/examples/assets/plugins/abbr',
				'docs/sdk/examples/assets/plugins/autotag',
				'docs/sdk/examples/assets/plugins/simplebox',
				'docs/sdk/examples/assets/plugins/timestamp'
			]
		},
		copy: {
			main: {
				files: [ {
					expand: true,
					cwd: 'node_modules/@wiris/mathtype-ckeditor4',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/ckeditor_wiris'
				}, {
					expand: true,
					cwd: 'node_modules/ckeditor4-plugin-spreadsheet/spreadsheet',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/spreadsheet'
				}, {
					expand: true,
					cwd: 'node_modules/ckeditor4-plugin-exportpdf',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/exportpdf'
				} ]
			},
			'docs-samples': {
				files: [ {
					expand: true,
					cwd: 'docs/sdk/examples/assets/ckeditor4-docs-samples/tutorial-abbr-acf/abbr',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/abbr'
				}, {
					expand: true,
					cwd: 'docs/sdk/examples/assets/ckeditor4-docs-samples/tutorial-autotag/autotag',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/autotag'
				}, {
					expand: true,
					cwd: 'docs/sdk/examples/assets/ckeditor4-docs-samples/tutorial-simplebox-2/simplebox',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/simplebox'
				}, {
					expand: true,
					cwd: 'docs/sdk/examples/assets/ckeditor4-docs-samples/tutorial-timestamp/timestamp',
					src: '**',
					dest: 'docs/sdk/examples/assets/plugins/timestamp'
				} ]
			}
		},
		jsduck: {
			api: {
				src: [
					'<%= path %>/core',
					'<%= path %>/plugins',
					'<%= path %>/adapters',
					'<%= path %>/ckeditor.js',

					'docs/sdk/examples/assets/plugins/exportpdf',
					'repos/ckeditor-presets/plugins/scayt',
					'repos/ckeditor-presets/plugins/wsc'
				],

				cmd: 'ckeditor-jsduck',

				options: {
					tags: 'source/customs.rb',
					warnings: [ '-nodoc', '-image_unused' ],
					output: 'docs/api/data',
					export: 'full',
					external: 'Blob,File,FileReader,DocumentFragment',
					exclude: '<%= path %>/plugins/codesnippet/lib',
					'ignore-html': 'source'
				}
			}
		},

		docs: {
			options: {
				skipApi: false,
				skipValidation: false,
				dev: false,
				clean: true
			}
		},

		'docs-serve': {
			options: {
				skipApi: false,
				skipValidation: false,
				dev: false,
				clean: true
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'build/docs',
					keepalive: true,
					open: 'http://localhost:9001/ckeditor4/' + packageVersion + '/guide/dev_installation.html'
				}
			}
		}
	} );

	// SEO is on by default, unless disabled via command–line `--seo false`.
	// This option is set here because JSDuck does not simply accept `seo: false` in config.
	if ( grunt.option( 'seo' ) !== false ) {
		grunt.config( 'jsduck.docs.options.seo', true );
	}

	function getCKEditorPath() {
		grunt.log.writeln( 'CKEditor Documentation Builder v' + packageVersion + '.' );

		let ckeditorPath = 'repos/ckeditor-presets/ckeditor';

		if ( process.env.CKEDITOR_DEV_PATH ) {
			grunt.log.writeln( '[i] Using CKEditor directory from CKEDITOR_DEV_PATH env variable.' );

			ckeditorPath = process.env.CKEDITOR_DEV_PATH;
		} else {
			grunt.log.writeln( '[i] CKEDITOR_DEV_PATH env variable not set. Looking for', '../ckeditor4'[ 'cyan' ], 'or', '../ckeditor-dev'[ 'cyan' ], 'directories.' );

			if ( grunt.file.exists( '../ckeditor4/ckeditor.js' ) ) {
				grunt.log.writeln( '[i] Directory', '../ckeditor4'[ 'cyan' ], 'found!' );
				ckeditorPath = '../ckeditor4';
			} else if ( grunt.file.exists( '../ckeditor-dev/ckeditor.js' ) ){
				grunt.log.writeln( '[i] Directory', '../ckeditor-dev'[ 'cyan' ], 'found!' );
				grunt.log.writeln( '[i] Please migrate to new folder structure renaming', 'ckeditor-dev'[ 'cyan' ], 'to', 'ckeditor4'[ 'yellow' ] );
				ckeditorPath = '../ckeditor-dev';
			} else {
				grunt.log.writeln( '[i] CKEditor directory not found.' );
			}
		}

		grunt.log.writeln( '[i] Using', ckeditorPath[ 'cyan' ], 'as source directory.' );

		return ckeditorPath;
	}

	function buildIntegrationTask( name ) {
		return function() {
			const done = this.async();

			grunt.util.spawn( {
				cmd: 'npm',
				args: [ 'run', 'build-' + name ],
				opts: { stdio: 'inherit' } // This option is necessary for grunt to display commands output.
			}, done );
		};
	}
};
