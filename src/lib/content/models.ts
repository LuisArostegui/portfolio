import type { RenderResult } from 'astro:content';

export type ProjectStatus =
  'planned' | 'experimental' | 'active' | 'completed' | 'archived';

export type ProjectVisibility = 'public' | 'private';

export interface ProjectChecks {
  url: string;
  labels: string[];
}

export interface ProjectPipelineStep {
  label: string;
  detail: string;
}

export interface ContentPeriod {
  start: string;
  end: string | null;
}

export interface ProjectPreview {
  id: string;
  title: string;
  summary: string;
  role: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  capabilities: string[];
  technologies?: string[];
  visibility: ProjectVisibility;
  checks?: ProjectChecks;
  pipeline?: ProjectPipelineStep[];
}

export interface ProjectDetail extends ProjectPreview {
  period?: ContentPeriod;
  publicLinks?: string[];
}

export interface ProjectDocument {
  data: ProjectDetail;
  Content: RenderResult['Content'];
}

export interface ExperiencePreview {
  id: string;
  organisation: string;
  role: string;
  summary: string;
  startPeriod: string;
  endPeriod: string | null;
  isCurrent: boolean;
  capabilities: string[];
}

export interface ExperienceDocument {
  data: ExperiencePreview;
  Content: RenderResult['Content'];
}
