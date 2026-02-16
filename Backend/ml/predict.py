import joblib
import pandas as pd
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

placement_model = joblib.load(os.path.join(MODEL_DIR, "placement_model.pkl"))
salary_model = joblib.load(os.path.join(MODEL_DIR, "salary_model.pkl"))
preprocessor = joblib.load(os.path.join(MODEL_DIR, "preprocessor.pkl"))

def predict_student(student_data: dict):
    df = pd.DataFrame([student_data])
    X_processed = preprocessor.transform(df)

    placed = placement_model.predict(X_processed)[0]
    chance = placement_model.predict_proba(X_processed)[0][1]

    if placed == 1:
        salary_log = salary_model.predict(X_processed)[0]
        salary = np.expm1(salary_log)
    else:
        salary = 0

    return {
        "Placement_Status": "Placed" if placed == 1 else "Not Placed",
        "Placement_Chance_%": round(float(chance * 100), 2),
        "Predicted_Salary": round(float(salary), 2)
    }
