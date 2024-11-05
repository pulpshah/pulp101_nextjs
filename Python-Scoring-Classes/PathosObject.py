from AppealScoreObject import AppealScore
import pandas as pd

class PathosScore:
    # Define the weight dictionaries for Pathos as class variables
    __base_pathos_weights = {"Joy": 0.2, "Sadness": 0.15, "Anticipation": 0.2, "Surprise": 0.15, "Rage": 0.15, "Fear": 0.15}
    __Q1_pathos_weights = {"Joy": 0.15, "Sadness": 0.1, "Anticipation": 0.25, "Surprise": 0.2, "Rage": 0.1, "Fear": 0.2}
    __R2_pathos_weights = {"Joy": 0.25, "Sadness": 0.15, "Anticipation": 0.2, "Surprise": 0.15, "Rage": 0.15, "Fear": 0.1}
    __R3_pathos_weights = {"Joy": 0.2, "Sadness": 0.1, "Anticipation": 0.2, "Surprise": 0.25, "Rage": 0.15, "Fear": 0.1}
    __F4_pathos_weights = {"Joy": 0.2, "Sadness": 0.15, "Anticipation": 0.2, "Surprise": 0.2, "Rage": 0.1, "Fear": 0.15}
    __I5_pathos_weights = {"Joy": -0.15, "Sadness": -0.1, "Anticipation": -0.2, "Surprise": -0.25, "Rage": -0.2, "Fear": -0.1}
    __C1_pathos_weights = {"Joy": 0.3, "Sadness": 0.2, "Anticipation": 0.25, "Surprise": 0.1, "Rage": 0.1, "Fear": 0.05}
    __C2_pathos_weights = {"Joy": 0.35, "Sadness": 0.2, "Anticipation": 0.3, "Surprise": 0.05, "Rage": 0.05, "Fear": 0.05}

    @staticmethod
    def calculate_weighted_sum(row, weights):
        """
        Calculate the weighted sum of the pathos subscores based on the given weight dictionary.
        """
        weighted_sum = sum(row[subscore] * weight for subscore, weight in weights.items())
        return weighted_sum

    @staticmethod
    def apply_to_dataframe(df, subscore_columns=None, weight_type='base'):
        """
        Applies the weighted sum calculation to the DataFrame.

        Parameters:
        - df: The DataFrame to which the function is applied.
        - subscore_columns: The columns that contain the Pathos subscores. Default is the Pathos subscore names.
        - weight_type: The weight set to use. Defaults to 'base'.

        Returns:
        - The modified DataFrame with a new column 'Pathos' containing the weighted sums.
        """
        if subscore_columns is None:
            subscore_columns = ["Joy", "Sadness", "Anticipation", "Surprise", "Rage", "Fear"]

        # Get the appropriate weights
        weights = PathosScore.get_weights(weight_type)

        # Apply the calculation to the DataFrame
        df['Pathos'] = df[subscore_columns].apply(lambda row: PathosScore.calculate_weighted_sum(row, weights), axis=1)

        return df

    # Weight manipulation methods
    @staticmethod
    def get_weights(weight_type):
        """
        Retrieve the weight dictionary for the specified weight type.
        """
        weight_map = {
            'base': PathosScore.__base_pathos_weights,
            'Q1': PathosScore.__Q1_pathos_weights,
            'R2': PathosScore.__R2_pathos_weights,
            'R3': PathosScore.__R3_pathos_weights,
            'F4': PathosScore.__F4_pathos_weights,
            'I5': PathosScore.__I5_pathos_weights,
            'C1': PathosScore.__C1_pathos_weights,
            'C2': PathosScore.__C2_pathos_weights
        }

        if weight_type in weight_map:
            return weight_map[weight_type]
        else:
            raise ValueError(f"Invalid weight type '{weight_type}' specified.")

    @staticmethod
    def add_weight(weight_type, subscore, weight_value):
        """
        Add a new subscore and its weight to the specified weight type.
        """
        weights = PathosScore.get_weights(weight_type)
        weights[subscore] = weight_value
        print(f"Added '{subscore}' with weight {weight_value} to {weight_type}.")

    @staticmethod
    def update_weight(weight_type, subscore, weight_value):
        """
        Update the weight of an existing subscore in the specified weight type.
        """
        weights = PathosScore.get_weights(weight_type)
        if subscore in weights:
            weights[subscore] = weight_value
            print(f"Updated '{subscore}' to weight {weight_value} in {weight_type}.")
        else:
            raise KeyError(f"Subscore '{subscore}' does not exist in {weight_type}.")

    @staticmethod
    def delete_weight(weight_type, subscore):
        """
        Delete a subscore and its weight from the specified weight type.
        """
        weights = PathosScore.get_weights(weight_type)
        if subscore in weights:
            del weights[subscore]
            print(f"Deleted '{subscore}' from {weight_type}.")
        else:
            raise KeyError(f"Subscore '{subscore}' does not exist in {weight_type}.")
