<script lang="ts">
	import Ripple from '@smui/ripple';
</script>

<svelte:head>
	<title>Homepage</title>
	<meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section>
	<div class="card-btn mdc-elevation--z2"  use:Ripple={{ surface: true }}>
		<div class="icon">
			<i class="material-icons">manage_search</i>
		</div>
		<div class="label">
			Neuen Befund starten
		</div>
	</div>

	<div class="card-btn mdc-elevation--z2"  use:Ripple={{ surface: true }}>
		<div class="icon">
			<i class="material-icons">settings</i>
		</div>
		<div class="label">
			Konfiguration
		</div>
	</div>
</section>

<style>

	section {
		padding-top: 24px;
	}

	.card-btn {
		display: flex;
		border-radius: 8px;
		background: white;
		padding: 12px;
		align-items: center;
		cursor: pointer;
		margin: 32px 0;
	}

	.card-btn .icon i {
		font-size: 60px;
		height: 60px;
		width: 60px;
		color: #b81018;
	}

	.card-btn .label {
		font-size: 28px;
		margin-left: 28px;
		
	}
</style>
