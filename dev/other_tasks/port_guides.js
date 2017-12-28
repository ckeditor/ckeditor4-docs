const portGuides = require( './guides/port' );
const path = require( 'path' );

portGuides( {
	srcDir: 'guides',
	dstDir: path.resolve( 'tmp/guide' ),
	assetsDir: path.resolve( 'tmp/assets' ),
	guidesConfig: require( '../../guides/guides.json' )
} );
