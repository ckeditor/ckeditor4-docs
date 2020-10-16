<template>
	<div>
		<h2>Two-way data binding</h2>
		<p>
			Using the <code>v-model</code> directive, it is possible to create a simple two-way data binding between the CKEditor 4 WYSIWYG editor component and other components, for example the preview component that renders the content of the editor.
		</p>

		<p>
			<label for="editor-editor">The editor content:</label>
		</p>

		<p>
			<textarea id="editor-editor" class="source-editor" v-model.lazy="editorData"></textarea>
		</p>

		<ckeditor
			class="editor-instance"
			:config="editorConfig"
			v-model="editorData"
		></ckeditor>

		<div class="editor-preview">
			<h2>Rendered content</h2>
			<div v-html="editorData"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'editor-data-binding',
	data() {
		return {
			editorData: '<p>This is a CKEditor 4 WYSIWYG editor instance created with Vue.</p>'
		}
	}
}
</script>

<style scoped>
.source-editor {
	width: 100%;
}

.editor-instance {
	margin-bottom: 1.2em;
}

.editor-preview {
	border: 1px solid #d1d1d1;
	padding: 10px;
}

.editor-preview h2 {
	padding-top: 0;
}

@media screen and (max-width: 768px) {
	.editor-preview {
		width: 100%;
	}
}
</style>
