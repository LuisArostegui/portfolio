import { getCollection, type CollectionEntry } from 'astro:content';

import type { ExperiencePreview } from './models';

type ExperienceEntry = CollectionEntry<'experience'>;

function toExperiencePreview({ id, data }: ExperienceEntry): ExperiencePreview {
  return {
    id,
    organisation: data.organisation,
    role: data.role,
    summary: data.summary,
    startPeriod: data.startPeriod,
    endPeriod: data.endPeriod,
    isCurrent: data.endPeriod === null,
    capabilities: [...data.capabilities],
  };
}

function compareExperience(
  left: ExperiencePreview,
  right: ExperiencePreview,
): number {
  const byStartPeriod = right.startPeriod.localeCompare(left.startPeriod);

  if (byStartPeriod !== 0) {
    return byStartPeriod;
  }

  if (left.isCurrent !== right.isCurrent) {
    return left.isCurrent ? -1 : 1;
  }

  return left.id.localeCompare(right.id);
}

export async function getExperience(): Promise<ExperiencePreview[]> {
  const entries = await getCollection('experience');

  return entries.map(toExperiencePreview).sort(compareExperience);
}

export async function getExperienceById(
  id: string,
): Promise<ExperiencePreview | undefined> {
  const entries = await getCollection('experience');
  const entry = entries.find((candidate) => candidate.id === id);

  return entry === undefined ? undefined : toExperiencePreview(entry);
}
