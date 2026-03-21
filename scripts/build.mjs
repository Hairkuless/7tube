import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const distDir = resolve(root, 'dist');
const webSrcDir = resolve(root, 'apps/web/src');
const docsDir = resolve(root, 'docs');
const webDistDir = resolve(distDir, 'apps/web');
const docsDistDir = resolve(distDir, 'docs');

rmSync(distDir, { recursive: true, force: true });
mkdirSync(webDistDir, { recursive: true });
mkdirSync(docsDistDir, { recursive: true });
cpSync(webSrcDir, webDistDir, { recursive: true });
cpSync(docsDir, docsDistDir, { recursive: true });

const workspaceGlobs = ['apps', 'services', 'packages'];
const workspaceSummary = workspaceGlobs.flatMap((segment) => {
  const baseDir = resolve(root, segment);
  if (!existsSync(baseDir)) {
    return [];
  }

  return readdirSync(baseDir).map((entry) => `${segment}/${entry}`);
});

const tokens = JSON.parse(readFileSync(resolve(root, 'packages/ui-tokens/tokens.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const manifest = {
  name: packageJson.name,
  version: packageJson.version,
  generatedAt: new Date().toISOString(),
  workspaces: workspaceSummary,
  scripts: packageJson.scripts,
  themeAccent: tokens.color.accent,
  documentation: readdirSync(docsDir),
  webEntry: 'apps/web/index.html'
};

writeFileSync(resolve(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Built ${workspaceSummary.length} workspaces into ${distDir}`);
