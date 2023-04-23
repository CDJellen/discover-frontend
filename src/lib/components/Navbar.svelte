<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte';
    import logo from '$lib/assets/logo.png'
	import { perPage, numContributions, showHelp, showNavigation, showOptions } from '$lib/utility/store';

    let repoOwner = getContext("repo");
    let repoName = getContext("owner");

    const dispatch = createEventDispatcher();

    function callApi() {
        dispatch('init', {
            init: true,
            owner: repoOwner,
            repo: repoName,
            perPage: $perPage,
            numContributions: $numContributions,
        });
    }
</script>

<!-- Navbar -->
<div class="h-14 w-screen fixed z-10 top-0 backdrop-blur text-gray-50 grid grid-cols-3">
    <div class="h-full flex items-center justify-left gap-2 text-xl sm:text-2xl px-6">
        <a href="https://github.com/cdjellen"><img src="{logo}" alt="Logo" class="object-cover w-[48px] h-[48px] rounded-full"></a>
        <a href="https://github.com/cdjellen/discover" class=""><span class="whitespace-nowrap">Explore GitHub</span></a>
        <a href="https://github.com/cdjellen"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"  style="width:24px;height:24px;background-color:rgb(249 250 251);" class="footer-icon"></a>
        <a href="https://linkedin.com/in/cdjellen"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn"  style="width:24px;height:24px;" class="footer-icon"></a>
    </div>
    <nav class="h-full flex items-center justify-center gap-2 px-6 text-md sm:text-xl text-gray-50">
        <form class="w-full">
            <div class="flex items-center border-b border-gray-50 py-2">
                <p class="text-gray-50 text-lg bold">Owner: </p>
                <input bind:value={ repoOwner } class="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="PyTorch" aria-label="Repository Owner">
                <p class="text-gray-50 text-lg bold">Repository: </p>
                <input bind:value={ repoName } class="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="PyTorch" aria-label="Repository name">
                <button on:click={() => { callApi() }} class="flex-shrink-0 bg-sky-900 hover:bg-sky-700 border-sky-900 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                    Explore
                </button>
            </div>
          </form>
    </nav>
    <div class="h-full flex items-center justify-center gap-2 px-6">
      <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={ () => { $showOptions ? showOptions.set(false) : showOptions.set(true) } }>Options</button>
      <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={ () => { $showHelp ? showHelp.set(false) : showHelp.set(true) } }>Help</button>
      <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={ () => { $showNavigation ? showNavigation.set(false) : showNavigation.set(true) } }>Navigation</button>
    </div>
</div>
