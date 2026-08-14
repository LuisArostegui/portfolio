import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmptyText = z.string().trim().min(1);
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use a valid YYYY-MM period.');

const period = z
  .object({
    start: yearMonth,
    end: yearMonth.nullable(),
  })
  .strict()
  .superRefine(({ start, end }, context) => {
    if (end !== null && end < start) {
      context.addIssue({
        code: 'custom',
        path: ['end'],
        message: 'The end period cannot be earlier than the start period.',
      });
    }
  });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: nonEmptyText,
      summary: nonEmptyText,
      role: nonEmptyText,
      status: z.enum([
        'planned',
        'experimental',
        'active',
        'completed',
        'archived',
      ]),
      featured: z.boolean(),
      order: z.number().int().nonnegative(),
      capabilities: z.array(nonEmptyText).min(1),
      technologies: z.array(nonEmptyText).min(1).optional(),
      period: period.optional(),
      publicLinks: z.array(z.url()).min(1).optional(),
    })
    .strict(),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z
    .object({
      organisation: nonEmptyText,
      role: nonEmptyText,
      summary: nonEmptyText,
      startPeriod: yearMonth,
      endPeriod: yearMonth.nullable(),
      capabilities: z.array(nonEmptyText).min(1),
    })
    .strict()
    .superRefine(({ startPeriod, endPeriod }, context) => {
      if (endPeriod !== null && endPeriod < startPeriod) {
        context.addIssue({
          code: 'custom',
          path: ['endPeriod'],
          message: 'The end period cannot be earlier than the start period.',
        });
      }
    }),
});

export const collections = { projects, experience };
