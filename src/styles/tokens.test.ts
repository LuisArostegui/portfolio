import { describe, expect, it } from 'vitest';
import css from './tokens.css?raw';

function tokenValue(name: string): string {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!match?.[1]) throw new Error(`Missing hex token ${name}`);
  return match[1].toLowerCase();
}

function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const a = luminance(tokenValue(foreground));
  const b = luminance(tokenValue(background));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe('colour tokens', () => {
  it('meets WCAG AA contrast for text pairings', () => {
    expect(
      contrast('--colour-text-primary', '--colour-surface-page'),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast('--colour-text-secondary', '--colour-surface-default'),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast('--colour-text-muted', '--colour-surface-default'),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast('--colour-signal', '--colour-surface-page'),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast('--colour-text-on-signal', '--colour-signal'),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast('--colour-caution', '--colour-surface-default'),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('uses the signal panel palette', () => {
    expect(tokenValue('--colour-surface-page')).toBe('#0d1210');
    expect(tokenValue('--colour-signal')).toBe('#c8f560');
  });
});
