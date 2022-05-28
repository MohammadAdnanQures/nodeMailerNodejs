const router = require("express").Router();
const { ReaderXlsx, sendFile, ReadMail } = require("./Controller");

router.post("/read", ReaderXlsx);
router.post("/readMail", ReadMail);
router.post("/sendMails", sendFile);

module.exports = router;
