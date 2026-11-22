import type { APIRoute } from 'astro';
import { buildSitemapXml, getIndexableUrls } from '../lib/crawl';
import { getProjects } from '../lib/content/projects';

export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const xml = buildSitemapXml(getIndexableUrls(projects.map(({ id }) => id)));

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
