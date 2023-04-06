import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'

// sync +page.server.ts and +page.svelte
const newContactSchema = z.object({
	title: z.string().min(1),
	author: z.string().min(1),
	image: z.string().min(1),
	description: z.string().min(1),
	price: z.number().min(1).max(999),
})

export const load = async (event) => {
	const form = await superValidate(event, newContactSchema)
	return {
		form
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, newContactSchema)
		console.log(form)

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		return { form }
	}
}
