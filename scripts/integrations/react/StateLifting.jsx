import React from 'react';
import { useCKEditor, CKEditorEventAction } from 'ckeditor4-react';

const { useEffect, useState, useReducer, useMemo } = React;

const CKEditorComponent = ( { dispatch, state } ) => {
	const [ element, setElement ] = useState();

	const { editor } = useCKEditor( {
		element,
		dispatchEvent: dispatch,
		subscribeTo: [ 'blur', 'focus', 'change' ]
	} );

	/**
	 * Invoking `editor.setData` too often might freeze the browser.
	 */
	const setEditorData = useMemo(
		() => {
			return new CKEDITOR.tools.buffers.throttle(
				500,
				data => {
					if ( editor ) {
						editor.setData( data );
					}
				}
			).input;
		},
		[ editor ]
	);

	/**
	 * Sets editor data if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.currentEditor === 'textarea' ) {
			setEditorData( state.data );
		}
	}, [ setEditorData, state ] );

	return <div ref={setElement} dangerouslySetInnerHTML={{ __html: state.data }} />;
}

const TextAreaEditor = ( { dispatch, state } ) => {
	const [ value, setValue ] = useState( state.data );

	const handleTextAreaChange = evt => {
		const value = evt.currentTarget.value;
		setValue( value );
		dispatch( { type: 'textareaData', payload: value } );
	};

	const handleBlur = () => {
		dispatch( { type: 'textareaBlur' } );
	};

	const handleFocus = () => {
		dispatch( { type: 'textareaFocus' } );
	};

	/**
	 * Sets text area value if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.currentEditor === 'CKEditor' ) {
			setValue( state.data );
		}
	}, [ state ] );

	return (
		<>
			<p>
				<label htmlFor="editor-editor">The editor content:</label>
			</p>
			<p>
				<textarea
					id="editor-editor"
					className="binding-editor"
					value={value}
					onChange={handleTextAreaChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</p>
		</>
	);
}

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'textareaBlur': {
			return {
				...state,
				currentEditor: undefined
			};
		}
		case 'textareaData': {
			return {
				...state,
				currentEditor: 'textarea',
				data: action.payload
			};
		}
		case 'textareaFocus': {
			return {
				...state,
				currentEditor: 'textarea'
			};
		}
		case CKEditorEventAction.blur: {
			return {
				...state,
				currentEditor:
					state.currentEditor !== 'textarea' ?
						undefined :
						state.currentEditor
			};
		}
		case CKEditorEventAction.change: {
			return {
				...state,
				data: action.payload.editor.getData()
			};
		}
		case CKEditorEventAction.focus: {
			return {
				...state,
				currentEditor: 'CKEditor'
			};
		}
		default: {
			return state;
		}
	}
}

const StateLifting = () => {
	const [ state, dispatch ] = useReducer( reducer, {
		data: '<p>This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React.</p>',
		currentEditor: undefined
	} );

	return (
		<div>
			<h2>Lifting state up</h2>
			<p>
				Shared state of React components can be moved <a href="https://reactjs.org/docs/lifting-state-up.html">higher up the React tree</a>. In the example below, CKEditor 4 WYSIWYG editor component shares content with other components.
			</p>
			<p>
				Additionally, <code>useCKEditor</code> hook is used to access <code>editor</code> instance directly and use its methods imperatively, e.g. <code>editor.setData( data )</code>.
			</p>
			<TextAreaEditor dispatch={dispatch} state={state} />
			<div className="editor-instance">
				<CKEditorComponent dispatch={dispatch} state={state} />
			</div>
			<div className="editor-preview">
				<h2>Rendered content</h2>
				<div dangerouslySetInnerHTML={{ __html: state.data }}></div>
			</div>
		</div>
	);
}

export default StateLifting;
