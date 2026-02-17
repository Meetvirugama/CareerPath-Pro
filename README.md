# 🎯 CareerPath Pro

A full-stack Machine Learning web application that predicts student placement probability and expected salary using academic and skill-based features.

Built with **FastAPI (Backend)**, **XGBoost (ML Models)**, and **React (Frontend)**.

---

## 🌐 Live Deployment

- 🚀 Frontend (Vercel): https://your-vercel-link.vercel.app  
- 🔗 Backend (Render): https://careerpath-pro-a2th.onrender.com  

---

## 👨‍💻 Developer

**Meet Virugama**  
🎓 DA-IICT  
💡 Interests: Machine Learning • Backend Systems • Frontend Development • DSA  

---

# 🖼️ Application Preview

## 🏠 Home Screen

<img width="1457" alt="Home Screen" src="https://github.com/user-attachments/assets/9aa4f3d0-02ab-437f-a968-23b7e8b378db" />

---

## ⏳ Loader

<img width="1457" alt="Loader" src="https://github.com/user-attachments/assets/df248621-34ae-459a-a5f8-b93ca9198112" />

---

## 📊 Prediction Result

<img width="1457" alt="Prediction Result" src="https://github.com/user-attachments/assets/21d3beea-6eb9-43ef-b28e-cea951f93c40" />

---

# 🚀 Project Overview

CareerPath Pro predicts:

- ✅ Placement Status (Placed / Not Placed)  
- 📊 Placement Probability (%)  
- 💰 Expected Salary  

The system uses two separate machine learning models:

1. 🧠 Classification Model → Predicts placement  
2. 📈 Regression Model → Predicts salary (only if placed)

---

# 🏗️ Project Architecture

```
CareerPath-Pro
│
├── Backend
│   ├── main.py
│   ├── requirements.txt
│   ├── runtime.txt
│   │
│   └── ml
│       ├── predict.py
│       ├── preprocess.py
│       ├── train.py
│       └── models
│           ├── placement_model.pkl
│           ├── salary_model.pkl
│           └── preprocessor.pkl
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

### Example Request

```json
{
  "Age": 22,
  "Gender": "Male",
  "Degree": "B.Tech",
  "Branch": "Computer Science",
  "CGPA": 8.5,
  "Internships": 2,
  "Projects": 3,
  "Coding_Skills": 8,
  "Communication_Skills": 75,
  "Aptitude_Test_Score": 80,
  "Soft_Skills_Rating": 7,
  "Certifications": 2,
  "Backlogs": 0
}
```

### Example Response

```json
{
  "Placement_Status": "Placed",
  "Placement_Chance_%": 83.24,
  "Predicted_Salary": 131824.34
}
```

---

# 🖥️ Local Backend Setup

```bash
cd Backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger docs available at:

```
http://127.0.0.1:8000/docs
```

---

# 🎨 Local Frontend Setup

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

# ☁️ Deployment

### Backend
- Hosted on Render  
- Python 3.11  
- FastAPI + Uvicorn  

### Frontend
- Hosted on Vercel  
- Environment variable:

```
REACT_APP_API_URL=https://careerpath-pro-a2th.onrender.com
```

---

# 🌟 Key Features

- 🔁 Full-stack ML integration  
- 🧠 Separate classification & regression pipelines  
- 📊 Probability-based placement prediction  
- 💰 Realistic salary modeling  
- ⚡ FastAPI + React integration  
- 🧩 Modular clean architecture  
- 🎨 Interactive animated UI  

---

# 🔮 Future Improvements

- 📊 Model explainability (SHAP)  
- 🔁 CI/CD with GitHub Actions  
- 📈 Analytics dashboard  
- 📦 Model versioning  
- 🌍 Custom domain  

---

# 📌 What This Project Demonstrates

✔ Strong ML fundamentals  
✔ Production-style backend API design  
✔ Clean feature engineering  
✔ End-to-end ML deployment  
✔ Frontend-backend integration  
✔ Structured software architecture  

---

# 🙏 Acknowledgements

Developed as part of:

**DA-IICT MSTC Club – WoC (Winter of Code)**  
Machine Learning Program  

### Mentors
- Aum Parmar  
- Harsh Shah  

---

# 🏫 Institution

Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)

---

## 📄 License

Built for educational and portfolio purposes.
