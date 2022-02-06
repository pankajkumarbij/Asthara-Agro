const express = require('express');
const router = express.Router();
const upload = require("../../middleware/uploader");
/* Required Model for store in database*/
const Item = require('../../models/item/item');

router.post("/uploadfile", upload.single("file"), async (req, res) => {
    if (req.file === undefined) {
        return res.send("you must select a file.");
    }
    const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
    return res.json({"img":imgUrl});
});

module.exports = router;