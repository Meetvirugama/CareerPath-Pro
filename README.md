# 🎃 CareerPath Pro  

> Halloween-Themed Placement & Salary Prediction System  

A full-stack Machine Learning web application that predicts:

- ✅ Placement Status  
- 📊 Placement Probability (%)  
- 💰 Expected Salary (₹15K – ₹10L range)  

Built using **FastAPI + XGBoost + React** with a custom Halloween-themed UI.

---

## 👨‍💻 Developer

**Meet Virugama**  
🎓 DA-IICT  
💡 Interests: Frontend • Backend • Machine Learning • DSA  

---

# 🏗 Project Architecture

career-path-pro
│
├── Backend
│ ├── ml
│ │ ├── api.py
│ │ ├── preprocess.py
│ │ ├── train.py
│ │ ├── predict.py
│ │ └── requirements.txt
│ │
│ └── outputs
│
└── frontend
├── package.json
├── package-lock.json
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── robots.txt
│
└── src
├── App.js
├── index.js
├── reportWebVitals.js
│
└── components
├── StudentInputForm.jsx
├── ScarySelector.jsx
├── ScarySelector.css
├── TrickOrTreatButton.jsx
├── TrickOrTreatButton.css
├── HalloweenProgress.jsx
├── HalloweenProgress.css
├── HalloweenBats.jsx
├── HalloweenBats.css
├── Pumpkin.jsx
├── Pumpkin.css
├── HalloweenScene.jsx
├── HalloweenScene.css
└── HalloweenTheme.css

---

# 🧠 Machine Learning Pipeline

## 1️⃣ Placement Prediction (Classification)

- Model: **XGBoost Classifier**
- Metric: F1 Score
- Cross Validation: Stratified K-Fold
- Target: `Placement_Status`

## 2️⃣ Salary Prediction (Regression)

- Model: **XGBoost Regressor**
- Trained only on placed students
- Log transformation used:
  - `log1p()` during training
  - `expm1()` during prediction
- Salary Range: ₹15,000 – ₹10,00,000

---

## 📊 Features Used

### Numerical Features
- Age  
- CGPA  
- Internships  
- Projects  
- Coding_Skills  
- Communication_Skills  
- Aptitude_Test_Score  
- Soft_Skills_Rating  
- Certifications  
- Backlogs  

### Categorical Features
- Gender  
- Degree  
- Branch  

Preprocessing includes:
- StandardScaler for numeric features  
- OneHotEncoder for categorical features  

---

# 🚀 Backend (FastAPI)

### 🔧 Tech Stack
- FastAPI  
- XGBoost  
- Scikit-learn  
- Pandas  
- Joblib  

### ▶ Run Backend

```bash
cd Backend/ml
pip install -r requirements.txt
uvicorn api:app --reload
Backend runs at:
http://127.0.0.1:8000
API Endpoint
POST /predict
Example Response
{
  "Placement_Status": "Placed",
  "Placement_Chance_%": 83.24,
  "Predicted_Salary": 131824.34
}
🎨 Frontend (React + Halloween Theme)
🔧 Tech Stack
React
Custom CSS Animations
Component-Based Architecture
Interactive UI
🎭 Design Inspiration
ChatGPT (logic & structure assistance)
CodePen (UI ideas & animation concepts)
▶ Run Frontend
cd frontend
npm install
npm start
Frontend runs at:
http://localhost:3000
🌟 Key Features
🎃 Animated Halloween-themed UI
🦇 Background bats animation
📊 Circular placement probability gauge
💰 Realistic salary prediction
⚡ FastAPI + React integration
🧠 Machine Learning powered backend
🧩 Modular clean architecture
🛠 How It Works
User enters student details in React UI
Frontend sends POST request to FastAPI
Backend:
Applies preprocessing pipeline
Predicts placement
Predicts salary (if placed)
UI displays:
Placement status
Probability percentage
Estimated salary
📈 Model Performance
Optimized using F1 Score
5-Fold Stratified Cross Validation
Log-transformed regression for stable salary prediction
🔮 Future Improvements
Deployment (Render + Vercel)
Model Explainability (SHAP)
CI/CD with GitHub Actions
Salary band classification
Analytics dashboard
📌 What This Project Demonstrates
✔ Full-Stack ML Integration
✔ Production-Ready API
✔ Regression + Classification Modeling
✔ Clean Feature Engineering
✔ Strong ML & DSA Concepts
✔ Creative UI/UX Design
📜 License
This project is built for educational and portfolio purposes.
