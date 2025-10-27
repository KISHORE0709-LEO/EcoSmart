# EcoSmart ML Implementation Guide

## Step 1: Get the Dataset
Download the dataset from: https://www.kaggle.com/datasets/rayhanzamzamy/non-and-biodegradable-waste-dataset

Create folder structure:
```
dataset/
 ├── train/
 │    ├── Biodegradable/
 │    └── Non-Biodegradable/
 └── validation/
      ├── Biodegradable/
      └── Non-Biodegradable/
```

## Step 2: Train the Model
```bash
cd ml_model
pip install tensorflow keras pillow numpy
python train_model.py
```

## Step 3: Setup Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Step 4: Frontend Integration
The frontend is already updated to use the real ML API at `http://127.0.0.1:5000/predict`

## Usage
1. Download and organize the dataset
2. Train the model using `train_model.py`
3. Start the Flask backend
4. Upload images in the frontend for real ML predictions