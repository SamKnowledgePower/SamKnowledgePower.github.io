# Sam Knowledge Power Portfolio

純 HTML、CSS、JavaScript 製作的響應式作品集，發布於 GitHub Pages。

## 線上連結

- 作品集：<https://samknowledgepower.github.io/>
- Gym Proposal：<https://samknowledgepower.github.io/gym-proposal/>
- Social Media Proposal：<https://samknowledgepower.github.io/social-media-proposal/>

## 更新內容

- `index.html`：主頁文案與案例
- `styles.css`：視覺與 375／768／1280 響應式版面
- `videos.json`：影音陣列，欄位為 `title`、`description`、`url`、`platform`
- `metrics.json`：成效數據，欄位為 `value`、`label`、`pending`
- `clients/`：經驗證的客戶／案例 JSON
- `inbox/`：新客戶資料入口；推送後由 Actions 驗證並移入 `clients/`

修改後可直接提交至 `main`，`Test and deploy Pages` workflow 會先測試再發布。

## 本機預覽與測試

因頁面透過 `fetch` 讀取 JSON，請使用本機 HTTP server，不要直接雙擊 HTML：

```sh
python3 -m http.server 4173
```

開啟 `http://localhost:4173`。執行資料與結構測試：

```sh
npm test
npm run process-inbox
```

## Inbox 操作

1. 複製 `inbox/_example.json`，檔名不要以底線開頭。
2. 填寫 `slug`、`name`、`summary`、`status`。
3. 請勿寫入機密或未授權公開的個資。
4. 提交至 `main`；workflow 驗證後會建立 `clients/<slug>.json` 並自動提交。

## 待補資料

原始計畫附件在執行環境中無法取得，因此以下內容使用清楚占位，發布前可直接替換：

- 姓名／品牌正式中英文名稱、個人簡介與照片
- Email、社群平台與合作 CTA
- 實際合作品牌數、觸及、轉換或其他成效指標
- 影音作品連結、縮圖與說明
- 客戶 logo、推薦文字及更多案例內容

頁面目前只採用 GitHub 公開可確認的兩個已發布專案，不虛構客戶或成效。

## Fetch 錯誤行為

`script.js` 會檢查 HTTP 狀態與 JSON 解析。`videos.json` 或 `metrics.json` 缺失、非 2xx 或格式錯誤時，對應區塊顯示可讀的錯誤提示，其他頁面內容仍可正常使用。
