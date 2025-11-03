from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import os
import urllib.request
import random

app = Flask(__name__)
CORS(app)

# Load YOUR local trained model
try:
    model_path = "../ml_model/waste_classifier_model.h5"
    
    if os.path.exists(model_path):
        print(f"Loading YOUR trained model from: {model_path}")
        model = load_model(model_path)
        print("YOUR trained model loaded successfully!")
        print(f"Model input shape: {model.input_shape}")
        print(f"Model output shape: {model.output_shape}")
    else:
        print(f"Model not found at: {model_path}")
        raise FileNotFoundError(f"Model file not found: {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Using fallback classification.")
    model = None

# Classes as trained: B=Biodegradable (index 0), N=Non-Biodegradable (index 1)
classes = ['biodegradable', 'non-biodegradable']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        print(f"Processing file: {file.filename}")
        print(f"Using YOUR trained model for: {file.filename}")
        
        if model is None:
            return jsonify({"error": "YOUR model not loaded"}), 500
        
        # Preprocess image exactly as your model expects
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((150, 150))  # Your model's input size
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0)
        
        print(f"Image preprocessed: {img_array.shape}")
        
        # Get prediction from YOUR trained model
        pred = model.predict(img_array, verbose=0)[0]
        print(f"Raw model output: {pred}")
        
        # Model is biased, use intelligent classification based on image analysis
        import random
        
        # USE YOUR TRAINED MODEL PROPERLY
        prediction_value = float(pred[0])
        
        print(f"Raw model prediction: {prediction_value:.4f}")
        
        # Check what the training data class indices were
        # From your training: class_indices should show which folder maps to which index
        # Typically: B (biodegradable) = 0, N (non-biodegradable) = 1
        
        # CORRECT CLASS MAPPING - Model trained with B=biodegradable, N=non-biodegradable
        if prediction_value < 0.5:
            # Model predicts class 0 = biodegradable
            category = "biodegradable"
            confidence = (1 - prediction_value) * 100
            object_name = "Organic waste"
            detailed_reason = f"CNN model classified this as biodegradable with {confidence:.1f}% confidence. The neural network detected patterns typical of organic materials that decompose naturally."
        else:
            # Model predicts class 1 = non-biodegradable
            category = "non-biodegradable"
            confidence = prediction_value * 100
            object_name = "Synthetic material"
            detailed_reason = f"CNN model classified this as non-biodegradable with {confidence:.1f}% confidence. The neural network detected patterns typical of synthetic materials that resist decomposition."
        
        # Classes have been flipped above to match training data
        # Training data: B folder = index 1, N folder = index 0
        
        reason = f"Identified as: {object_name}. {detailed_reason}"
        
        print(f"MODEL PREDICTION: {prediction_value:.4f} -> {category} ({confidence:.1f}%)")
        print(f"Explanation: {detailed_reason}")
        
        result = {
            "category": category,
            "confidence": round(confidence, 2),
            "object_name": object_name,
            "reason": reason,
            "source": "real_model",
            "model_prediction": float(prediction_value)
        }
        
        print(f"FINAL RESULT: {result}")
        print(f"Category: {result['category']}, Confidence: {result['confidence']}%")
        return jsonify(result)
    
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ML Backend is running", "model_loaded": model is not None})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting ML backend on port {port}")
    print(f"Classification classes: {classes}")
    app.run(host='0.0.0.0', port=port, debug=True)