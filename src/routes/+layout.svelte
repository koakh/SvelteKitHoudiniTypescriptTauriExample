<script>
	// skeleton: Make sure each of these stylesheets are present and in the order shown.
	// your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// this contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';
	// skeleton imports
	import { AppShell, AppBar, LightSwitch, autoModeWatcher, setModeCurrent } from '@skeletonlabs/skeleton';

	// force darkMode, until we find how to use autoModeWatcher with SSR disabled
	setModeCurrent(false);
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-filled-primary"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-filled-secondary"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-filled-tertiary"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/queries">Queries</a></li>
				<li><a href="/mutations">Mutations</a></li>
				<li><a href="/subscriptions">Subscriptions</a></li>
				<li><a href="/create-book">Create Book</a></li>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
