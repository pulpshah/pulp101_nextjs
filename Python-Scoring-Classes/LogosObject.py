from AppealScoreObject import AppealScore
import pandas as pd

class LogosScore:
    # Initialize weight dictionaries as class attributes since they do not need to be instance-specific
    __base_logos_weights = {"Premises": 0.25, "Conclusions": 0.25, "Soundness": 0.2, "Validity": 0.15, "Fallacies": -0.075, "Biases": -0.075}
    __Q1_logos_weights = {"Premises": 0.3, "Conclusions": 0.2, "Soundness": 0.25, "Validity": 0.1, "Fallacies": -0.075, "Biases": -0.075}
    __R2_logos_weights = {"Premises": 0.25, "Conclusions": 0.3, "Soundness": 0.25, "Validity": 0.15, "Fallacies": -0.075, "Biases": -0.075}
    __R3_logos_weights = {"Premises": 0.2, "Conclusions": 0.25, "Soundness": 0.3, "Validity": 0.15, "Fallacies": -0.1, "Biases": -0.1}
    __F4_logos_weights = {"Premises": 0.25, "Conclusions": 0.25, "Soundness": 0.2, "Validity": 0.15, "Fallacies": -0.075, "Biases": -0.075}
    __I5_logos_weights = {"Premises": -0.2, "Conclusions": -0.2, "Soundness": -0.25, "Validity": -0.15, "Fallacies": -0.1, "Biases": -0.1}
    __C1_logos_weights = {"Premises": 0.25, "Conclusions": 0.3, "Soundness": 0.25, "Validity": 0.1, "Fallacies": -0.05, "Biases": -0.05}
    __C2_logos_weights = {"Premises": 0.2, "Conclusions": 0.35, "Soundness": 0.25, "Validity": 0.1, "Fallacies": -0.05, "Biases": -0.05}

    @staticmethod
    def calculate_weighted_sum(row, weights):
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
        - subscore_columns: The columns that contain the Logos subscores. Default is the Logos subscore names.
        - weight_type: The weight set to use. Defaults to 'base'.

        Returns:
        - The modified DataFrame with a new column 'Logos' containing the weighted sums.
        """
        if subscore_columns is None:
            subscore_columns = ["Premises", "Conclusions", "Soundness", "Validity", "Fallacies", "Biases"]

        # Get the appropriate weights
        weights = LogosScore.get_weights(weight_type)

        # Apply the calculation to the DataFrame
        df['Logos'] = df[subscore_columns].apply(lambda row: LogosScore.calculate_weighted_sum(row, weights), axis=1)

        return df

    @staticmethod
    def get_weights(weight_type):
        if weight_type == 'base':
            return LogosScore.__base_logos_weights
        elif weight_type == 'Q1':
            return LogosScore.__Q1_logos_weights
        elif weight_type == 'R2':
            return LogosScore.__R2_logos_weights
        elif weight_type == 'R3':
            return LogosScore.__R3_logos_weights
        elif weight_type == 'F4':
            return LogosScore.__F4_logos_weights
        elif weight_type == 'I5':
            return LogosScore.__I5_logos_weights
        elif weight_type == 'C1':
            return LogosScore.__C1_logos_weights
        elif weight_type == 'C2':
            return LogosScore.__C2_logos_weights
        else:
            raise ValueError("Invalid weight type specified.")

    @staticmethod
    def add_weight(weight_type, subscore, weight_value):
        weights = LogosScore.get_weights(weight_type)
        weights[subscore] = weight_value
        print(f"Added '{subscore}' with weight {weight_value} to {weight_type}.")

    @staticmethod
    def update_weight(weight_type, subscore, weight_value):
        weights = LogosScore.get_weights(weight_type)
        if subscore in weights:
            weights[subscore] = weight_value
            print(f"Updated '{subscore}' to weight {weight_value} in {weight_type}.")
        else:
            raise KeyError(f"Subscore '{subscore}' does not exist in {weight_type}.")

    @staticmethod
    def delete_weight(weight_type, subscore):
        weights = LogosScore.get_weights(weight_type)
        if subscore in weights:
            del weights[subscore]
            print(f"Deleted '{subscore}' from {weight_type}.")
        else:
            raise KeyError(f"Subscore '{subscore}' does not exist in {weight_type}.")

