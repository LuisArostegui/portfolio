import type { CollectionEntry } from 'astro:content';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getCollectionMock } = vi.hoisted(() => ({
  getCollectionMock: vi.fn<(collection: string) => Promise<unknown[]>>(),
}));

vi.mock('astro:content', () => ({
  getCollection: getCollectionMock,
}));

import { getExperience } from './experience';
import { getFeaturedProjects, getProjects } from './projects';

const projectEntries = [
  {
    id: 'later-featured',
    collection: 'projects',
    data: {
      title: 'Later featured project',
      summary: 'Summary',
      role: 'Engineer',
      status: 'active',
      featured: true,
      order: 2,
      capabilities: ['Testing'],
    },
  },
  {
    id: 'beta-featured',
    collection: 'projects',
    data: {
      title: 'Beta featured project',
      summary: 'Summary',
      role: 'Engineer',
      status: 'completed',
      featured: true,
      order: 1,
      capabilities: ['Architecture'],
    },
  },
  {
    id: 'alpha-featured',
    collection: 'projects',
    data: {
      title: 'Alpha featured project',
      summary: 'Summary',
      role: 'Engineer',
      status: 'completed',
      featured: true,
      order: 1,
      capabilities: ['Accessibility'],
      technologies: ['Astro'],
    },
  },
  {
    id: 'not-featured',
    collection: 'projects',
    data: {
      title: 'Not featured project',
      summary: 'Summary',
      role: 'Engineer',
      status: 'archived',
      featured: false,
      order: 0,
      capabilities: ['Delivery'],
    },
  },
] satisfies CollectionEntry<'projects'>[];

const experienceEntries = [
  {
    id: 'older-current-role',
    collection: 'experience',
    data: {
      organisation: 'Current organisation',
      role: 'Engineer',
      summary: 'Summary',
      startPeriod: '2024-01',
      endPeriod: null,
      capabilities: ['Leadership'],
    },
  },
  {
    id: 'ended-role',
    collection: 'experience',
    data: {
      organisation: 'Previous organisation',
      role: 'Engineer',
      summary: 'Summary',
      startPeriod: '2025-06',
      endPeriod: '2026-01',
      capabilities: ['Delivery'],
    },
  },
  {
    id: 'current-role',
    collection: 'experience',
    data: {
      organisation: 'Current organisation',
      role: 'Lead engineer',
      summary: 'Summary',
      startPeriod: '2025-06',
      endPeriod: null,
      capabilities: ['Architecture'],
    },
  },
] satisfies CollectionEntry<'experience'>[];

beforeEach(() => {
  getCollectionMock.mockReset();
});

describe('project content queries', () => {
  it('orders projects by editorial order and uses the id as a stable tie-breaker', async () => {
    getCollectionMock.mockResolvedValue(projectEntries);

    const projects = await getProjects();

    expect(projects.map(({ id }) => id)).toEqual([
      'not-featured',
      'alpha-featured',
      'beta-featured',
      'later-featured',
    ]);
  });

  it('returns the requested number of featured projects in project order', async () => {
    getCollectionMock.mockResolvedValue(projectEntries);

    const projects = await getFeaturedProjects(2);

    expect(projects.map(({ id }) => id)).toEqual([
      'alpha-featured',
      'beta-featured',
    ]);
  });

  it.each([
    { limit: -1, expectedIds: [] },
    { limit: Number.NaN, expectedIds: [] },
    { limit: 1.9, expectedIds: ['alpha-featured'] },
  ])(
    'normalises an unsafe featured limit of $limit',
    async ({ limit, expectedIds }) => {
      getCollectionMock.mockResolvedValue(projectEntries);

      const projects = await getFeaturedProjects(limit);

      expect(projects.map(({ id }) => id)).toEqual(expectedIds);
    },
  );
});

describe('experience content queries', () => {
  it('orders recent roles first and prioritises a current role when start periods match', async () => {
    getCollectionMock.mockResolvedValue(experienceEntries);

    const experience = await getExperience();

    expect(experience.map(({ id, isCurrent }) => ({ id, isCurrent }))).toEqual([
      { id: 'current-role', isCurrent: true },
      { id: 'ended-role', isCurrent: false },
      { id: 'older-current-role', isCurrent: true },
    ]);
  });
});
