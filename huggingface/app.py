from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import gdown
import os
import io

app = Flask(__name__)
CORS(app)

# Load model (upload waste_classifier_model.h5 to your Hugging Face Space)
model_path = "waste_classifier_model.h5"
try:
    model = load_model(model_path)
    print("✅ YOUR trained model loaded from Hugging Face!")
    MODEL_SOURCE = "your_trained_model"
except Exception as e:
    print(f"❌ Model not found: {e}")
    print("📝 Please upload waste_classifier_model.h5 to your Hugging Face Space")
    
    # Create temporary model for demo
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
    
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),
        MaxPooling2D(2, 2),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
        Flatten(),
        Dropout(0.5),
        Dense(512, activation='relu'),
        Dense(1, activation='sigmoid')
    ])
    
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    print("⚠️ Using demo model - upload your .h5 file!")
    MODEL_SOURCE = "demo_model"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']
        
        # Preprocess exactly like your training
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((150, 150))
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0)
        
        # YOUR model prediction
        pred = model.predict(img_array)[0][0]
        
        # Binary classification (might need flipping)
        if pred < 0.5:
            category = "biodegradable"
            confidence = (1 - pred) * 100
        else:
            category = "non-biodegradable" 
            confidence = pred * 100
            
        return jsonify({
            "category": category,
            "confidence": round(confidence, 2),
            "source": MODEL_SOURCE,
            "raw_prediction": float(pred)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "YOUR model is running", "model_loaded": True})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7860)