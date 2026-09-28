import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './consts';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES]),
			tags: z.array(z.string()).default([]),
			// Posts sharing the same series name are linked together, ordered by seriesOrder.
			series: z.string().optional(),
			seriesOrder: z.number().optional(),
			// Drafts show up in `npm run dev` but are left out of the production build.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
