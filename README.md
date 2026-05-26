# 第三週作業：會員 CRUD + 圖片上傳（Express）

## 情境與任務描述

本週作業將第三堂學習的主題：**Express、Router、middleware** 整合，以 Express 框架取代第二週的原生 http 撰寫，並將路由拆分成獨立檔案，打造一支健身房會員管理 API（會員 CRUD + 圖片上傳 + Swagger 文件），最後使用 Jest 來進行測試驗證。

---

## 快速開始

### Step 1：環境準備

1. 確認 Node.js 版本 >= 18（建議 20）
2. 下載此專案，並打開終端機輸入：`npm install`

### Step 2：設定環境變數

手動新增 `.env`，並將環境變數範例檔（`.env.example`）內容複製到 `.env`（或者可打開終端機輸入：`cp .env.example .env`）

不可把 `.env` 推上 GitHub（`.gitignore` 目前已有排除）


### Step 3：寫作業前先打開 Swagger UI

啟動 server：`npm start`，開啟瀏覽器前往 `http://localhost:3000/docs`。Swagger UI 已預先設定好，啟動後即可查看。

**Swagger UI 是這週唯一 API 規格來源** — 每個 endpoint 點進去能看到完整的 request / response schema，建議先瀏覽各 endpoint 的規格，幫助理解作業任務的撰寫方向。（完成作業後也可點擊 **Try it out** 直接在頁面測試 API。）

### Step 4：開始寫作業

本週共六個任務，需完成以下 3 個檔案：`routes/members.js`、`routes/uploadImage.js`、`app.js`，請依照各檔案的註解說明，來完成對應的功能要求
（**不需更動**：`server.js`、`test.js`、`fixtures/swagger.json`）

```js
// 任務一舉例：
// ───────────────────────────────────────────────────────────
// TODO 任務一：初始化 state + 內部 helpers
// ───────────────────────────────────────────────────────────

// 1. 複製 initialMembers，不直接改外部陣列
/* 作答區
const members = ...;
*/

// 2. 下一個新增會員要使用的 id
/* 作答區
let nextId = ...;
*/

// 3. 兩個內部 helper 函式

// 函式一：filterByQuery(list, query)：
// - 依據 query.level 篩選，沒帶就回全部
// - 任務二的 GET / 會使用到這個函式
/* 作答區
function filterByQuery(list, query) { ... }
*/

// 函式二：validateBody(body)
// - 驗證 body 有沒有 name、level 欄位，要擋 null / undefined / {}
// - 驗證通過 → { valid: true }
// - 驗證失敗 → { valid: false, error: '缺 name 或 level' }
// - 任務三的 POST / 會使用到這個函式
/* 作答區
function validateBody(body) { ... }
*/

```

### Step 5：測試你的程式碼

```bash
# 起 server + Postman / Swagger UI（同學自行練習）
npm start

# 執行完整 Jest 測試（繳交作業前需整體通過）
npm test        
```

（這個部分的詳細可參照下方 **驗證與測試** 的說明）


## 專案架構

```text
node-js-week3-2026/
├── app.js                     # ← 任務六：組裝 app（需撰寫）
├── server.js                  # npm start 啟動點（不需更動）
├── routes/
│   ├── members.js             # ← 任務一~任務四（需撰寫）
│   └── uploadImage.js         # ← 任務五（需撰寫）
├── test.js                    # Jest + supertest 測試（不需更動）
├── fixtures/
│   ├── members.json           # 4 筆初始會員
│   ├── sample.jpg             # 測試用圖片
│   └── swagger.json           # swagger API 文件（不需更動）
├── .env.example
├── .gitignore
├── package.json

```

---

## 主線任務

### 【任務一：初始化 state + 內部 helpers】

* `members`：複製 `initialMembers` 作為初始資料；`nextId`：下一個可用 id
* `filterByQuery(list, query)`：依 `query.level` 篩選，沒帶回全部
* `validateBody(body)`：擋 null / undefined / `{}`，回應 `{ valid, error? }`

### 【任務二：GET /members + /:id】

* `router.get('/', ...)` 用 `filterByQuery` 處理篩選
* `router.get('/:id', ...)` 用 `members.find`，找不到回應 **404**

### 【任務三：POST /members】

* 搭配 `validateBody` 來進行驗證，如果失敗就回應 **400**
* 成功新增會員（nextId 遞增），回應 **201**

### 【任務四：PUT + DELETE /members/:id】

* PUT：找不到會員就回應 **404**，成功編輯會員則回應 **200**
* DELETE：找不到會員就回應 **404**，成功移除後回應 **204 無 body**

### 【任務五：POST /uploadImage】

* 用 `formidable` 解析 `image` 欄位
* 上傳成功回應 **200** `{ filename, sizeKB, savedPath }`；沒帶 file 則回應 **400**

### 【任務六：app.js 組裝】

* 依序掛載：解跨域、JSON body 解析等 middleware，接著是 Swagger UI（已預先提供），以及會員與圖片上傳的 router
* `module.exports = app`（不需呼叫 `app.listen`）

---

## 驗證與測試

### 【驗證】

驗證部分提供給同學在作業進行中或撰寫完成後**自行練習**，透過實際發送 request、觀察回應結果，也能更直觀地了解各 API 的運作方式。

使用前需先執行 `npm start` 啟動本地 server。

**方式一：Postman Collection**

此專案附有 `week3_postman_collection.json`，匯入 Postman 後即可快速測試各 API。
關於匯入流程、相關操作步驟，以及一些注意事項，可參考 [Week3 Postman Collection 教學](https://hackmd.io/@hexschool/BJ133TzlGx)

**方式二：Swagger UI**

開啟瀏覽器前往 `http://localhost:3000/docs`，可在各個 API 項目點擊 **Try it out** 直接在頁面測試。

### 【測試】

**作業繳交前必須通過**，執行 `npm test` 來確認各個測試項目。

測試結果條列：

* ✓ 表示測試通過
* ✕ 表示測試失敗

最終看到 `Tests: 16 passed, 16 total` 即代表全數通過。

**測試項目（共 16 項）**
| 群組 | 測試數量 |
|---|---|
| 任務二：GET /members + /:id | 4 |
| 任務三：POST /members | 3 |
| 任務四：PUT + DELETE | 4 |
| 任務五：POST /uploadImage | 2 |
| 任務六：app.js 整合（CORS + 404 + Swagger）| 3 |

---

## 繳交方式

1. 完成 `routes/members.js`、`routes/uploadImage.js`、`app.js` 中的所有函式
2. 執行 npm test 確保所有測試通過
3. 將程式碼上傳至 GitHub
4. 提交 GitHub 連結

---

## 常見問題

**Q：`req.body` 出現 undefined？**
A：檢查 `app.js` 是不是忘記 `app.use(express.json())`，或者檢查掛載順序（要在 router 之前）

**Q：前端 `fetch` 遇到 CORS 相關問題？**
A：注意 `app.use(cors())` 的順序唷（要在最前面）

**Q：為什麼 `app.js` 不進行 `app.listen()`？**
A：主要分離「組裝」跟「啟動」：`app.js` 只專注 export app、`server.js` 才進行 listen。這樣 `test.js` 用 supertest 直接戳 app instance，就不會佔用一個 port。
