export type ProjectStatus =
  'planned' | 'experimental' | 'active' | 'completed' | 'archived';

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
}

export interface ProjectDetail extends ProjectPreview {
  period?: ContentPeriod;
  publicLinks?: string[];
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
