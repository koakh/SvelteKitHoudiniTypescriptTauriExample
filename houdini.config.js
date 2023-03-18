/// <references types="houdini-svelte">

/// docs https://houdinigraphql.com/api/config

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'http://localhost:5001/graphql'
	},
	plugins: {
		'houdini-svelte': {}
	},
	defaultCachePolicy: 'NetworkOnly',
};

export default config;
