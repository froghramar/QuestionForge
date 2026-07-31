import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		description: z.string().optional(),
	}),
});

const topics = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/topics" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		category: z.string(), // References category ID
		description: z.string().optional(),
		learning_objectives: z.array(z.string()).optional(),
	}),
});

const companies = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/companies" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		website: z.string().url().optional(),
		headquarters: z.string().optional(),
	}),
});

const questions = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/questions" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		difficulty: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']),
		category: z.string(), // References category ID
		topic: z.string(),    // References topic ID
		tags: z.array(z.string()),
		companies: z.array(z.string()), // References company IDs
		estimated_time: z.number(),
		updated: z.date().or(z.string().transform((str) => new Date(str))),
	}),
});

export const collections = {
	categories,
	topics,
	companies,
	questions,
};
