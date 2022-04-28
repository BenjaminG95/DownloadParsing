const {fromXLSX} = require("./parseXLSX");
const {fromHTML} = require("./parseHTML");
const {fromPDF} = require("./parsePDF");
const {fromDOCX} = require("./parseDOCX");

module.exports = {fromXLSX, fromHTML, fromPDF, fromDOCX};
