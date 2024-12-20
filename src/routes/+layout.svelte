<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import 'svelte-material-ui/bare.css';
	import '@material/elevation/dist/mdc.elevation.css'; 

import { onMount } from 'svelte';
let { children } = $props();
let fontSize = 'medium';  // Standardgröße

onMount(() => {
	const savedFontSize = localStorage.getItem('fontSize');
	if (savedFontSize) {
		fontSize = savedFontSize;  // Lade gespeicherte Größe
	}
});
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		height: 100vh;
		overflow: hidden;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: hidden;

	}
	
</style>
