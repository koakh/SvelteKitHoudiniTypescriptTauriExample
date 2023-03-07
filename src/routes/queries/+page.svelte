<script lang="ts">
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ Books } = data);
	// $: console.log(JSON.stringify($Books.data, undefined, 2));
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="mb-5">Queries</h1>
		<ul>
			{#if $Books?.data?.books}
				{#each $Books.data.books as book}
					{#if book}
						<li>title: {book.title} / author: {book.author}</li>
					{/if}
				{/each}
			{/if}
		</ul>
	</section>
</div>
