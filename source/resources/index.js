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
} );
