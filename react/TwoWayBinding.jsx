import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

class TwoWayBinding extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			data: '<p>This is CKEditor 4 instance created by ️⚛️ React.</p>'
		};

		this.onTextareaChange = this.onTextareaChange.bind( this );
		this.onEditorChange = this.onEditorChange.bind( this );
	}

	onEditorChange( { editor } ) {
		this.updateEditor( editor.getData() );
	}

	onTextareaChange( { target: { value } } ) {
		if ( !CKEDITOR.env.ie ) {
			return this.updateEditor( value );
		}

		if ( !this._throttle ) {
			this._throttle = new CKEDITOR.tools.buffers.throttle( 500, this.updateEditor, this );
		}

		this._throttle.input( value );
	}

	updateEditor( data ) {
		this.setState( {
			data
		} );
	}

	render() {
		return (
			<div>
				<h2>Two-way data binding</h2>
				<p>
					Using internal state of React components, it's possible to create simple two-way data binding between editor component and other components, e.g. preview component that renders the content of the editor.
				</p>

				<EditorEditor data={this.state.data} handler={this.onTextareaChange} />

				<div style={{overflow: 'auto'}}>
					<CKEditor
						data={this.state.data}

						config={{
							toolbar: [
								[ 'Source' ],
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
						onChange={this.onEditorChange}
						style={{
							float: 'left',
							width: '50%'
						}}
					/>
					<EditorPreview data={this.state.data} />
				</div>
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

class EditorEditor extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			focused: false
		};
	}

	render() {
		var textareaValue = {};

		if ( !this.state.focused ) {
			textareaValue = {
				value: this.props.data
			};
		}

		return (
			<>
				<p>
					<label for="editor-editor">Change value:</label>
				</p>
				<p>
					<textarea
						id="editor-editor"
						className="binding-editor"
						{...textareaValue}
						onChange={this.props.handler}
						onFocus={ () => { this.setState( {
								focused: true
							} );
						}}
						onBlur={ () => { this.setState( {
								focused: false
							} );
						}}
					/>
				</p>
			</>
		);
	}
}

EditorEditor.defaultProps = {
	data: '',
	handler: () => {}
};

EditorEditor.propTypes = {
	data: PropTypes.string,
	handler: PropTypes.function
};

export default TwoWayBinding;
