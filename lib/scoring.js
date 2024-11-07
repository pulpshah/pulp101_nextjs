"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
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
// Define utility functions to calculate scores
var calculateEthosScore = function (index) {
    var weights = {
        Trust: 0.25,
        Influence: 0.2,
        Capability: 0.2,
        Accuracy: 0.15,
        Assurance: 0.1,
        Validity: 0.1
    };
    return Object.keys(weights).reduce(function (sum, key) { return sum + data[key][index] * weights[key]; }, 0);
};
var calculatePathosScore = function (index) {
    var weights = {
        Joy: 0.2,
        Sadness: 0.15,
        Anticipation: 0.2,
        Surprise: 0.15,
        Rage: 0.15,
        Fear: 0.15
    };
    return Object.keys(weights).reduce(function (sum, key) { return sum + data[key][index] * weights[key]; }, 0);
};
var calculateLogosScore = function (index) {
    var weights = {
        Premises: 0.25,
        Conclusions: 0.25,
        Soundness: 0.2,
        Validity_Logos: 0.15,
        Fallacies: -0.075,
        Biases: -0.075
    };
    return Object.keys(weights).reduce(function (sum, key) { return sum + data[key][index] * weights[key]; }, 0);
};
var calculateAppealScore = function (ethos, pathos, logos) {
    return 1 + (ethos + pathos + logos) / 30;
};
var calculateCriticalThinkingScore = function (index) {
    var ctr = data.Trust[index] / data.Influence[index];
    var cds = data.Trust[index] * data.Influence[index];
    var css = ctr * cds;
    var crs = (-0.5 * ctr) * ((data.Fallacies[index] * data.Validity_Logos[index]) - (data.Biases[index] * data.Validity_Logos[index]));
    var crsClamped = Math.min(Math.max(crs, 0), 1);
    var weights = {
        CTR: 0.25,
        CDS: 0.25,
        CSS: 0.25,
        CRS: 0.25
    };
    var totalWeight = weights.CTR + weights.CDS + weights.CSS + weights.CRS;
    var cts = (weights.CTR * ctr + weights.CDS * cds + weights.CSS * css + weights.CRS * crsClamped) / totalWeight;
    return cts;
};
// Calculate scores and store them
var ethosScores = quotesTuples.map(function (_, index) { return calculateEthosScore(index); });
var pathosScores = quotesTuples.map(function (_, index) { return calculatePathosScore(index); });
var logosScores = quotesTuples.map(function (_, index) { return calculateLogosScore(index); });
var appealScores = quotesTuples.map(function (_, index) { return calculateAppealScore(ethosScores[index], pathosScores[index], logosScores[index]); });
var ctsScores = quotesTuples.map(function (_, index) { return calculateCriticalThinkingScore(index); });
// Print results
quotesTuples.forEach(function (quote, index) {
    console.log("Quote: ".concat(quote.quote));
    console.log("Person: ".concat(quote.person));
    console.log("Ethos: ".concat(ethosScores[index].toFixed(2)));
    console.log("Pathos: ".concat(pathosScores[index].toFixed(2)));
    console.log("Logos: ".concat(logosScores[index].toFixed(2)));
    console.log("Appeal: ".concat(appealScores[index].toFixed(2)));
    console.log("Critical Thinking Score (CTS): ".concat(ctsScores[index].toFixed(2)));
    console.log('-----------------------------');
});
