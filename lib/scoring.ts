import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

type Quote = {
  quote: string;
  person: string;
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

// Create a temporary JSON file to pass quotes to Python script
const quotesFilePath = path.join(__dirname, 'quotes.json');
fs.writeFileSync(quotesFilePath, JSON.stringify(quotesTuples));

// Run Python script to calculate scores
const pythonScriptPath = path.join(__dirname, '../Python-Scoring-Classes/quote_scorer.py');

try {
  const pythonOutput = execSync(`python3 ${pythonScriptPath} ${quotesFilePath}`, { encoding: 'utf-8' });  
  const scores = JSON.parse(pythonOutput);

  // Print scores with more detailed null checks and logging
  scores.forEach((score: any, index: number) => {
    console.log(`Quote: ${quotesTuples[index].quote}`);
    console.log(`Person: ${quotesTuples[index].person}`);
    console.log(`Ethos: ${score.Ethos?.toFixed(2) ?? 'N/A'}`);
    console.log(`Pathos: ${score.Pathos?.toFixed(2) ?? 'N/A'}`);
    console.log(`Logos: ${score.Logos?.toFixed(2) ?? 'N/A'}`);
    console.log(`Appeal: ${score.Appeal?.toFixed(2) ?? 'N/A'}`);
    console.log(`CTS: ${score.CTS?.toFixed(2) ?? 'N/A'}`);
    console.log('-----------------------------');
  });
} catch (error) {
  console.error('Error running Python script:', error);
} finally {
  // Clean up the temporary JSON file
  fs.unlinkSync(quotesFilePath);
}