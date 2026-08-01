import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/categories" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		description: z.string().optional(),
	}),
});

const technologies = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/technologies" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		category: z.string(),
		description: z.string().optional(),
	}),
});

const topics = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/topics" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		category: z.string(),
		description: z.string().optional(),
	}),
});

const concepts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/concepts" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		topic: z.string(),
		description: z.string().optional(),
	}),
});

const questions = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/questions" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		slug: z.string(),
		difficulty: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']),
		topic: z.string(),
		concepts: z.array(z.string()).optional(),
		companies: z.array(z.string()),
		estimated_time: z.number(),
		updated: z.date().or(z.string().transform((str) => new Date(str))),
	}),
});

const variants = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/variants" }),
	schema: z.object({
		id: z.string(),
		question: z.string(),
		technology: z.string(),
		difficulty_override: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']).optional(),
	}),
});

const companies = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/companies" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		website: z.string().url().optional(),
		headquarters: z.string().optional(),
	}),
});

const paths = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "../../content/paths" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		color: z.string(),
		topics: z.array(z.string()), // References topic IDs
		order: z.number().default(0),
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
	paths,
};
