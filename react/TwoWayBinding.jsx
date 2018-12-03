import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import Code from './Code.jsx';

class TwoWayBinding extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			data: '<p>React is really <em>nice</em>!</p>'
		};

		this.handleChange = this.handleChange.bind( this );
		this.onEditorChange = this.onEditorChange.bind( this );
	}

	onEditorChange( evt ) {
		this.setState( {
			data: evt.editor.getData()
		} );
	}

	handleChange( changeEvent ) {
		this.setState( {
			data: changeEvent.target.value
		} );
	}

	render() {
		return (
			<div>
				<h2>Two-way data binding</h2>
				<p>
					Using internal state of React components, it's possible to create simple two-way data binding between editor component and other components, e.g. preview component that renders the content of the editor.
				</p>
				<p>
					<label>Change value:</label>
				</p>
				<p>
					<textarea className="binding-editor" defaultValue={this.state.data} onChange={this.handleChange} />
				</p>
				<div style={{overflow: 'auto'}}>
					<CKEditor
						data={this.state.data}
						config={{
							extraPlugins: 'easyimage',
							removePlugins: 'image',
							cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
							cloudServices_tokenUrl:
								'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
						}}
						onChange={this.onEditorChange}
						style={{
							float: 'left',
							width: '50%'
						}}
					/>
					<EditorPreview data={this.state.data} />
				</div>
					<Code id="4">
						{`
	class TwoWayBinding extends Component {
		constructor( props ) {
			super( props );

			this.state = {
				data: '<p>foo bar</p>'
			};

			this.handleChange = this.handleChange.bind( this );
			this.onEditorChange = this.onEditorChange.bind( this );
		}

		onEditorChange( evt ) {
			this.setState( {
				data: evt.editor.getData()
			} );
		}

		handleChange( changeEvent ) {
			this.setState( {
				data: changeEvent.target.value
			} );
		}

		render() {
			return (
				<div>
					<h2>Two-way data binding</h2>
					<CKEditor
						data={this.state.data}
						onChange={this.onEditorChange} />
						<label style={{ clear: 'both' }}>
							Change val:
							<textarea defaultValue={this.state.data} onChange={this.handleChange} />;
						</label>
						<EditorPreview data={this.state.data} />
				</div>
			);
		}
	}

	class EditorPreview extends Component {
		render() {
			return (
				<div className="editor-preview">
					<h2>Rendered content:</h2>
					<div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
				</div>
			);
		}
	}`}
					</Code>
			</div>
		);
	}
}

class EditorPreview extends Component {
	render() {
		return (
			<div className="editor-preview">
				<h2>Rendered content:</h2>
				<div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
			</div>
		);
	}
}

EditorPreview.defaultProps = {
	data: ''
};

EditorPreview.propTypes = {
	data: PropTypes.string
};

export default TwoWayBinding;
