Ext.onReady( function() {

	// Open external links in new window.
	Ext.getBody().on( 'click', function( evt, target ) {
		target = Ext.get( target );
		if ( !target.is( 'a' ) )
			return;

		var href = target.getAttribute( 'href' );
		if ( href && !/^#/.exec( href ) && window.open( href, '_blank' ) )
				evt.preventDefault();

	} );

	// Various position fixes.
	setTimeout( function() {
		var north = Ext.getCmp( 'north-region' ),
			search = Ext.getCmp( 'search-container' );

		north.setHeight( 100 );
		var header = north.child( 'container' );
		header.setHeight( 73 );
		search.getEl().setTop( 30 );

		// Layout fix on resize.
		header.on( 'resize', function() {
			search.getEl().setTop( 30 );
		} );
	} );
} );
