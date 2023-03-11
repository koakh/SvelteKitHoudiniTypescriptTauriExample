<script lang="ts">
	import { graphql } from '$houdini';

	// will start listening onMount (browser only)
	const updates = graphql(`
		subscription NewBooks{
				newBooks{
				title
				author
			}
		}
	`);

	$: updates.listen();
	$: console.log(`$updates.data: [${JSON.stringify($updates.data)}]`);
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
