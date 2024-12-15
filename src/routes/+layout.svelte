<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import 'svelte-material-ui/bare.css';
	import '@material/elevation/dist/mdc.elevation.css'; 


	let { children } = $props();
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
</style>
