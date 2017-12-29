const portGuides = require( './guides/port' );
const path = require( 'path' );

portGuides( {
	srcDir: 'guides',
	dstDir: path.resolve( 'docs/guide' ),
	assetsDir: path.resolve( 'docs/assets' ),
	guidesConfig: require( '../../guides/guides.json' )
} );
