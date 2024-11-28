<script lang="ts">
	import logo from '$lib/images/ptw-logo.png';
</script>

<header>
	<div class="logo">
		<img src={logo} alt="PTW" />
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
</style>
