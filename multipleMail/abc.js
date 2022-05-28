var XLSX = require("xlsx");
var workbook = XLSX.readFile("./file/test.xlsx");
let worksheet = workbook.Sheets[workbook.SheetNames];
var data = XLSX.utils.sheet_to_json(worksheet);
console.log(data);
