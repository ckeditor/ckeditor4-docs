/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

const { AngularCompilerPlugin } = require( '@ngtools/webpack' );
const { resolve } = require( 'path' );
const { SuppressExtractedTextChunksWebpackPlugin } = require( '@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin' );
const { ContextReplacementPlugin } = require( 'webpack' );
const path = require( 'path' );
const ProgressPlugin = require( 'webpack/lib/ProgressPlugin' );
const rxPaths = require( 'rxjs/_esm5/path-mapping' );
const TerserPlugin = require( 'terser-webpack-plugin' );


module.exports = {
	devtool: 'source-map',

	entry: {
		main: './angular/src/main.ts',
		polyfills: './angular/src/polyfills.ts',
		styles: './angular/src/styles.css'
	},

	mode: 'production',

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: '@ngtools/webpack'
			},

			{
				test: /\.html$/,
				use: 'raw-loader'
			},
			{
				test: /\.css$/,
				use: [ 'to-string-loader', 'css-loader' ],
				exclude: [ resolve( './angular/src/styles.css' ) ]
			},

			// This hides some Webpack warnings.
			{
				test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
				parser: { system: true },
			}
		]
	},

	node: false,

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						comments: /^!/
					}
				}
			} ),
		]
	},

	output: {
		path: path.join( __dirname, '..', 'docs', 'sdk', 'examples', 'assets', 'angular' ),
		filename: '[name].js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	performance: {
		hints: false,
	},

	plugins: [
		new AngularCompilerPlugin( {
			mainPath: resolve( './angular/src/main.ts' ),
			sourceMap: true,
			nameLazyFiles: false,
			tsConfigPath: resolve( './angular/src/tsconfig.app.json' ),
			skipCodeGeneration: false,
			hostReplacementPaths: {
				[ resolve( 'src/environments/environment.ts' ) ]: resolve( 'src/environments/environment.prod.ts' )
			}
		} ),

		new SuppressExtractedTextChunksWebpackPlugin(),

		new ProgressPlugin(),

		// Prevents webpack error.
		new ContextReplacementPlugin( /\@angular(\\|\/)core(\\|\/)fesm5/, path.join( __dirname, './angular/src/' ) ),
	],

	resolve: {
		extensions: [ '.ts', '.js' ],
		alias: rxPaths()
	}
};
