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

	}
	.font-small {
		font-size: 12px;
	}

	.font-medium {
		font-size: 16px;
	}

	.font-large {
		font-size: 20px;
	}
</style>
