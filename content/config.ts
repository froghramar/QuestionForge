import { defineCollection, z } from 'astro:content';

const questions = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		difficulty: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']),
		category: z.string(),
		tags: z.array(z.string()),
		companies: z.array(z.string()),
		estimated_time: z.number(),
		updated: z.date().or(z.string().transform((str) => new Date(str))),
	}),
});

export const collections = {
	questions,
};
