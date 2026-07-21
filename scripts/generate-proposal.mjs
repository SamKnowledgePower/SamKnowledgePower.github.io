import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const configPath = process.argv[2];
if (!configPath) throw new Error('用法：npm run generate-proposal -- proposal-system/projects/client.json');
const config = JSON.parse(await readFile(configPath, 'utf8'));
for (const key of ['slug', 'clientName', 'projectName']) if (!config[key]) throw new Error(`缺少 ${key}`);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(config.slug)) throw new Error('slug 只可使用小寫英數與連字號');
let html = await readFile('proposal-system/templates/proposal.html', 'utf8');
const values = {...config, serviceItems: (config.serviceItems || []).map((item) => `<li>${item}</li>`).join('')};
for (const [key, value] of Object.entries(values)) html = html.replaceAll(`{{${key}}}`, String(value));
const output = path.join('proposals', config.slug);
await mkdir(output, {recursive:true});
await writeFile(path.join(output, 'index.html'), html);
console.log(`已產生 ${output}/index.html`);
