<template>
	<div>
		<h2>Rendered content</h2>
		<div>{{ editorData }}</div>
	</div>
</template>

<script>
export default {
	name: 'editor-preview',
	props: {
		editorData: ''
	}
}
</script>

<style scoped>
</style>
