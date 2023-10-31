from dataclasses import dataclass

@dataclass
class First:
    def __init__(self, name):
        self.name = name

    def sayName(self):
        return f"{self.name} says my name"

if __name__ == "__main__":
    first = First()
    # data_ingestion = DataIngestion()
    # ratings_data, items_data = data_ingestion.initiate_data_ingestion()

    # data_transformation = DataTransformation()
    # transformed_ratings, transformed_items, item_user_matrix = data_transformation.initiate_data_transformation(ratings_data, items_data)

    # modeltrainer=ModelTrainer()
    # modeltrainer.initiate_model_trainer(item_user_matrix)