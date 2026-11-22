// Angular copies public/ into every locale folder; a nested web.config re-adds the root's rules and
// IIS answers 500.19 for all of /ar, so only the root server configs may ship. Usage: node scripts/remove-locale-server-configs.mjs [distDir]
import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist/DynaOpsSite';

for (const file of ['web.config', '.htaccess']) {
  await rm(join(dist, 'browser', 'ar', file), { force: true });
  console.log(`removed: ar/${file}`);
}
