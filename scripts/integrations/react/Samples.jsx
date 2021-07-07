import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';

import Nav from './Nav.jsx';
import EditorTypes from './EditorTypes.jsx';
import ConfigEvents from './ConfigEvents.jsx';
import StateLifting from './StateLifting.jsx';

const Samples = () => {
	return (
		<HashRouter>
			<Nav label="React integration samples">
				<NavLink exact={true} to="/" activeClassName="active">Editor Types</NavLink>
				<NavLink to="/configuration" activeClassName="active">Configuration</NavLink>
				<NavLink to="/state-lifting" activeClassName="active">Lifting State Up</NavLink>
			</Nav>
			<Switch>
				<Route exact path="/" component={EditorTypes} />
				<Route path="/configuration" component={ConfigEvents} />
				<Route path="/state-lifting" component={StateLifting} />
			</Switch>
		</HashRouter>
	);
}

ReactDOM.render(
	<Samples />,
	window.document.getElementById( 'app' )
);
