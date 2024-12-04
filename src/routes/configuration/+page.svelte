<script lang="ts">
    import { HeaderService } from '../HeaderService.svelte';
    import Ripple from '@smui/ripple';

    HeaderService.Instance.setTitle('Konfiguration');
</script>

<svelte:head>
    <title>Konfiguration</title>
    <meta name="description" content="PTW evaluation assist" />
</svelte:head>

<section>
    <a href="/configuration/form">
    <div
      class="card-btn mdc-elevation--z2"
      use:Ripple={{ surface: true }}
      onkeydown={() => {}}
      role="button"
      tabindex="0"
    >
        <div class="icon">
            <i class="material-icons">add</i>
        </div>
    </div>
    </a>
</section>

<style>
    .card-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        margin-right: 1300px;
        position: relative; /* Necessary for absolute positioning of label */
        width: 48px; /* Adjust width to fit the button */
        height: 48px; /* Adjust height to fit the button */
    }

    .card-btn .icon i {
        font-size: 60px;
        height: 60px;
        width: 60px;
        color: #b81018;
    }
</style>