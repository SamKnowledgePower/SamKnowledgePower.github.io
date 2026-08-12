import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const file of ['videos.json', 'metrics.json']) {
  test(`${file} contains a JSON array`, async () => {
    const data = JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));
    assert.ok(Array.isArray(data));
  });
}

test('central portfolio totals match every work item', async () => {
  const data = JSON.parse(await readFile(new URL('../data/portfolio.json', import.meta.url), 'utf8'));
  assert.equal(data.items.length, data.summary.workCount);
  assert.equal(data.items.reduce((sum, item) => sum + item.views, 0), data.summary.totalViews);
  const highestViews = Math.max(...data.items.map((item) => item.views));
  assert.equal(data.summary.topViewsLabel, data.items.find((item) => item.views === highestViews).viewsLabel);
  assert.deepEqual(data.items.filter((item) => item.layout === 'landscape').map((item) => item.id).sort(), ['braised-pork', 'milkfish']);
  assert.equal(data.campaignEvidence.length, 1);
  assert.equal(data.campaignEvidence[0].metrics[0].value, '1,489,740');
  assert.equal(data.campaignEvidence[0].images.length, 2);
});

test('page has responsive viewport and data containers', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /name="viewport"/);
  assert.match(html, /id="metrics-grid"/);
  assert.match(html, /id="video-grid"/);
});
