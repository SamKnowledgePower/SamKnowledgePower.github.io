# Inbox automation

把符合格式的 `.json` 放在此目錄並推送。GitHub Actions 會執行驗證；本機可先跑 `npm run process-inbox`。

必要欄位：`slug`、`name`、`summary`、`status`。`slug` 只可使用小寫英數與連字號。範例檔以底線開頭，因此不會被處理。
