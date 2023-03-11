<script lang="ts">
	import { graphql } from '$houdini';

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
	// $: console.log(`$updates.data: [${JSON.stringify($updates.data)}]`);
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1>Subscriptions</h1>
	</section>
	<main>
		<p>page stub</p>
	</main>
</div>
