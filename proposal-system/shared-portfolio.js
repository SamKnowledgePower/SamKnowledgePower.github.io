(async function () {
  const SITE_ORIGIN = new URL(document.currentScript.src).origin;
  const DATA_URL = `${SITE_ORIGIN}/data/portfolio.json`;
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
      const videoCards = data.items.slice(0, limit).map((item) => `
        <article class="shared-portfolio-card${item.layout === 'landscape' ? ' is-landscape' : ''}" data-video-id="${item.id}">
          <img src="${SITE_ORIGIN}${item.image}" alt="${item.title}" loading="lazy">
          <div class="shared-portfolio-overlay"><div class="shared-portfolio-views">◉ ${item.viewsLabel}</div><div class="shared-portfolio-title">${item.title}</div>${item.evidenceDate ? `<div class="shared-portfolio-date">數據截圖：${item.evidenceDate}</div>` : ''}</div>
        </article>`).join('');
      const campaignCards = (data.campaignEvidence || []).map((campaign) => `
        <article class="shared-performance-card" data-campaign-id="${campaign.id}">
          <div class="shared-performance-kicker">整體代操成效｜${campaign.period}</div>
          <h3 class="shared-performance-title">${campaign.title}</h3>
          <p class="shared-performance-summary">${campaign.summary}</p>
          <div class="shared-performance-metrics">
            ${campaign.metrics.map((metric) => `<div class="shared-performance-metric"><div class="shared-performance-value">${metric.value}</div><div class="shared-performance-label">${metric.label}</div><div class="shared-performance-change">${metric.change}</div></div>`).join('')}
          </div>
          <div class="shared-performance-images">
            ${campaign.images.map((image) => `<img src="${SITE_ORIGIN}${image.src}" alt="${image.alt}" loading="lazy">`).join('')}
          </div>
          <div class="shared-performance-date">Facebook 專業儀表板佐證｜數據截圖：${campaign.evidenceDate}</div>
        </article>`).join('');
      root.innerHTML = videoCards + campaignCards;
    });
  } catch (error) {
    document.querySelectorAll('[data-shared-portfolio]').forEach((root) => { root.innerHTML = '<p class="shared-portfolio-status">最新作品資料暫時無法載入，請稍後再試。</p>'; });
    console.warn(error);
  }
})();
