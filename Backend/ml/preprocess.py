import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

NUMERIC_FEATURES = [
    'Age', 'CGPA', 'Internships', 'Projects',
    'Coding_Skills', 'Communication_Skills',
    'Aptitude_Test_Score', 'Soft_Skills_Rating',
    'Certifications', 'Backlogs'
]

CATEGORICAL_FEATURES = ['Gender', 'Degree', 'Branch']
FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES


def preprocess_data(csv_path):
    df = pd.read_csv(csv_path)

    if 'Student_ID' in df.columns:
        df.drop(columns=['Student_ID'], inplace=True)

    

    df['Placement_Status'] = df['Placement_Status'].map({
        'Not Placed': 0,
        'Placed': 1
    })

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), NUMERIC_FEATURES),
            ('cat', OneHotEncoder(handle_unknown='ignore'), CATEGORICAL_FEATURES)
        ]
    )

    return preprocessor, df

def add_salary_column(df):
    if 'Salary' not in df.columns:
        base_salary = (
            df['CGPA'] * 6000 +
            df['Coding_Skills'] * 10000 +
            df['Communication_Skills'] * 150 +
            df['Projects'] * 1000 +
            df['Internships'] * 12000 +
            np.random.normal(0, 15000, size=len(df))
        )

        df['Salary'] = base_salary
        df.loc[df['Placement_Status'] == 0, 'Salary'] = 0
        df['Salary'] = df['Salary'].clip(lower=0)

    return df
