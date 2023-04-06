<script lang="ts">
	import { graphql } from '$houdini';
	import { faker } from '@faker-js/faker';

	const createBook = graphql(`
		mutation CreateBook($input: BookInput!) {
			createBook(input: $input) {
				id
				title
				author
				image
				description
				price
			}
		}
	`);

	const updateBook = graphql(`
		mutation UpdateBook($id: ID!, $input: BookInput!) {
			updateBook(id: $id, input: $input) {
				id
				title
				author
				image
				description
				price
			}
		}
	`);

	const deleteBook = graphql(`
		mutation DeleteBook($id: ID!) {
			deleteBook(id: $id) {
				id
				title
				author
				image
				description
				price
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
			class="btn btn-sm variant-filled-tertiary"
			on:click={() =>
				createBook.mutate({
					input: {
						title: faker.word.adjective(2),
						author: faker.word.adjective(2),
						image: faker.image.abstract(640, 360, true),
						description: faker.lorem.sentence(5),
						price: parseInt(faker.random.numeric(42))
					}
				})}>Create Book</button
		>
		<button
			class="btn btn-sm variant-filled-tertiary"
			on:click={() =>
				updateBook.mutate({
					id: '3',
					input: {
						title: faker.word.adjective(2),
						author: faker.word.adjective(2),
						image: faker.image.abstract(640, 360, true),
						description: faker.lorem.sentence(5),
						price: parseInt(faker.random.numeric(42))
					}
				})}>Update Book</button
		>
		<button
			class="btn btn-sm variant-filled-primary"
			on:click={() =>
				deleteBook.mutate({
					id: '3'
				})}>Delete Book</button
		>
	</main>
</div>