import { describe, expect, it } from 'vitest';

import { getCvLabel } from './cv';

describe('getCvLabel', () => {
  it('describes the CV with its format and size in kilobytes', () => {
    expect(getCvLabel()).toMatch(/^CV \(PDF, \d+ KB\)$/);
  });

  it('reads the size of the current CV file at build time', () => {
    expect(getCvLabel()).toBe('CV (PDF, 113 KB)');
  });
});
