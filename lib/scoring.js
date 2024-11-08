"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
// Read quotes.txt file and parse it into a list of quotes and authors
var filePath = path.join(__dirname, '../public/quotes.txt');
var content = fs.readFileSync(filePath, 'utf-8');
var lines = content.split('\n');
var quotesTuples = [];
lines.forEach(function (line) {
    if (line.includes('~')) {
        var _a = line.split('~'), quote = _a[0], person = _a[1];
        quotesTuples.push({ quote: quote.trim(), person: person.trim() });
    }
});
// Create a temporary JSON file to pass quotes to Python script
var quotesFilePath = path.join(__dirname, 'quotes.json');
fs.writeFileSync(quotesFilePath, JSON.stringify(quotesTuples));
// Run Python script to calculate scores
var pythonScriptPath = path.join(__dirname, '../Python-Scoring-Classes/quote_scorer.py');
try {
    var pythonOutput = (0, child_process_1.execSync)("python3 ".concat(pythonScriptPath, " ").concat(quotesFilePath), { encoding: 'utf-8' });
    var scores = JSON.parse(pythonOutput);
    // Print scores with more detailed null checks and logging
    scores.forEach(function (score, index) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console.log("Quote: ".concat(quotesTuples[index].quote));
        console.log("Person: ".concat(quotesTuples[index].person));
        console.log("Ethos: ".concat((_b = (_a = score.Ethos) === null || _a === void 0 ? void 0 : _a.toFixed(2)) !== null && _b !== void 0 ? _b : 'N/A'));
        console.log("Pathos: ".concat((_d = (_c = score.Pathos) === null || _c === void 0 ? void 0 : _c.toFixed(2)) !== null && _d !== void 0 ? _d : 'N/A'));
        console.log("Logos: ".concat((_f = (_e = score.Logos) === null || _e === void 0 ? void 0 : _e.toFixed(2)) !== null && _f !== void 0 ? _f : 'N/A'));
        console.log("Appeal: ".concat((_h = (_g = score.Appeal) === null || _g === void 0 ? void 0 : _g.toFixed(2)) !== null && _h !== void 0 ? _h : 'N/A'));
        console.log("CTS: ".concat((_k = (_j = score.CTS) === null || _j === void 0 ? void 0 : _j.toFixed(2)) !== null && _k !== void 0 ? _k : 'N/A'));
        console.log('-----------------------------');
    });
}
catch (error) {
    console.error('Error running Python script:', error);
}
finally {
    // Clean up the temporary JSON file
    fs.unlinkSync(quotesFilePath);
}
