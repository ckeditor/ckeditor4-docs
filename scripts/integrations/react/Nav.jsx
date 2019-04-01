import React from 'react';

const Nav = ( { label, children } ) => {
	return (
		<nav className="react-nav" aria-label={label}>
			<ul className="react-nav__menu">
				{
					React.Children.map( children, ( child ) => {
						return <li class="react-nav__menu-item">{child}</li>;
					} )
				}
			</ul>
		</nav>
	);
}

export default Nav;
