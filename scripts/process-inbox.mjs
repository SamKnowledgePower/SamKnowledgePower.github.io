import { readdir, readFile, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const inbox = path.join(root, 'inbox');
const clients = path.join(root, 'clients');
const required = ['slug', 'name', 'summary', 'status'];
const allowedStatus = new Set(['draft', 'published', 'archived']);

await mkdir(clients, { recursive: true });
const files = (await readdir(inbox)).filter((name) => name.endsWith('.json') && !name.startsWith('_'));

for (const file of files) {
  const source = path.join(inbox, file);
  let data;
  try { data = JSON.parse(await readFile(source, 'utf8')); }
  catch { throw new Error(`${file}: JSON 格式錯誤`); }
  for (const key of required) if (!data[key]) throw new Error(`${file}: 缺少 ${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error(`${file}: slug 格式錯誤`);
  if (!allowedStatus.has(data.status)) throw new Error(`${file}: status 必須是 draft、published 或 archived`);
  const target = path.join(clients, `${data.slug}.json`);
  await rename(source, target);
  console.log(`${file} → clients/${data.slug}.json`);
}

console.log(files.length ? `已處理 ${files.length} 筆資料` : 'Inbox 沒有待處理資料');
