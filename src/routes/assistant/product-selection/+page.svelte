<script lang="ts">
	import { page } from '$app/stores';

	// Query-Parameter abrufen
	const id = $page.url.searchParams.get('id'); // Produkt-ID aus der URL
	const name = $page.url.searchParams.get('name'); // Produktname aus der URL
</script>

<h1>Befundung von ID {id}, {name}</h1>

