from ScoreObject import ScoreObject
import pandas as pd

class AppealScore(ScoreObject):
    # No need for an __init__ method since we're using static methods

    @staticmethod
    def calculate_appeal(row, ethos_col='Ethos', pathos_col='Pathos', logos_col='Logos'):
        """
        Calculate the appeal score using the formula:

        Appeal = 1 + (Ethos + Pathos + Logos) / 30

        This method is intended to be applied row-wise using df.apply().

        Parameters:
        - row: A row from the DataFrame (passed automatically by apply).
        - ethos_col: Column name for the ethos score (default is 'Ethos').
        - pathos_col: Column name for the pathos score (default is 'Pathos').
        - logos_col: Column name for the logos score (default is 'Logos').

        Returns:
        - Calculated appeal score for the row.
        """
        ethos = row[ethos_col]
        pathos = row[pathos_col]
        logos = row[logos_col]
        return 1 + (ethos + pathos + logos) / 30

    @staticmethod
    def apply_to_dataframe(df, ethos_col='Ethos', pathos_col='Pathos', logos_col='Logos'):
        """
        Apply the appeal calculation to the entire DataFrame and add a new column 'Appeal' with the results.

        Parameters:
        - df: The DataFrame to which the calculation will be applied.
        - ethos_col: Column name for the ethos score (default is 'Ethos').
        - pathos_col: Column name for the pathos score (default is 'Pathos').
        - logos_col: Column name for the logos score (default is 'Logos').

        Returns:
        - The modified DataFrame with a new 'Appeal' column containing the calculated appeal scores.
        """
        df['Appeal'] = df.apply(lambda row: AppealScore.calculate_appeal(row, ethos_col, pathos_col, logos_col), axis=1)
        return df

