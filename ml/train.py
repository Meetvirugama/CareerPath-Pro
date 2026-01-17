import os
import joblib
import xgboost as xgb
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score , confusion_matrix , ConfusionMatrixDisplay
from preprocess import preprocess_data

DATA_PATH = "ml/data/college_student_placement_dataset.csv"
MODEL_DIR = "ml/models"
OUTPUT_DIR = "outputs"

os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

X_train, X_test, y_train, y_test, encoders, target_encoder, feature_names = preprocess_data(DATA_PATH)

model = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=5,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

with open(f"{OUTPUT_DIR}/training_metrics.txt", "w") as f:
    f.write(f"Accuracy: {acc:.4f}\n")
    f.write(f"Precision: {prec:.4f}\n")
    f.write(f"Recall: {rec:.4f}\n")
    f.write(f"F1 Score: {f1:.4f}\n")


joblib.dump(model, f"{MODEL_DIR}/placement_model.pkl")
joblib.dump(encoders, f"{MODEL_DIR}/feature_encoders.pkl")
joblib.dump(target_encoder, f"{MODEL_DIR}/label_encoder.pkl")


xgb.plot_importance(model, max_num_features=10)
plt.tight_layout()
plt.savefig(f"{OUTPUT_DIR}/feature_importance.png")
plt.close()

cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(cm)
disp.plot()
plt.savefig("outputs/confusion_matrix.png")
plt.close()

print("✅ Model trained successfully")
print(f"Accuracy: {acc:.4f}")
print(f"Precision: {prec:.4f}")
print(f"Recall: {rec:.4f}")
print(f"F1 Score: {f1:.4f}")
