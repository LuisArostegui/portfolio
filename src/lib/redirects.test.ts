import { describe, expect, it } from 'vitest';
import redirects from '../../public/_redirects?raw';

describe('public/_redirects', () => {
  it('redirects the removed index routes to their home sections', () => {
    const rules = redirects
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '' && !line.startsWith('#'))
      .map((line) => line.split(/\s+/));

    expect(rules).toEqual([
      ['/projects', '/#work', '301'],
      ['/projects/', '/#work', '301'],
      ['/experience', '/#experience', '301'],
      ['/experience/', '/#experience', '301'],
    ]);
  });
});
