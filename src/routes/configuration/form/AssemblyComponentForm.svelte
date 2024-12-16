<script lang="ts">
	import type { AssemblyComponentTreeViewModel } from '$lib/models/assembly-component.model';

	const { assemblyComponent = $bindable(), level, lastChild }: { assemblyComponent: AssemblyComponentTreeViewModel, level: number, lastChild: boolean } = $props();

</script>


<div>Komponente {assemblyComponent.name}</div>