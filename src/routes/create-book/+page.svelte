<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { z } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;

	// sync +page.server.ts and +page.svelte
	const newContactSchema = z.object({
		title: z.string().min(1),
		author: z.string().min(1),
		image: z.string().min(1),
		description: z.string().min(1),
		price: z.number().min(1).max(999)
	});

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: 'Are you sure you want leave?',
		validators: newContactSchema
	});
</script>

<SuperDebug data={$form} />

<article>
	<header>
		<h1>New Contact</h1>
	</header>
	<form method="POST" use:enhance>
		<!-- title -->
		<label for="title">Title</label>
		<input type="text" id="title" name="title" bind:value={$form.title} />
		{#if $errors.title}
			<small>{$errors.title}</small>
		{/if}
		<!-- author -->
		<label for="author">Author</label>
		<input type="text" id="author" name="author" bind:value={$form.author} />
		{#if $errors.author}
			<small>{$errors.author}</small>
		{/if}
		<!-- image -->
		<label for="image">Image</label>
		<input type="text" id="image" name="image" bind:value={$form.image} />
		{#if $errors.image}
			<small>{$errors.image}</small>
		{/if}
		<!-- description -->
		<label for="description">Description</label>
		<input type="text" id="description" name="description" bind:value={$form.description} />
		{#if $errors.description}
			<small>{$errors.description}</small>
		{/if}
		<!-- price -->
		<label for="price">Price</label>
		<input type="number" id="price" name="price" bind:value={$form.price} />
		{#if $errors.price}
			<small>{$errors.price}</small>
		{/if}
		<!-- submit -->
		<button type="submit">Submit</button>
	</form>
</article>
