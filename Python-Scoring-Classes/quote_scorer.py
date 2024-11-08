import sys
import json
import random
import pandas as pd
from EthosObject import EthosScore
from PathosObject import PathosScore
from LogosObject import LogosScore
from AppealScoreObject import AppealScore
from CriticalThinkingScoreObject import CriticalThinkingScoreObject

# Read input quotes from JSON file
quotes_file = sys.argv[1]
with open(quotes_file, 'r') as file:
    quotes = json.load(file)

# Convert quotes into a DataFrame
df = pd.DataFrame(quotes)
num_quotes = len(df)

# Generate random values for each subscore (Will be replaced with GPT Prompts from api/scoring/route.ts)

# Ethos:
df['Trust'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Influence'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Capability'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Accuracy'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Assurance'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Validity'] = [random.uniform(0, 1) for _ in range(num_quotes)]

# Pathos:
df['Joy'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Sadness'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Anticipation'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Surprise'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Rage'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Fear'] = [random.uniform(0, 1) for _ in range(num_quotes)]

# Logos
df['Premises'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Conclusions'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Soundness'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Validity_Logos'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Fallacies'] = [random.uniform(0, 1) for _ in range(num_quotes)]
df['Biases'] = [random.uniform(0, 1) for _ in range(num_quotes)]

# Calculate scores
df = EthosScore.apply_to_dataframe(df)
df = PathosScore.apply_to_dataframe(df)
df = LogosScore.apply_to_dataframe(df)
df = AppealScore.apply_to_dataframe(df)
df['CTR'] = CriticalThinkingScoreObject.calcCTR(df, col1='Trust', col2='Influence')
df['CDS'] = CriticalThinkingScoreObject.calcCDS(df, col1='Trust', col2='Influence')
df['CSS'] = CriticalThinkingScoreObject.calcCSS(df, colCDS='CDS', colCTR='CTR')
df['CRS'] = CriticalThinkingScoreObject.calcCRS(df, colCTR='CTR', colFallacies='Fallacies', colBiases='Biases', colWeights='Validity_Logos')
cts_obj = CriticalThinkingScoreObject()
df['CTS'] = cts_obj.calcCTS(df, colCTR='CTR', colCDS='CDS', colCSS='CSS', colCRS='CRS')

# Prepare output as JSON to return to Typescript file
output = df[['Ethos', 'Pathos', 'Logos', 'Appeal', 'CTS']].to_dict(orient='records')
print(json.dumps(output))
