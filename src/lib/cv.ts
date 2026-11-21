// Read at build time only: this module runs in page frontmatter, so the
// inlined file never reaches the client bundle.
import cvDataUrl from '../../public/CV-Luis-Arostegui-Ruiz.pdf?inline';

function getDataUrlByteLength(dataUrl: string): number {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;

  return (base64.length * 3) / 4 - padding;
}

/**
 * Builds the CV link label from the published file at build time, so the
 * advertised size never drifts from the PDF in `public/`.
 */
export function getCvLabel(): string {
  const bytes = getDataUrlByteLength(cvDataUrl);

  return `CV (PDF, ${Math.round(bytes / 1024)} KB)`;
}
