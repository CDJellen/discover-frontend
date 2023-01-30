<script context="module" lang="ts">
	const modals: object = {}; // store modals
	
	export function getModal(id=''){
		return modals[id];
	}

</script>

<script lang="ts">
    import { onMount } from 'svelte'

    let modalDiv: any;
    let visible: boolean;
    let closeCallback: any;

    export let id=''

    function keyPress(event: any) {
        if (event.key=='Escape') {
            close(null);
        }
    }

    function open(callback: any) {
        closeCallback = callback;
        if (visible) {
            return;
        }
        visible = true;
        window.addEventListener("keydown", keyPress);
        
        // prevent scrolling of the main window
        document.body.style.overflow = "hidden";

        visible = true;
        document.body.appendChild(modalDiv);
    }

    function close(closeVal: any) {
        if (!visible) {
            return;
        }
        window.removeEventListener("keydown", keyPress);
        document.body.style.overflow = "";
        visible = false;
        if (closeCallback) {
            closeCallback(closeVal);
        }
    }

    //expose the API
    modals[id] = {open, close};

    onMount( () => {
        delete modals[id];
        window.removeEventListener("keydown", keyPress);
    });

</script>

<div id="topModal" class:visible bind:this = { modalDiv } on:click={ () => close(null) }>
	<div id='modal' on:click|stopPropagation = { () => {} }>
        <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
		<div id='modal-content'>
			<slot></slot>
		</div>
	</div>
</div>

<style>
	#topModal {
		background: #4448;
		align-items: center;
        display: flex;
		justify-content: center;
		visibility: hidden;
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	#modal {
		position: relative;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.795);
        border: 2px solid #000;
		filter: drop-shadow(5px 5px 5px #555);
		padding: 1em;
	}

	.visible {
		visibility: visible !important;
	}

	#modal-content {
		max-width: calc(100vw - 20px);
		max-height: calc(100vh - 20px);
		overflow: auto;
	}

</style>
