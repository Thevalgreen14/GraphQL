<script lang="ts">
	import rickmorty from './components/rickmorty.vue';
	import navBar from './components/navBar.vue';

	export default {
		components: {
			rickmorty,
			navBar,
		},
	};
</script>

<template>
	<div id="app">
		<navBar/>
		<rickmorty />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
}

h1 {
	margin-bottom: 20px;
}
</style>
