import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

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
		event.timestamp = new Intl.DateTimeFormat( 'en', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		} ).format( new Date() );

		console.log( event.timestamp, event.name, event.data || 'No additional data was provided' );

		this.setState( {
			events: [ event, ...this.state.events ]
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
				<h2>WYSIWYG editor with custom event handlers and configuration</h2>
				<p>
					Editors created with the CKEditior 4 React component are highly customizable. It is possible to overwrite every configuration setting using the <code>config</code> property and passing an object containing the configuration to it.
				</p>
				<p>
					Additionally, the CKEditor 4 WYSIWYG editor component for React allows you to bind any event handler using properties with names starting with <code>on</code>, followed by the name of the event with the first letter capitalized. The following example shows how to bind several common CKEditor 4 events and apply custom toolbar configuration.
				</p>
				<CKEditor
					data="This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React."
					config={{
						toolbar: [
							[ 'Source' ],
							[ 'Styles', 'Format', 'Font', 'FontSize' ],
							[ 'Bold', 'Italic' ],
							[ 'Undo', 'Redo' ],
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
					<small>To check additional details about every event, consult the console in the browser developer tools.</small>
					<EventLog stream={this.state.events} />
					<button onClick={this.clearEvents}>Clear events log</button>
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

const Event = ( { data: { name, timestamp } } ) => {
	return (
		<>
			{timestamp} – {name}
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
