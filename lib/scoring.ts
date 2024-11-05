import * as fs from 'fs';
import * as path from 'path';

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

// Define utility functions to calculate scores
const calculateEthosScore = (index: number): number => {
  const weights: Weights = {
    Trust: 0.25,
    Influence: 0.2,
    Capability: 0.2,
    Accuracy: 0.15,
    Assurance: 0.1,
    Validity: 0.1
  };
  return Object.keys(weights).reduce((sum, key) => sum + (data[key][index] as number) * weights[key], 0);
};

const calculatePathosScore = (index: number): number => {
  const weights: Weights = {
    Joy: 0.2,
    Sadness: 0.15,
    Anticipation: 0.2,
    Surprise: 0.15,
    Rage: 0.15,
    Fear: 0.15
  };
  return Object.keys(weights).reduce((sum, key) => sum + (data[key][index] as number) * weights[key], 0);
};

const calculateLogosScore = (index: number): number => {
  const weights: Weights = {
    Premises: 0.25,
    Conclusions: 0.25,
    Soundness: 0.2,
    Validity_Logos: 0.15,
    Fallacies: -0.075,
    Biases: -0.075
  };
  return Object.keys(weights).reduce((sum, key) => sum + (data[key][index] as number) * weights[key], 0);
};

const calculateAppealScore = (ethos: number, pathos: number, logos: number): number => {
  return 1 + (ethos + pathos + logos) / 30;
};

const calculateCriticalThinkingScore = (index: number): number => {
  const ctr = (data.Trust as number[])[index] / (data.Influence as number[])[index];
  const cds = (data.Trust as number[])[index] * (data.Influence as number[])[index];
  const css = ctr * cds;
  const crs = (-0.5 * ctr) * (((data.Fallacies as number[])[index] * (data.Validity_Logos as number[])[index]) - ((data.Biases as number[])[index] * (data.Validity_Logos as number[])[index]));
  const crsClamped = Math.min(Math.max(crs, 0), 1);
  const weights = {
    CTR: 0.25,
    CDS: 0.25,
    CSS: 0.25,
    CRS: 0.25
  };
  const totalWeight = weights.CTR + weights.CDS + weights.CSS + weights.CRS;
  const cts = (weights.CTR * ctr + weights.CDS * cds + weights.CSS * css + weights.CRS * crsClamped) / totalWeight;
  return cts;
};

// Calculate scores and store them
const ethosScores = quotesTuples.map((_, index) => calculateEthosScore(index));
const pathosScores = quotesTuples.map((_, index) => calculatePathosScore(index));
const logosScores = quotesTuples.map((_, index) => calculateLogosScore(index));
const appealScores = quotesTuples.map((_, index) => calculateAppealScore(ethosScores[index], pathosScores[index], logosScores[index]));
const ctsScores = quotesTuples.map((_, index) => calculateCriticalThinkingScore(index));

// Print results
quotesTuples.forEach((quote, index) => {
  console.log(`Quote: ${quote.quote}`);
  console.log(`Person: ${quote.person}`);
  console.log(`Ethos: ${ethosScores[index].toFixed(2)}`);
  console.log(`Pathos: ${pathosScores[index].toFixed(2)}`);
  console.log(`Logos: ${logosScores[index].toFixed(2)}`);
  console.log(`Appeal: ${appealScores[index].toFixed(2)}`);
  console.log(`Critical Thinking Score (CTS): ${ctsScores[index].toFixed(2)}`);
  console.log('-----------------------------');
});