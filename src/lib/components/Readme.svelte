<script lang="ts">
    import { readMeContent } from "$lib/utility/store";

</script>

<!-- README -->
<div class="fixed top-16 bottom-[5vh] right-0 w-1/3 overflow-auto">
    <article class="markdown-body">
        { @html $readMeContent }
    </article>
</div>
