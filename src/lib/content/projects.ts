import { getCollection, type CollectionEntry } from "astro:content";

import type { ProjectDetail, ProjectPreview } from "./models";

type ProjectEntry = CollectionEntry<"projects">;

function toProjectPreview({ id, data }: ProjectEntry): ProjectPreview {
  return {
    id,
    title: data.title,
    summary: data.summary,
    role: data.role,
    status: data.status,
    featured: data.featured,
    order: data.order,
    capabilities: [...data.capabilities],
    ...(data.technologies === undefined
      ? {}
      : { technologies: [...data.technologies] }),
  };
}

function toProjectDetail(entry: ProjectEntry): ProjectDetail {
  const preview = toProjectPreview(entry);

  return {
    ...preview,
    ...(entry.data.period === undefined
      ? {}
      : { period: { ...entry.data.period } }),
    ...(entry.data.publicLinks === undefined
      ? {}
      : { publicLinks: [...entry.data.publicLinks] }),
  };
}

function compareProjects(left: ProjectPreview, right: ProjectPreview): number {
  return left.order - right.order || left.id.localeCompare(right.id);
}

export async function getProjects(): Promise<ProjectPreview[]> {
  const entries = await getCollection("projects");

  return entries.map(toProjectPreview).sort(compareProjects);
}

export async function getFeaturedProjects(
  limit = 3,
): Promise<ProjectPreview[]> {
  const projects = await getProjects();
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.trunc(limit)) : 0;

  return projects.filter(({ featured }) => featured).slice(0, safeLimit);
}

export async function getProjectById(
  id: string,
): Promise<ProjectDetail | undefined> {
  const entries = await getCollection("projects");
  const entry = entries.find((candidate) => candidate.id === id);

  return entry === undefined ? undefined : toProjectDetail(entry);
}
