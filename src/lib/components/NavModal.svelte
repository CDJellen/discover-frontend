<script lang="ts">
    import { showNavigation } from '$lib/utility/store';
</script>

<!-- NAVIGATION -->
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <!-- CONTENT -->
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Navigating the Graph</h3>
                <div class="mt-2">
                  <h5 class="text-base font-semibold leading-6 text-gray-900" id="modal-overview">Using your mouse</h5>
                    <p class="text-sm text-gray-700">You can zoom in or out using the scroll wheel on your mouse, if available.  You can move around the graph by clicking on the background (not on any node or edge) and dragging your mouse.</p>
                  <br>
                    <h5 class="text-base font-semibold leading-6 text-gray-900" id="modal-getting-started">Using your keyboard</h5>
                  <table class="auto border-separate border-spacing-2 border border-sky-900 ">
                    <thead>
                      <tr>
                        <th class="border border-sky-900 py-1 px-4">Keyboard Shortcut</th>
                        <th class="border border-sky-900 py-1 px-4">Navigation Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Up arrow</td>
                        <td class="border border-sky-700 py-1 px-4">Navigate discover graph upwards</td>
                      </tr>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Down arrow</td>
                        <td class="border border-sky-700 py-1 px-4">Navigate discover graph downwards</td>
                      </tr>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Left arrow</td>
                        <td class="border border-sky-700 py-1 px-4">Navigate discover graph to the left</td>
                      </tr>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Right arrow</td>
                        <td class="border border-sky-700 py-1 px-4">Navigate discover graph to the right</td>
                      </tr>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Up arrow</td>
                        <td class="border border-sky-700 py-1 px-4">Navigate discover graph upwards</td>
                      </tr>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Page Up, =, [</td>
                        <td class="border border-sky-700 py-1 px-4">Zoom in</td>
                      </tr>
                      <tr>
                        <td class="border border-sky-700 py-1 px-4">Page Down, -, ]</td>
                        <td class="border border-sky-700 py-1 px-4">Zoom in</td>
                      </tr>
                    </tbody>
                  </table>
                 </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={ () => { $showNavigation ? showNavigation.set(false) : showNavigation.set(true) } }>Sounds Good!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
