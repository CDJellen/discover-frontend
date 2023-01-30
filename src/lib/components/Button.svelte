<script lang="ts">
	export let icon: string;
	export let link: string;
	export let text: string;
</script>

<a
	class="bg-slate-100 hover:bg-slate-200 text-gray-800 inline-flex py-2 px-4 border border-gray-400 rounded shadow"
	href={link}
	role="button"
>
	{#if icon}
		<img src={icon} class="h-8 px-1" alt="Logo" />
	{/if}
	<h3 class="text-left text-gray-50 text-md font-bold text-button-sm" >{text}</h3>
</a>
