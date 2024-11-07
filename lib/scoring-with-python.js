"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var numQuotes = quotesTuples.length;
// Generate random values between 0 and 1 for each subscore
var generateRandomScores = function (length) { return Array.from({ length: length }, function () { return Math.random(); }); };
// Create a Data object to hold all the subscores
var data = {
    Quote: quotesTuples.map(function (qt) { return qt.quote; }),
    Person: quotesTuples.map(function (qt) { return qt.person; }),
    // Ethos
    Trust: generateRandomScores(numQuotes),
    Influence: generateRandomScores(numQuotes),
    Capability: generateRandomScores(numQuotes),
    Accuracy: generateRandomScores(numQuotes),
    Assurance: generateRandomScores(numQuotes),
    Validity: generateRandomScores(numQuotes),
    // Pathos
    Joy: generateRandomScores(numQuotes),
    Sadness: generateRandomScores(numQuotes),
    Anticipation: generateRandomScores(numQuotes),
    Surprise: generateRandomScores(numQuotes),
    Rage: generateRandomScores(numQuotes),
    Fear: generateRandomScores(numQuotes),
    // Logos
    Premises: generateRandomScores(numQuotes),
    Conclusions: generateRandomScores(numQuotes),
    Soundness: generateRandomScores(numQuotes),
    Validity_Logos: generateRandomScores(numQuotes),
    Fallacies: generateRandomScores(numQuotes),
    Biases: generateRandomScores(numQuotes),
    // Style
    Tone_and_Demeanor: generateRandomScores(numQuotes),
    Use_of_Rhetorical_Devices: generateRandomScores(numQuotes),
    Engagement_and_Delivery: generateRandomScores(numQuotes),
    Language_Use_and_Style: generateRandomScores(numQuotes),
    Humor: generateRandomScores(numQuotes),
    Callbacks: generateRandomScores(numQuotes),
    Imagery_and_Symbolism: generateRandomScores(numQuotes),
    Metaphors_and_Analogies: generateRandomScores(numQuotes),
    Repetition_and_Emphasis: generateRandomScores(numQuotes),
    Alliteration_and_Rhyme: generateRandomScores(numQuotes),
    Storytelling: generateRandomScores(numQuotes)
};
// Function to call Python script and get scores
var callPythonScoringFunction = function (functionName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var pythonProcess = (0, child_process_1.spawnSync)('python3', __spreadArray(['./Python-Scoring-Classes/scoring.py', functionName], args, true), {
        encoding: 'utf-8'
    });
    if (pythonProcess.error) {
        console.error('Error calling Python script:', pythonProcess.error);
        return 0;
    }
    return parseFloat(pythonProcess.stdout.trim()) || 0;
};
// Calculate scores and store them
var ethosScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculateEthosScore', quote, person);
});
var pathosScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculatePathosScore', quote, person);
});
var logosScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculateLogosScore', quote, person);
});
var appealScores = quotesTuples.map(function (_, index) {
    return 1 + (ethosScores[index] + pathosScores[index] + logosScores[index]) / 30;
});
// Calculate CTS score by calling Python script
var ctrScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculateCTR', quote, person);
});
var cdsScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculateCDS', quote, person);
});
var cssScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculateCSS', quote, person);
});
var crsScores = quotesTuples.map(function (_a) {
    var quote = _a.quote, person = _a.person;
    return callPythonScoringFunction('calculateCRS', quote, person);
});
var ctsScores = quotesTuples.map(function (_, index) { return callPythonScoringFunction('calculateCTS', ctrScores[index].toString(), cdsScores[index].toString(), cssScores[index].toString(), crsScores[index].toString()); });
// Print results
quotesTuples.forEach(function (quote, index) {
    console.log("Quote: ".concat(quote.quote));
    console.log("Person: ".concat(quote.person));
    console.log("Ethos: ".concat(ethosScores[index].toFixed(2)));
    console.log("Pathos: ".concat(pathosScores[index].toFixed(2)));
    console.log("Logos: ".concat(logosScores[index].toFixed(2)));
    console.log("Appeal: ".concat(appealScores[index].toFixed(2)));
    console.log("CTS: ".concat(ctsScores[index].toFixed(2)));
    console.log('-----------------------------');
});
