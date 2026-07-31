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

const technologies = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/technologies" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		category: z.string(), // References category ID
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
	}),
});

const concepts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/concepts" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		topic: z.string(), // References topic ID
		description: z.string().optional(),
	}),
});

const questions = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/questions" }),
	schema: z.object({
		id: z.string(),
		title: z.string(), // The prompt
		slug: z.string(),
		difficulty: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']),
		topic: z.string(),    // References topic ID
		concepts: z.array(z.string()).optional(), // References concept IDs
		companies: z.array(z.string()), // References company IDs
		estimated_time: z.number(),
		updated: z.date().or(z.string().transform((str) => new Date(str))),
	}),
});

const variants = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/variants" }),
	schema: z.object({
		id: z.string(),
		question: z.string(), // References question ID
		technology: z.string(), // References tech ID
		difficulty_override: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']).optional(),
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

export const collections = {
	categories,
	technologies,
	topics,
	concepts,
	questions,
	variants,
	companies,
};
