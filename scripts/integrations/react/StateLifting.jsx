import React from 'react';
import { useCKEditor, CKEditorEventAction } from 'ckeditor4-react';

const { useEffect, useState, useReducer, useMemo } = React;

const Editor = ( { dispatch, state } ) => {
	const [ element, setElement ] = useState();

	const { editor } = useCKEditor( {
		element,
		dispatchEvent: dispatch,
		subscribeTo: [ 'focus', 'change' ]
	} );

	/**
	 * Invoking `editor.setData` too often might freeze the browser.
	 */
	const setEditorData = useMemo( () => {
		if ( editor ) {
			/* eslint-disable-next-line */
			return new CKEDITOR.tools.buffers.throttle( 500, data => {
				if ( editor ) {
					editor.setData( data );
				}
			} ).input;
		}
	}, [ editor ] );

	/**
	 * Sets editor data if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.currentEditor !== 'CKEditor' && setEditorData ) {
			setEditorData( state.data );
		}
	}, [ setEditorData, state ] );

	return <div ref={setElement} dangerouslySetInnerHTML={{ __html: state.data }} />;
}

const TextAreaEditor = ( { dispatch, state } ) => {
	const handleTextAreaChange = evt => {
		const value = evt.currentTarget.value;
		dispatch( { type: 'textareaData', payload: value } );
	};

	const handleFocus = () => {
		dispatch( { type: 'textareaFocus' } );
	};

	return (
		<>
			<p>
				<label htmlFor="editor-editor">The editor content:</label>
			</p>
			<p>
				<textarea
					id="editor-editor"
					className="binding-editor"
					value={state.data}
					onChange={handleTextAreaChange}
					onFocus={handleFocus}
				/>
			</p>
		</>
	);
}

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'textareaData': {
			return {
				...state,
				data: action.payload
			};
		}
		case 'textareaFocus': {
			return {
				...state,
				currentEditor: 'textarea'
			};
		}
		case CKEditorEventAction.change: {
			return {
				...state,
				data:
					state.currentEditor === 'CKEditor' ?
						action.payload.editor.getData() :
						state.data
			};
		}
		case CKEditorEventAction.focus: {
			return {
				...state,
				currentEditor: 'CKEditor'
			};
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
				<Editor dispatch={dispatch} state={state} />
			</div>
			<div className="editor-preview">
				<h2>Rendered content</h2>
				<div dangerouslySetInnerHTML={{ __html: state.data }}></div>
			</div>
		</div>
	);
}

export default StateLifting;
