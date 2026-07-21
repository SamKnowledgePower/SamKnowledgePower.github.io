import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const file of ['videos.json', 'metrics.json']) {
  test(`${file} contains a JSON array`, async () => {
    const data = JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));
    assert.ok(Array.isArray(data));
  });
}

test('page has responsive viewport and data containers', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /name="viewport"/);
  assert.match(html, /id="metrics-grid"/);
  assert.match(html, /id="video-grid"/);
});
