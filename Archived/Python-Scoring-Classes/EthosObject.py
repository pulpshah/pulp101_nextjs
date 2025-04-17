from AppealScoreObject import AppealScore
import pandas as pd

class EthosScore:
    # Define the weight dictionaries for ethos as class attributes
    __base_ethos_weights = {"Trust": 0.25, "Influence": 0.2, "Capability": 0.2, "Accuracy": 0.15, "Assurance": 0.1, "Validity": 0.1}
    __Q1_ethos_weights = {"Trust": 0.3, "Influence": 0.25, "Capability": 0.15, "Accuracy": 0.15, "Assurance": 0.1, "Validity": 0.05}
    __R2_ethos_weights = {"Trust": 0.25, "Influence": 0.25, "Capability": 0.2, "Accuracy": 0.15, "Assurance": 0.1, "Validity": 0.05}
    __R3_ethos_weights = {"Trust": 0.3, "Influence": 0.25, "Capability": 0.2, "Accuracy": 0.1, "Assurance": 0.1, "Validity": 0.05}
    __F4_ethos_weights = {"Trust": 0.25, "Influence": 0.2, "Capability": 0.2, "Accuracy": 0.15, "Assurance": 0.1, "Validity": 0.1}
    __I5_ethos_weights = {"Trust": -0.3, "Influence": -0.25, "Capability": -0.2, "Accuracy": -0.15, "Assurance": -0.1, "Validity": -0.1}
    __C1_ethos_weights = {"Trust": 0.3, "Influence": 0.25, "Capability": 0.2, "Accuracy": 0.15, "Assurance": 0.1, "Validity": 0.05}
    __C2_ethos_weights = {"Trust": 0.35, "Influence": 0.3, "Capability": 0.2, "Accuracy": 0.1, "Assurance": 0.1, "Validity": 0.05}

    @staticmethod
    def calculate_weighted_sum(row, weights):
        """
        Calculate the weighted sum of the ethos subscores based on the given weight dictionary.
        """
        weighted_sum = 0
        for subscore, weight in weights.items():
            weighted_sum += row[subscore] * weight
        return weighted_sum

    @staticmethod
    def apply_to_dataframe(df, subscore_columns=None, weight_type='base'):
        """
        Applies the weighted sum calculation to the DataFrame.

        Parameters:
        - df: The DataFrame to which the function is applied.
        - subscore_columns: The columns that contain the Ethos subscores.
        - weight_type: The weight set to use. Defaults to 'base'.

        Returns:
        - The modified DataFrame with a new column 'Ethos' containing the weighted sums.
        """
        if subscore_columns is None:
            subscore_columns = ["Trust", "Influence", "Capability", "Accuracy", "Assurance", "Validity"]

        # Get the appropriate weights
        weights = EthosScore.get_weights(weight_type)

        # Apply the calculation to the DataFrame
        df['Ethos'] = df[subscore_columns].apply(lambda row: EthosScore.calculate_weighted_sum(row, weights), axis=1)

        return df

    # Weight manipulation methods
    @staticmethod
    def get_weights(weight_type):
        """
        Retrieve the weight dictionary for the specified weight type.
        """
        if weight_type == 'base':
            return EthosScore.__base_ethos_weights
        elif weight_type == 'Q1':
            return EthosScore.__Q1_ethos_weights
        elif weight_type == 'R2':
            return EthosScore.__R2_ethos_weights
        elif weight_type == 'R3':
            return EthosScore.__R3_ethos_weights
        elif weight_type == 'F4':
            return EthosScore.__F4_ethos_weights
        elif weight_type == 'I5':
            return EthosScore.__I5_ethos_weights
        elif weight_type == 'C1':
            return EthosScore.__C1_ethos_weights
        elif weight_type == 'C2':
            return EthosScore.__C2_ethos_weights
        else:
            raise ValueError("Invalid weight type specified.")

    @staticmethod
    def add_weight(weight_type, subscore, weight_value):
        """
        Add a new subscore and its weight to the specified weight type.
        """
        weights = EthosScore.get_weights(weight_type)
        weights[subscore] = weight_value
        print(f"Added '{subscore}' with weight {weight_value} to {weight_type}.")

    @staticmethod
    def update_weight(weight_type, subscore, weight_value):
        """
        Update the weight of an existing subscore in the specified weight type.
        """
        weights = EthosScore.get_weights(weight_type)
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
        weights = EthosScore.get_weights(weight_type)
        if subscore in weights:
            del weights[subscore]
            print(f"Deleted '{subscore}' from {weight_type}.")
        else:
            raise KeyError(f"Subscore '{subscore}' does not exist in {weight_type}.")
