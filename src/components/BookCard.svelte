<script lang='ts'>
	import type { Book } from "$lib/types";

  export let book: Book;
</script>

<div class="card">
	<header class="card-header">{book.title}</header>
	<section class="p-4">
    <p>{book.description}</p>
    <p>author: {book.author}</p>
  </section>
	<footer class="card-footer">(footer)</footer>
</div>