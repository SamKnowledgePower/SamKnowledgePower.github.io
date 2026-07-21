(async function () {
  const DATA_URL = 'https://samknowledgepower.github.io/data/portfolio.json';
  const fields = { total: 'totalViewsLabel', top: 'topViewsLabel', second: 'secondViewsLabel', third: 'thirdViewsLabel', count: 'workCount' };
  try {
    const response = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Portfolio data ${response.status}`);
    const data = await response.json();
    document.querySelectorAll('[data-portfolio-stat]').forEach((node) => {
      const key = fields[node.dataset.portfolioStat];
      if (key && data.summary[key] !== undefined) node.textContent = data.summary[key];
    });
    document.querySelectorAll('[data-portfolio-updated]').forEach((node) => { node.textContent = data.updatedAt; });
    document.querySelectorAll('[data-shared-portfolio]').forEach((root) => {
      const limit = Number(root.dataset.limit || data.items.length);
      root.innerHTML = data.items.slice(0, limit).map((item) => `
        <article class="shared-portfolio-card${item.layout === 'landscape' ? ' is-landscape' : ''}" data-video-id="${item.id}">
          <img src="https://samknowledgepower.github.io${item.image}" alt="${item.title}" loading="lazy">
          <div class="shared-portfolio-overlay"><div class="shared-portfolio-views">◉ ${item.viewsLabel}</div><div class="shared-portfolio-title">${item.title}</div>${item.evidenceDate ? `<div class="shared-portfolio-date">數據截圖：${item.evidenceDate}</div>` : ''}</div>
        </article>`).join('');
    });
  } catch (error) {
    document.querySelectorAll('[data-shared-portfolio]').forEach((root) => { root.innerHTML = '<p class="shared-portfolio-status">最新作品資料暫時無法載入，請稍後再試。</p>'; });
    console.warn(error);
  }
})();
