import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';


interface Weights {
 [key: string]: number;
}


type Quote = {
 quote: string;
 person: string;
};


type Data = {
 Quote: string[];
 Person: string[];
 [key: string]: number[] | string[];
};


// Read quotes.txt file and parse it into a list of quotes and authors
const filePath = path.join(__dirname, '../public/quotes.txt');
const content = fs.readFileSync(filePath, 'utf-8');


const lines = content.split('\n');
const quotesTuples: Quote[] = [];
lines.forEach(line => {
 if (line.includes('~')) {
   const [quote, person] = line.split('~');
   quotesTuples.push({ quote: quote.trim(), person: person.trim() });
 }
});


const numQuotes = quotesTuples.length;


// Generate random values between 0 and 1 for each subscore
const generateRandomScores = (length: number) => Array.from({ length }, () => Math.random());


// Create a Data object to hold all the subscores
const data: Data = {
 Quote: quotesTuples.map(qt => qt.quote),
 Person: quotesTuples.map(qt => qt.person),


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
const callPythonScoringFunction = (functionName: string, ...args: string[]): number => {
 const pythonProcess = spawnSync('python3', ['./Python-Scoring-Classes/scoring.py', functionName, ...args], {
   encoding: 'utf-8'
 });


 if (pythonProcess.error) {
   console.error('Error calling Python script:', pythonProcess.error);
   return 0;
 }


 return parseFloat(pythonProcess.stdout.trim()) || 0;
};


// Calculate scores and store them
const ethosScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculateEthosScore', quote, person));
const pathosScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculatePathosScore', quote, person));
const logosScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculateLogosScore', quote, person));
const appealScores = quotesTuples.map((_, index) => {
 return 1 + (ethosScores[index] + pathosScores[index] + logosScores[index]) / 30;
});


// Calculate CTS score by calling Python script
const ctrScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculateCTR', quote, person));
const cdsScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculateCDS', quote, person));
const cssScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculateCSS', quote, person));
const crsScores = quotesTuples.map(({ quote, person }) => callPythonScoringFunction('calculateCRS', quote, person));
const ctsScores = quotesTuples.map((_, index) => callPythonScoringFunction('calculateCTS', ctrScores[index].toString(), cdsScores[index].toString(), cssScores[index].toString(), crsScores[index].toString()));


// Print results
quotesTuples.forEach((quote, index) => {
 console.log(`Quote: ${quote.quote}`);
 console.log(`Person: ${quote.person}`);
 console.log(`Ethos: ${ethosScores[index].toFixed(2)}`);
 console.log(`Pathos: ${pathosScores[index].toFixed(2)}`);
 console.log(`Logos: ${logosScores[index].toFixed(2)}`);
 console.log(`Appeal: ${appealScores[index].toFixed(2)}`);
 console.log(`CTS: ${ctsScores[index].toFixed(2)}`);
 console.log('-----------------------------');
});



