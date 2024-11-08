import pandas as pd

class ScoreObject:
    def __init__(self):
        # Initialize the weights dictionary
        self.__weights = {}

    def addWeights(self, key: str, value: float):
        """Add a key-value pair to the weights dictionary."""
        if isinstance(key, str) and isinstance(value, (float, int)):
            self.weights[key] = float(value)
        else:
            raise ValueError("Key must be a string and value must be a float or int.")

    def getWeights(self, key: str):
        return self.weights.get(key, None)

    def updateWeights(self, key: str, value: float):
        """Update the weight of an existing key."""
        if key in self.weights:
            self.weights[key] = float(value)
        else:
            raise KeyError(f"Key '{key}' not found in weights.")

    def removeWeights(self, key: str):
        """Remove a key-value pair from the weights dictionary."""
        if key in self.weights:
            del self.weights[key]
        else:
            raise KeyError(f"Key '{key}' not found in weights.")





