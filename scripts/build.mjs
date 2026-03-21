import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const distDir = resolve(root, 'dist');
const webSrcDir = resolve(root, 'apps/web/src');
const webDistDir = resolve(distDir, 'apps/web');

rmSync(distDir, { recursive: true, force: true });
mkdirSync(webDistDir, { recursive: true });
cpSync(webSrcDir, webDistDir, { recursive: true });

const workspaceGlobs = ['apps', 'services', 'packages'];
const workspaceSummary = workspaceGlobs.flatMap((segment) => {
  const baseDir = resolve(root, segment);
  if (!existsSync(baseDir)) {
    return [];
  }

  return readdirSync(baseDir).map((entry) => `${segment}/${entry}`);
});

const tokens = JSON.parse(readFileSync(resolve(root, 'packages/ui-tokens/tokens.json'), 'utf8'));
const manifest = {
  name: '7tube',
  generatedAt: new Date().toISOString(),
  workspaces: workspaceSummary,
  themeAccent: tokens.color.accent
};

writeFileSync(resolve(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Built ${workspaceSummary.length} workspaces into ${distDir}`);
