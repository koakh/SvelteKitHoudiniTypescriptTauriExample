<script lang="ts">
	import { graphql } from '$houdini';
	import { faker } from '@faker-js/faker';

	const createBook = graphql(`
		mutation CreateBook($title: String!, $author: String!) {
			createBook(title: $title, author: $author) {
				title
				author
			}
		}
	`);
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1>Mutations</h1>
	</section>
	<main>
		<button
			class="btn btn-sm variant-filled-primary"
			on:click={() =>
				createBook.mutate({
					title: faker.word.adjective(2),
					author: faker.word.adjective(2)
				})}>Create Book</button
		>
	</main>
</div>
