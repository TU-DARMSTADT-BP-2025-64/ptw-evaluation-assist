<script lang="ts">
	import logo from '$lib/images/ptw-logo.png';
	import IconButton from '@smui/icon-button'
</script>

<header>
	<div class="logo">
		<img src={logo} alt="PTW" />
	</div>

	<div class="triangle"></div>
	<div class="toolbar">
		<div class="title">Startseite</div>
		<div class="actions">
			<IconButton class="material-icons">dark_mode</IconButton>
			<IconButton class="material-icons">language</IconButton>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		height: 80px;
		align-items: center;
	}

	.logo {
		height: 64px;
		margin-left: 1rem;
	}
	.logo img {
		height: 100%;
	}

	.triangle {
		margin-left: -16px;
		width: 0;
		height: 0;
		border-left: 24px solid transparent;
		border-right: 0px solid #b81018;
		border-bottom: 80px solid #b81018;
	}

	.toolbar {
		height: 80px;
		width: 100%;
		background-color: #b81018;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 32px;
	}

	.toolbar .actions {
		color: white;
		display: flex;
		gap: 24px;
	}

	.toolbar .title {
		padding-left: 8px;
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
