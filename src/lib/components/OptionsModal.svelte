<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { showOptions, perPage, numContributions, isInit } from '$lib/utility/store';
  
  
const dispatch = createEventDispatcher();

function callApi() {
    dispatch('init', {
        init: $isInit,
        perPage: $perPage,
        numContributions: $numContributions,
    });
}
</script>

<!-- OPTIONS -->
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <!-- CONTENT -->
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">GitHub Query Parameters</h3>
              <br>
              <nav class="text-md sm:text-xl text-gray-50 flex items-center justify-center gap-2">
                <form class="w-full">
                  <div class="flex items-center border-b border-gray-50 py-2">
                    <p class="text-sky-700 text-sm bold">Top Contributors: </p>
                    <input bind:value={ $perPage } class="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="10" aria-label="Number of Contributors">  
                    <p class="text-sky-700 text-sm bold">Number of Contributions: </p>
                    <input bind:value={ $numContributions } class="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="5" aria-label="Number of Contributions">
                  </div>
                </form>
              </nav>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={ () => { $showOptions ? showOptions.set(false) : showOptions.set(true); callApi(); } }>Sounds Good!</button>
        </div>
      </div>
    </div>
  </div>
</div>
