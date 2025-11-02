from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os

app = Flask(__name__)
CORS(app)

# Simple demo without TensorFlow for now
print("🚀 EcoSmart Backend Starting...")
MODEL_SOURCE = "demo_backend"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Simple demo classification
        categories = ['biodegradable', 'non-biodegradable']
        category = random.choice(categories)
        confidence = random.uniform(75, 95)
        
        return jsonify({
            "category": category,
            "confidence": round(confidence, 2),
            "source": MODEL_SOURCE,
            "object_name": "Demo item",
            "reason": "Demo classification from Hugging Face backend"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "EcoSmart backend is running", "model_loaded": True, "source": MODEL_SOURCE})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7860)