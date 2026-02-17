from fastapi import FastAPI
from pydantic import BaseModel, Field
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware
from ml.predict import predict_student

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with Vercel URL
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenderEnum(str, Enum):
    Male = "Male"
    Female = "Female"
    Other = "Other"

class StudentInput(BaseModel):
    Age: int = Field(..., gt=15, lt=50)
    Gender: GenderEnum
    Degree: str
    Branch: str
    CGPA: float = Field(..., ge=0, le=10)
    Internships: int = Field(..., ge=0)
    Projects: int = Field(..., ge=0)
    Coding_Skills: int = Field(..., ge=0, le=10)
    Communication_Skills: int = Field(..., ge=0, le=100)
    Aptitude_Test_Score: int = Field(..., ge=0, le=100)
    Soft_Skills_Rating: int = Field(..., ge=0, le=10)
    Certifications: int = Field(..., ge=0)
    Backlogs: int = Field(..., ge=0)

@app.get("/")
def home():
    return {"message": "CareerPath Pro API running on Render"}

@app.post("/predict")
async def predict(data: StudentInput):
    result = predict_student(data.model_dump())
    return result
