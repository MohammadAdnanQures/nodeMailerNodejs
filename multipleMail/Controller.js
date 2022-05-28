var XLSX = require("xlsx");
const nodemailer = require("nodemailer");
const imaps = require("imap-simple");
var smtpPool = require("nodemailer-smtp-pool");
const delay = require("delay");

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const multer = require("multer");

var dataFrom = [];
var dataTo = [];
module.exports = {
  ReadMail: async (req, res, next) => {
    var workbook1 = XLSX.readFile("./file/From.xlsx");
    var workbook2 = XLSX.readFile("./file/To.xlsx");
    let worksheet1 = await workbook1.Sheets[workbook1.SheetNames];
    let worksheet2 = await workbook2.Sheets[workbook2.SheetNames];
    var data1 = XLSX.utils.sheet_to_json(worksheet1);
    var data2 = XLSX.utils.sheet_to_json(worksheet2);
    dataFrom.push(data1);
    dataTo.push(data2);
    for (let k = 0; k < dataFrom[0].length; k++) {
      console.log("k Value22 ::::::::", k);
      console.log("k Value ::::::::", k);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        "accept-language": "en-US,en;q=0.9,hy;q=0.8",
      });
      await page.goto(
        "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
      );
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', `${dataFrom[0][k].Email}`, {
        delay: 0,
      });
      await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press("Enter"),
      ]);
      await page.waitForSelector('input[type="password"]', { visible: true });
      await page.type('input[type="password"]', `${dataFrom[0][k].Password}`, {
        delay: 0,
      });
      const res = await Promise.all([
        // page.waitForFunction(() => location.href === "https://medium.com/"),
        await page.keyboard.press("Enter"),
      ]);
      // print user id
      // await page.waitForFunction(() => window?.branch?.g);
      // const myId = await page.evaluate(() => window.branch.g);
      // console.log("myId:", myId);
      await browser.close();
    }
  },
  ReaderXlsx: async (req, res, next) => {
    // const filetStoreageEngine = multer.diskStorage({
    //   destination: (req, file, cb) => {
    //     cb(null, "./file");
    //   },
    //   filename: (req, file, cb) => {
    //     cb(null, file.originalname);
    //   },
    // });
    // const upload = multer({ storage: filetStoreageEngine }).array("Mfiles");
    // upload(req, res, (err) => {
    //   if (err) {
    //     return res.status(500).json(err);
    //   } else {
    //     return res.status(200).json(req.file);
    //   }
    // });
    console.log("a_________________________________________________________");
    var workbook1 = XLSX.readFile("./file/From.xlsx");
    var workbook2 = XLSX.readFile("./file/To.xlsx");
    let worksheet1 = await workbook1.Sheets[workbook1.SheetNames];
    let worksheet2 = await workbook2.Sheets[workbook2.SheetNames];
    var data1 = XLSX.utils.sheet_to_json(worksheet1);
    var data2 = XLSX.utils.sheet_to_json(worksheet2);
    dataFrom.push(data1);
    dataTo.push(data2);
    for (let k = 0; k < dataFrom[0].length; k++) {
      console.log("k Value22 ::::::::", k);
      console.log("k Value ::::::::", k);
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        "accept-language": "en-US,en;q=0.9,hy;q=0.8",
      });
      await page.goto(
        "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
      );
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', `${dataFrom[0][k].Email}`, {
        delay: 100,
      });
      await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press("Enter"),
      ]);
      await page.waitForSelector('input[type="password"]', { visible: true });
      await page.type('input[type="password"]', `${dataFrom[0][k].Password}`, {
        delay: 100,
      });
      const res = await Promise.all([
        // page.waitForFunction(() => location.href === "https://medium.com/"),
        await page.keyboard.press("Enter"),
      ]);
      // await page.$$(".headingText >");
      // await page.Click(".vxx8jf");
      // print user id
      // await page.waitForFunction(() => window?.branch?.g);
      // const myId = await page.evaluate(() => window.branch.g);
      // console.log("myId:", myId);

      //await browser.close();
    }

    for (let i = 0; i < dataFrom[0].length; i++) {
      // const READ_MAIL_CONFIG = {
      //   imap: {
      //     user: `${dataFrom[0][i].Email}`,
      //     password: `${dataFrom[0][i].Password}`,
      //     host: "imap.gmail.com",
      //     port: 993,
      //     authTimeout: 10000,
      //     tls: true,
      //     tlsOptions: { rejectUnauthorized: false },
      //   },
      // };
      // const connection = await imaps.connect(READ_MAIL_CONFIG);
      // console.log("CONNECTION SUCCESSFUL", new Date().toString());
      for (let j = 0; j < dataTo[0].length; j++) {
        // console.log("i", dataFrom[0][i].Email);
        // console.log("j", dataTo[0][j].Email);
        try {
          let transporter = nodemailer.createTransport(
            smtpPool({
              service: "gmail",
              auth: {
                user: `${dataFrom[0][i].Email}`, // generated ethereal user
                pass: `${dataFrom[0][i].Password}`, // generated ethereal password
              },
            })
          );
          console.log("hit 1");
          var mailOption = {
            from: `${dataFrom[0][i].Email}`,
            to: `${dataTo[0][j].Email}`,
            subject: "Data",
            text: `${dataTo[0][j].Text}`,
          };
          console.log("hit 2");
          transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("success");
            }
            console.log("hit 3");
          });
        } catch (err) {
          res.send(err);
        }
      }

      // connection.end();
    }
    const data12 = [data1, data2];
    res.send(data12);
  },
  sendFile: async (req, res, next) => {
    console.log("success");
    const filetStoreageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./file");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: filetStoreageEngine }).array("Mfiles");
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(req.file);
      }
    });
    res.sendStatus(200);
  },
};
