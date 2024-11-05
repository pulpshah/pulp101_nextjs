from ScoreObject import ScoreObject
import pandas as pd

class CriticalThinkingScoreObject(ScoreObject):
    def __init__(self):
        # Initialize the parent class (ScoreObject)
        super().__init__()

        #Need to figure out default weights
        self.cts_weights = { # LINE CHANGED
            "CTR": 0.25,
            "CDS": 0.25,
            "CSS": 0.25,
            "CRS": 0.25
        }


    def calculateCriticalThinkingScore(self):
        """Calculate a critical thinking score by summing the weights."""
        return sum(self._ScoreObject__weights.values())
    
    @staticmethod
    def calcCTR(df: pd.DataFrame, col1: str, col2: str) -> pd.Series:
        """
        Calculate the CTR (Critical Thinking Rate) by dividing values in col1 by col2.
        This method can be applied to a dataframe using `.apply()`.
        
        :param df: The pandas DataFrame containing the data.
        :param col1: The name of the numerator column.
        :param col2: The name of the denominator column.
        :return: A pandas Series containing the CTR (division of col1 by col2).
        """
        if col1 not in df.columns or col2 not in df.columns:
            raise KeyError("Both columns must exist in the DataFrame")
        
        # Using .apply to handle potential divide-by-zero errors
        return df.apply(lambda row: row[col1] / row[col2] if row[col2] != 0 else float('nan'), axis=1)

    @staticmethod
    def calcCDS(df: pd.DataFrame, col1: str, col2: str) -> pd.Series:
        """
        Calculate the CDS (Cognitive Dependability Score) by multiplying values in col1 by col2.
        This method can be applied to a dataframe using `.apply()`.
        
        :param df: The pandas DataFrame containing the data.
        :param col1: The name of the first column.
        :param col2: The name of the second column.
        :return: A pandas Series containing the CDS (multiplication of col1 by col2).
        """
        if col1 not in df.columns or col2 not in df.columns:
            raise KeyError("Both columns must exist in the DataFrame")
        
        # Using .apply to multiply values element-wise
        return df.apply(lambda row: row[col1] * row[col2], axis=1)


    @staticmethod
    def calcCSS(df: pd.DataFrame, colCDS: str, colCTR: str) -> pd.Series:
        """
        Calculate the CSS (Cognitive Strength Score) by multiplying the CDS and CTR columns.
        This method assumes that CDS and CTR columns are already calculated.
        
        :param df: The pandas DataFrame containing the data.
        :param colCDS: The name of the column representing the CDS score.
        :param colCTR: The name of the column representing the CTR score.
        :return: A pandas Series containing the CSS (multiplication of CDS and CTR).
        """
        if colCDS not in df.columns or colCTR not in df.columns:
            raise KeyError("Both columns (CDS and CTR) must exist in the DataFrame")
        
        # Multiply the CDS and CTR values element-wise
        return df.apply(lambda row: row[colCDS] * row[colCTR], axis=1)

    @staticmethod
    ##Weights need to be set for fallacies and biases
    def calcCRS(df: pd.DataFrame, colCTR: str, colFallacies: str, colBiases: str, colWeights: str) -> pd.Series:
        """
        Calculate CRS (Critical Reasoning Score) using the formula:
        
        CRS = (-0.5 * CTR) * ((Sum of Fallacies * Weights) - (Sum of Biases * Weights)) + [0,1]

        :param df: DataFrame containing the data.
        :param colCTR: Column name for CTR values.
        :param colFallacies: Column name for sum of fallacies.
        :param colBiases: Column name for sum of biases.
        :param colWeights: Column name for weights.
        :return: Series containing the CRS values.
        """
        if colCTR not in df.columns or colFallacies not in df.columns or colBiases not in df.columns or colWeights not in df.columns:
            raise KeyError("All specified columns must exist in the DataFrame")

        def calculate_row(row):
            ctr = row[colCTR]
            fallacies = row[colFallacies]
            biases = row[colBiases]
            weights = row[colWeights]

            if pd.isna(ctr) or pd.isna(fallacies) or pd.isna(biases) or pd.isna(weights):
                return float('nan')

            crs_value = (-0.5 * ctr) * ((fallacies * weights) - (biases * weights))
            # Clamping result to [0, 1] range
            return min(max(crs_value, 0), 1)

        return df.apply(calculate_row, axis=1)

    # @staticmethod (LINE CHANGED: Should be an instance method)
    def calcCTS(self, df: pd.DataFrame, colCTR: str, colCDS: str, colCSS: str, colCRS: str) -> pd.Series:
        """
        Calculate CTS (Critical Thinking Score) as a weighted average of CTR, CDS, CSS, and CRS.

        :param df: DataFrame containing the data.
        :param colCTR: Column name for CTR values.
        :param colCDS: Column name for CDS values.
        :param colCSS: Column name for CSS values.
        :param colCRS: Column name for CRS values.
        :param weights: A dictionary of weights for 'CTR', 'CDS', 'CSS', and 'CRS'.
        :return: Series containing the weighted CTS values.
        """
        required_cols = [colCTR, colCDS, colCSS, colCRS]
        if not all(col in df.columns for col in required_cols):
            raise KeyError("All specified columns (CTR, CDS, CSS, CRS) must exist in the DataFrame")
        
        # Calculate the weighted average
        def calculate_row(row):
            ctr = row[colCTR]
            cds = row[colCDS]
            css = row[colCSS]
            crs = row[colCRS]

            # Fetch the weights from the dictionary
            w_ctr = self.cts_weights['CTR']
            w_cds = self.cts_weights['CDS']
            w_css = self.cts_weights['CSS']
            w_crs = self.cts_weights['CRS']

            # Calculate the weighted average
            total_weight = w_ctr + w_cds + w_css + w_crs
            weighted_avg = (w_ctr * ctr + w_cds * cds + w_css * css + w_crs * crs) / total_weight

            return weighted_avg

        return df.apply(calculate_row, axis=1)
