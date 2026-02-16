# 🎯 CareerPath Pro

A full-stack Machine Learning web application that predicts student placement probability and expected salary using academic and skill-based features.

Built with **FastAPI (Backend)**, **XGBoost (ML Models)**, and **React (Frontend)**.

---

## 👨‍💻 Developer

**Meet Virugama**  
🎓 DA-IICT  
💡 Interests: Machine Learning • Backend Systems • Frontend Development • DSA  

---

# 🖼️ Application Preview

## 🏠 Home Screen

<img width="1457" height="770" alt="Screenshot 2026-02-16 at 10 11 31 PM" src="https://github.com/user-attachments/assets/9aa4f3d0-02ab-437f-a968-23b7e8b378db" />

---

## Loader

<img width="1457" height="770" alt="Screenshot 2026-02-16 at 10 11 42 PM" src="https://github.com/user-attachments/assets/df248621-34ae-459a-a5f8-b93ca9198112" />

---

## 📊 Prediction Result

<img width="1457" height="770" alt="Screenshot 2026-02-16 at 10 11 25 PM" src="https://github.com/user-attachments/assets/21d3beea-6eb9-43ef-b28e-cea951f93c40" />

---

# 🚀 Project Overview

CareerPath Pro predicts:

- ✅ Placement Status (Placed / Not Placed)
- 📊 Placement Probability (%)
- 💰 Expected Salary (₹15,000 – ₹10,00,000)

The system uses two separate machine learning models:

1. 🧠 Classification Model → Predicts placement  
2. 📈 Regression Model → Predicts salary (only if placed)

---

# 🏗️ Project Architecture

```
career-path-pro
│
├── Backend
│   ├── ml
│   │   ├── api.py
│   │   ├── preprocess.py
│   │   ├── train.py
│   │   ├── predict.py
│   │   └── requirements.txt
│   │
│   └── outputs
│
└── frontend
    ├── package.json
    ├── public
    └── src
        ├── App.js
        ├── index.js
        └── components
            ├── StudentInputForm.jsx
            ├── ScarySelector.jsx
            ├── TrickOrTreatButton.jsx
            ├── HalloweenProgress.jsx
            ├── HalloweenBats.jsx
            ├── Pumpkin.jsx
            └── CSS files
```

---

# 🧠 Machine Learning Pipeline

## 1️⃣ Data Preprocessing
- StandardScaler applied to numerical features  
- OneHotEncoder applied to categorical features  
- Stratified train-test split  

---

## 2️⃣ Placement Prediction (Classification)

- Model: **XGBoost Classifier**
- Metric: **F1 Score**
- Validation: **Stratified 5-Fold Cross Validation**
- Target: `Placement_Status`

---

## 3️⃣ Salary Prediction (Regression)

- Model: **XGBoost Regressor**
- Trained only on placed students
- Log transformation:
  - `log1p()` during training
  - `expm1()` during prediction
- Handles salary skewness for stable predictions

---

# 📡 API Endpoint

### 🔹 POST `/predict`

### Example Response

```json
{
  "Placement_Status": "Placed",
  "Placement_Chance_%": 83.24,
  "Predicted_Salary": 131824.34
}
```

---

# 🖥️ Backend Setup

```bash
cd Backend/ml
pip install -r requirements.txt
uvicorn api:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🌟 Key Features

- 🔁 Full-stack ML integration
- 🧠 Separate classification & regression pipelines
- 📊 Probability-based placement prediction
- 💰 Realistic salary modeling
- ⚡ FastAPI + React integration
- 🧩 Modular clean architecture
- 🎨 Interactive UI design

---

# 🔮 Future Improvements

- 📊 Model explainability (SHAP)
- 🌍 Cloud deployment (Render / Vercel)
- 🔁 CI/CD with GitHub Actions
- 📈 Analytics dashboard
- 📦 Model versioning

---

# 📌 What This Project Demonstrates

✔ Strong ML fundamentals  
✔ Production-style backend API design  
✔ Clean feature engineering  
✔ End-to-end ML deployment  
✔ Frontend-backend integration  
✔ Structured software architecture  

---

## 📄 License

Built for educational and portfolio purposes.
