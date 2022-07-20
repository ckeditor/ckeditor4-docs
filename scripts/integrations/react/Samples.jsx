import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, NavLink, Routes, Route } from 'react-router-dom';

import Nav from './Nav.jsx';
import EditorTypes from './EditorTypes.jsx';
import ConfigEvents from './ConfigEvents.jsx';
import StateLifting from './StateLifting.jsx';

const Samples = () => {
	return (
		<HashRouter>
			<Nav label="React integration samples">
				<NavLink
					to="/"
					className={( { isActive } ) =>
						isActive ? 'active' : undefined
					}
				>
					Editor Types
				</NavLink>
				<NavLink
					to="/configuration"
					className={( { isActive } ) =>
						isActive ? 'active' : undefined
					}
				>
					Configuration
				</NavLink>
				<NavLink
					to="/state-lifting"
					className={( { isActive } ) =>
						isActive ? 'active' : undefined
					}
				>
					Lifting State Up
				</NavLink>
			</Nav>
			<Routes>
				<Route path="/" element={<EditorTypes />} />
				<Route path="/configuration" element={<ConfigEvents />} />
				<Route path="/state-lifting" element={<StateLifting />} />
			</Routes>
		</HashRouter>
	);
};

const element = document.getElementById( 'app' );

createRoot( element ).render(
	<React.StrictMode>
		<Samples />
	</React.StrictMode>
);
