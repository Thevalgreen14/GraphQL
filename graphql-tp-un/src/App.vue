<script lang="ts">
	import rickmorty from './components/rickmorty.vue';

	export default {
		components: {
			rickmorty,
		},
	};
</script>

<template>
	<div id="app">
		<rickmorty />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

h1 {
	margin-bottom: 20px;
}
</style>
