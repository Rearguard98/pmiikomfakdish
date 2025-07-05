import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const artikel = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/artikel', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string().optional(),
		tag: z.string().optional(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date(),
		heroImage: z.string().optional(),
		altImage: z.string().optional(),
		status: z.enum(['draft', 'published', 'archived']).default('draft'),
		author: z.string().optional(),
	}),
});

export const collections = { artikel };
