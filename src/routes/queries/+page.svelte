<script lang="ts">
	import type { PageData } from './$houdini';
	import { cache, graphql } from '$houdini';

	export let data: PageData;

	$: ({ Books } = data);
	// $: console.log(JSON.stringify($Books.data, undefined, 2));
	const allBooks = cache.read({
		query: graphql(`
			query AllBooksCache {
				books {
					title
					author
				}
			}
		`)
	});

	console.log(`allBooks: [${JSON.stringify(allBooks, undefined, 2)}]`);
	// const allBooks = cache.list('All_Books')
	// const userFriends = cache.list('User_Friends', { parentID: '1' })
	// const allFriends = cache.list('User_Friends', { allLists: true })
	// $: console.log(allBooks);
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="mb-5">Queries</h1>
	</section>
	<main>
		<ul>
			{#if $Books?.data?.books}
				{#each $Books.data.books as book}
					{#if book}
						<li>title: {book.title} / author: {book.author}</li>
					{/if}
				{/each}
			{/if}
		</ul>
	</main>
</div>
