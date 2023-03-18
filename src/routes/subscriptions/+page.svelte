<script lang="ts">
	import { graphql, cache } from '$houdini';

	// will start listening onMount (browser only)
	const updates = graphql(`
		subscription NewBooks {
			newBooks {
				title
				author
			}
		}
	`);

	$: updates.listen();
	$: console.log(`$updates.data: [${JSON.stringify($updates.data)}]`);
	// mutate cache with received update, this will replace whole cache
	// $: {
	// 	cache.write({
	// 		query: graphql(`
	// 			query AllBooksUpdate {
	// 				books {
	// 					title
	// 					author
	// 				}
	// 			}
	// 		`),
	// 		data: {
	// 			books: [
	// 				{
	// 					title: $updates?.data?.newBooks?.title || '',
	// 					author: $updates?.data?.newBooks?.author || ''
	// 				}
	// 			]
	// 		}
	// 	});
	// }
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1>Subscriptions</h1>
	</section>
	<main>
		<ul class="li">Last created book</ul>
		<ul class="li">title: {$updates?.data?.newBooks.title || 'none'}</ul>
		<ul class="li">author: {$updates?.data?.newBooks.author || 'none'}</ul>
	</main>
</div>
