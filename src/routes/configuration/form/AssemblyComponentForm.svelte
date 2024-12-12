<script lang="ts">
	import type { AssemblyComponentTreeViewModel } from '$lib/models/assembly-component.model';

	const { assemblyComponent = $bindable(), level }: { assemblyComponent: AssemblyComponentTreeViewModel, level: number } = $props();

</script>

<div>Komponente {assemblyComponent.name}</div>
