import joblib
import pandas as pd

MODEL_PATH = "ml/models/placement_model.pkl"
ENCODER_PATH = "ml/models/feature_encoders.pkl"
LABEL_ENCODER_PATH = "ml/models/label_encoder.pkl"

model = joblib.load(MODEL_PATH)
encoders = joblib.load(ENCODER_PATH)
label_encoder = joblib.load(LABEL_ENCODER_PATH)

def predict_placement(student_data: dict):
    df = pd.DataFrame([student_data])

    for col, encoder in encoders.items():
        df[col] = encoder.transform(df[col])

    pred = model.predict(df)
    return label_encoder.inverse_transform(pred)[0]

if __name__ == "__main__":
    sample_student = {
        "Age": 22,
        "Gender": "Male",
        "Degree": "B.Tech",
        "Branch": "ME",
        "CGPA": 7.8,
        "Internships": 2,
        "Projects": 4,
        "Coding_Skills": 7,
        "Communication_Skills": 6,
        "Aptitude_Test_Score": 85,
        "Soft_Skills_Rating": 7,
        "Certifications": 2,
        "Backlogs": 0
    }

    print("Prediction:", predict_placement(sample_student))

