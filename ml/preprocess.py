import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

def preprocess_data(csv_path):
    df = pd.read_csv(csv_path)

    df.drop(columns=["Student_ID"], inplace=True)

    y = df["Placement_Status"]
    X = df.drop(columns=["Placement_Status"])

    encoders = {}
    categorical_cols = ["Gender", "Degree", "Branch"]

    for col in categorical_cols:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col])
        encoders[col] = le

    target_encoder = LabelEncoder()
    y = target_encoder.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    return X_train, X_test, y_train, y_test, encoders, target_encoder, X.columns
