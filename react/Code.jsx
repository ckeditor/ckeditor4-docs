import React from 'react';

const Code = ( { children, id } ) => {
	return (
		<script data-sample={id}>
			{children}
		</script>
	);
}

export default Code;
