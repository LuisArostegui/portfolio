import type { APIRoute } from 'astro';
import { buildRobotsTxt } from '../lib/crawl';
import { siteMetadata, type AbsoluteUrl } from '../lib/siteMetadata';

export const GET: APIRoute = () =>
  new Response(
    buildRobotsTxt(`${siteMetadata.siteUrl}/sitemap.xml` as AbsoluteUrl),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
