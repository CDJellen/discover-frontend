<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { tooltip } from './tooltip';
    import logo from '$lib/assets/logo.png'
	import Modal, {getModal} from '$lib/components/Modal.svelte';

    let repoOwner: string = 'Microsoft';
    let repoName: string = 'LightGBM';
    const dispatch = createEventDispatcher();

    function callApi() {
        dispatch('message', {
            owner: repoOwner,
            repo: repoName
        });
    }

</script>

<!-- Navbar -->
<div class="h-14 w-screen fixed z-10 top-0 backdrop-blur text-gray-50 grid grid-cols-3">
    <div class="h-full flex items-center justify-left gap-2 text-xl sm:text-2xl px-6">
        <a href="https://github.com/cdjellen"><img src="{logo}" alt="Logo" class="object-cover w-[48px] h-[48px] rounded-full"></a>
        <a href="https://github.com/cdjellen/discover-open-source" class=""><span class="whitespace-nowrap">Discover New Open-Source Projects</span></a>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"  style="width:24px;height:24px;background-color:rgb(249 250 251);" class="footer-icon" on:click={ () => getModal('info').open() }>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn"  style="width:24px;height:24px;" class="footer-icon" on:click={ () => getModal('accessibility').open() }>
    </div>
    <nav class="text-md sm:text-xl text-gray-50 flex items-center justify-center gap-2">
        <form class="w-full max-w-md">
            <div class="flex items-center border-b border-gray-50 py-2">
                <p class="text-gray-50 text-xs bold">Owner: </p>
                <input bind:value={ repoOwner } class="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Microsoft" aria-label="Repository Owner">
                <p class="text-gray-50 text-xs bold">Repository: </p>
                <input bind:value={ repoName } class="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="LightGBM" aria-label="Repository name">
                <button on:click={() => { callApi() }} class="flex-shrink-0 bg-sky-900 hover:bg-sky-700 border-sky-900 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                    Discover
                </button>
            </div>
          </form>
    </nav>
</div>

<Modal id='info'>
	<h2>Discover new open-source projects using the GitHub contributor network.</h2>
	<br/>
	<p>
		The discover graph queries the GitHub REST API for the top 25 contributors to the specified open-source repository.  Each top contributor's current contributions to the open-source community are captured from their GitHub events.  The discover graph then maps potential projects of interest back to the queried repository through common contriubtors.
	</p>
    <br/>
    <p>
        To learn more about the current projects maintained by shared contributors, simply double-click on the repository node in the discover graph to bring up the project's README.  Some assets may fail to load, so if the project sounds interesting be sure to check it out in GitHub.
    </p>
</Modal>

<Modal id='accessibility'>
	<h1>Keyboard Navigation</h1>
    <table class="table-auto">
        <thead>
          <tr>
            <th>Keyboard Shortcut</th>
            <th>Navigation Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Up arrow</td>
            <td>Navigate discover graph upwards</td>
          </tr>
          <tr>
            <td>Down arrow</td>
            <td>Navigate discover graph downwards</td>
          </tr>
          <tr>
            <td>Left arrow</td>
            <td>Navigate discover graph to the left</td>
          </tr>
          <tr>
            <td>Right arrow</td>
            <td>Navigate discover graph to the right</td>
          </tr>
          <tr>
            <td>Up arrow</td>
            <td>Navigate discover graph upwards</td>
          </tr>
          <tr>
            <td>Page Up, =, [/td>
            <td>Zoom in</td>
          </tr>
          <tr>
            <td>Page Down, -, ]/td>
            <td>Zoom in</td>
          </tr>
        </tbody>
      </table>
</Modal>
