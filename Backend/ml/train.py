import os
import joblib
import numpy as np
import xgboost as xgb

from sklearn.metrics import f1_score
from sklearn.model_selection import StratifiedKFold, train_test_split, cross_val_score
from preprocess import preprocess_data, FEATURES, add_salary_column


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "college_student_placement_dataset.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)


preprocessor, df = preprocess_data(DATA_PATH)
df = add_salary_column(df)

X = df[FEATURES]
y = df["Placement_Status"]

# 1. Split data BEFORE preprocessing to prevent data leakage
X_train_raw, X_test_raw, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 2. Add noise ONLY to the training set to prevent leakage into the test set
np.random.seed(42)
noise_mask = np.random.rand(len(y_train)) < 0.12
y_train.iloc[noise_mask] = 1 - y_train.iloc[noise_mask]

# 3. Fit preprocessor on training data only
X_train = preprocessor.fit_transform(X_train_raw)
X_test = preprocessor.transform(X_test_raw)

placement_model = xgb.XGBClassifier(
    n_estimators=150,
    max_depth=3,
    learning_rate=0.1,
    subsample=0.7,
    colsample_bytree=0.7,
    reg_lambda=6,
    reg_alpha=3,
    min_child_weight=6,
    eval_metric="logloss",
    random_state=42
)

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

placement_cv_f1 = cross_val_score(
    placement_model,
    X_train,
    y_train,
    cv=skf,
    scoring="f1"
)

placement_model.fit(X_train, y_train)

y_pred = placement_model.predict(X_test)
f1 = f1_score(y_test, y_pred)

joblib.dump(placement_model, os.path.join(MODEL_DIR, "placement_model.pkl"))
joblib.dump(preprocessor, os.path.join(MODEL_DIR, "preprocessor.pkl"))

# Train salary model ONLY on the training set
train_df = X_train_raw.copy()
train_df["Placement_Status"] = y_train
train_df["Salary"] = df.loc[train_df.index, "Salary"]

salary_df = train_df[train_df["Placement_Status"] == 1]

X_salary = salary_df[FEATURES]
y_salary = np.log1p(salary_df["Salary"])

X_salary = preprocessor.transform(X_salary)

salary_model = xgb.XGBRegressor(
    n_estimators=300,
    max_depth=4,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    objective="reg:squarederror",
    random_state=42
)

salary_model.fit(X_salary, y_salary)

joblib.dump(salary_model, os.path.join(MODEL_DIR, "salary_model.pkl"))

print("✅ Training complete")
print(f"Placement F1: {f1:.4f}")
print(f"Mean CV F1: {placement_cv_f1.mean():.4f}")
