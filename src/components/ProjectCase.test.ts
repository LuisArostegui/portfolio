// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';

import type { ProjectDetail } from '../lib/content/models';
import ProjectCase from './ProjectCase.astro';

const base: ProjectDetail = {
  id: 'sample',
  title: 'Sample',
  summary: 'A sample project.',
  role: 'Maintainer',
  status: 'active',
  featured: true,
  order: 0,
  capabilities: [],
  visibility: 'public',
};

async function render(project: ProjectDetail): Promise<string> {
  const container = await AstroContainer.create();

  return container.renderToString(ProjectCase, { props: { project } });
}

describe('ProjectCase', () => {
  it('omits pipeline, checks and repository link when no evidence exists', async () => {
    const html = await render(base);

    expect(html).not.toContain('<figure');
    expect(html).not.toContain('case__checks');
    expect(html).not.toContain('Repository on GitHub');
  });

  it('hides checks and repository link for private projects', async () => {
    const html = await render({
      ...base,
      visibility: 'private',
      checks: { url: 'https://example.com/ci', labels: ['lint'] },
      publicLinks: ['https://github.com/example/repo'],
    });

    expect(html).not.toContain('case__checks');
    expect(html).not.toContain('Repository on GitHub');
    expect(html).toContain('◐');
    expect(html).toContain('private');
  });
});
