import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import Code from './Code.jsx';

class ConfigEvents extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			events: []
		};

		this.logEvent = this.logEvent.bind( this );
		this.clearEvents = this.clearEvents.bind( this );
	}

	logEvent( event ) {
		this.setState( {
			events: [ ...this.state.events, event ]
		} );
	}

	clearEvents() {
		this.setState( {
			events: []
		} );
	}

	render() {
		return (
			<div>
				<h2>Editor with custom event handlers and config</h2>
				<p>
					Editors created by React component are highly customisable. It is possible to overwrite every configuration variable using <code>config</code> prop and passing object containing configuration to it.
				</p>
				<p>
					Additionally editor component allows to bind any event handler using props with names starting with <code>on</code>, followed by the name of the event with capitalized first letter. Following example shows how to bind several common CKEditor's events.
				</p>
				<CKEditor
					data="I'm CKEditor 4 instance."
					config={{
						toolbar: [
							[ 'Bold', 'Italic' ],
							[ 'Cut', 'Copy' ],
							[ 'EasyImageUpload' ],
							[ 'About' ]
						],
						extraPlugins: 'easyimage',
						removePlugins: 'image',
						cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
						cloudServices_tokenUrl:
							'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
					}}

					onFocus={this.logEvent}
					onBlur={this.logEvent}
					onChange={this.logEvent}
					onSelectionChange={this.logEvent} />
					<h3>Events Log</h3>
					<p><small>To check additional details about every event, please consult console in browser's devtools.</small></p>
					<EventLog stream={this.state.events} />
					<button onClick={this.clearEvents}>Clear events log</button>
					<Code id="3">
						{`	<CKEditor
		data="I'm CKEditor 4 instance."
		config={{
			toolbar: [
				[ 'Bold', 'Italic' ],
				[ 'Cut', 'Copy' ],
				[ 'About' ]
			]
		}}
		onFocus={customHandler}
		onBlur={customHandler}
		onChage={customHandler}
		onSelectionChange={customHandler}
	/>`}
					</Code>
			</div>
		);
	}
}

const EventLog = ( { stream } ) => {
	return (
		<div className="event-log">
			<ul className="event-log__events">
				{
					stream.map( event => {
						return (
							<li className="event-log__event">
								<Event data={event} />
							</li>
						)
					} )
				}
			</ul>
		</div>
	);
}

const Event = ( { data: { name, data } } ) => {
	console.log( name, data );

	return (
		<>
			{name}
		</>
	);
}

EventLog.defaultProps = {
	stream: []
};

EventLog.propTypes = {
	stream: PropTypes.array
};

export default ConfigEvents;
