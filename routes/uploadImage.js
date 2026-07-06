const express = require('express');
const fs = require('node:fs');
const { formidable } = require('formidable');

// ⚠️ 寫作業前先 `npm start` 打開 http://localhost:3000/docs 看 Swagger UI 的規格。
// 💡 /* 作答區 ... */ 是答題提示區，取消註解後填入你的程式碼。

const uploadDir = process.env.UPLOAD_DIR || '/tmp/uploads';
const maxFileSize = (Number(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024;

fs.mkdirSync(uploadDir, { recursive: true });

const router = express.Router();

// ───────────────────────────────────────────────────────────
// TODO 任務五：POST /
//   （實際 URL 是 /uploadImage，因為 app.js 把這個 router 掛在 '/uploadImage'）
// ───────────────────────────────────────────────────────────

// POST /
// - 輸入：multipart/form-data，field 名稱 `image`
// - 輸出：200 + { filename: file.originalFilename, sizeKB: Math.round(file.size / 1024), savedPath: file.filepath }，或 400 + { error: 'No file uploaded' }（沒帶 image）
// - 提示：建立 formidable 實例（uploadDir、keepExtensions: true、maxFileSize），用 form.parse(req, (err, fields, files) => { ... }) 解析，其中 err 不為 null 時回 500 + { error: err.message }
// - 注意：formidable v3 的 files.image 為陣列，需以 Array.isArray 判斷並取 [0]
/* 作答區
router.METHOD('PATH', (req, res) => { ... });
*/
router.post('/',(req,res)=>{
    const form = formidable({
        uploadDir,
        maxFileSize,
        keepExtensions: true
    })
    form.parse(req,(err,fields,files)=>{
        const file = Array.isArray(files.image)? files.image[0]:files.image;

        if(err){
            return res.status(500).json({'error':err.message})
        }else if (!file){
            return res.status(400).json({'error':'No file uploaded'})
        }
        
        res.status(200).json({
            filename:file.originalFilename,
            sizeKB:Math.round(file.size / 1024),
            savedPath: file.filepath
        })
    })
})

module.exports = router;
