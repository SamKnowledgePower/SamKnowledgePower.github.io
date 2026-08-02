const $ = (selector) => document.querySelector(selector);

const menuButton = $('.menu-toggle');
const nav = $('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

async function loadJson(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${path} 回傳 ${response.status}`);
  return response.json();
}

async function renderMetrics() {
  const root = $('#metrics-grid');
  try {
    const items = await loadJson('metrics.json');
    root.innerHTML = items.map(({ value, label, pending }) => `
      <article class="metric"><strong>${value}</strong><span>${label}${pending ? '（待補正式數據）' : ''}</span></article>
    `).join('');
  } catch (error) {
    root.innerHTML = `<p class="status-message error" role="alert">成效資料暫時無法載入。請稍後再試，或直接查看精選案例。</p>`;
    console.warn(error);
  }
}

async function renderVideos() {
  const root = $('#video-grid');
  try {
    const items = await loadJson('videos.json');
    if (!items.length) {
      root.innerHTML = '<p class="status-message">影音案例待補。新增內容至 videos.json 後會自動顯示於此。</p>';
      return;
    }
    root.innerHTML = items.map(({ title, description, url, platform }) => `
      <article class="video-card"><div class="video-thumb" aria-hidden="true">▶</div><div class="video-body"><p class="eyebrow">${platform}</p><h3>${title}</h3><p>${description}</p>${url ? `<p><a href="${url}" target="_blank" rel="noreferrer">觀看影片 ↗</a></p>` : ''}</div></article>
    `).join('');
  } catch (error) {
    root.innerHTML = '<p class="status-message error" role="alert">影音資料暫時無法載入；其他作品仍可正常瀏覽。</p>';
    console.warn(error);
  }
}

$('#year').textContent = new Date().getFullYear();
renderMetrics();
