<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
	import { IconHeart } from '@tabler/icons-svelte';
</script>

<div class="container mx-auto p-8 space-y-8">
	<h1>Hello Skeleton</h1>
	<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae soluta maxime enim facilis id dolore nobis laborum asperiores qui tenetur deleniti vitae consectetur dignissimos quibusdam, at amet. Earum, vitae delectus!</p>
	<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, cumque consequatur. Debitis at maiores velit repellat! Odit aliquid alias voluptatum delectus? Voluptate inventore laudantium ab commodi alias quos ipsam adipisci.</p>
	<section>
		<a class="btn variant-filled-primary" href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">SvelteKit</a>
		<a class="btn variant-filled-secondary" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a>
		<a class="btn variant-filled-tertiary" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
	</section>
  <Avatar src="https://i.pravatar.cc/150?img=28" />
  <IconHeart size={48} stroke={1} />
</div>