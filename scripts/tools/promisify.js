module.exports = ( fn, context ) => {
	return ( ...params ) => {
		return new Promise( ( resolve, reject ) => {
			fn.call( context, ...params, ( err, data ) => {
				if ( err ) {
					reject( err );
				} else {
					resolve( data );
				}
			} );
		} );
	};
};
