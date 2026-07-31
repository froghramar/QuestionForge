import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const questions = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/questions" }),
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
