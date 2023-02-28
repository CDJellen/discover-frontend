<script lang="ts">
  import { showHelp } from '$lib/utility/store';
</script>

<!-- HELP -->
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <!-- CONTENT -->
              <h2 class="text-lg font-bold leading-6 text-gray-900" id="modal-title">Explore GitHub</h2>
              <div class="mt-2">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-overview">Overview</h3>
                  <div class="text-sm text-gray-900 whitespace-pre-line">Discover new open-source projects using the GitHub contribution graph.

                    GitHub repositories are collaborative efforts, often built by many users.  The open-source ecosystem which GitHub supports empowers users around the world to contribute fixes and features to many repositories.  Users often contribute to a number of distinct repositories with a similar focus.
                    
                    Discovery in GitHub often takes the form of tag-based search.  These tags are helpful, provided you know what tag to search a-priori.  This tool provides an alternative mechanism for discovery based on your interest in some "seed" repository.  This repository can be anything, but the tool is most effective when it is built collaboratively by many users.  Explore GitHub enables visual discovery of new, interesting repositories which share contributors with that seed repository.
                
                  </div>
                <br>
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-getting-started">Getting Started</h3>
                  <div class="text-sm text-gray-700 whitespace-pre-line">To get started, simply set a seed repository "Owner" and "Repository" name (the defaults are "PyTorch" and "PyTorch" to reflect github.com/pytorch/pytorch).

                    By default, the top 10 contributors for the seed repository are queried using the GitHub REST API.  For each contributor, their most recent (default 5) contributions are queried using the GitHub GraphQL API.
                
                  </div>
                <br>
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-core-features">Core Features</h3>
                  <div class="text-sm text-gray-700 whitespace-pre-line">You can learn more about each repository node in the Explore graph by double clicking to bring up its README file, if available.

                    You can continue exploring by Shift-clicking on a repository node to repeat the exploration process, gathering the top contributors and their contributions, and adding them toi the graph.
              
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={ () => { $showHelp ? showHelp.set(false) : showHelp.set(true) } }>Sounds Good!</button>
        </div>
      </div>
    </div>
  </div>
</div>
