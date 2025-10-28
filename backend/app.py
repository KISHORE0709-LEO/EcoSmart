from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import os
import urllib.request

app = Flask(__name__)
CORS(app)

# Download real model if not exists or if it's the small dummy one
if not os.path.exists("waste_classifier_model.h5") or os.path.getsize("waste_classifier_model.h5") < 100000000:
    print("Downloading REAL trained model (228MB)...")
    # Your real 228MB model from Google Drive
    model_url = "https://drive.google.com/uc?id=1T4smYplUdpWZZksrHf0SW8ltkfK2NLqI&export=download"
    try:
        urllib.request.urlretrieve(model_url, "waste_classifier_model.h5")
        print("Real model downloaded successfully!")
    except Exception as e:
        print(f"Failed to download model: {e}")
        print("Using fallback model...")

# Load trained model
model = load_model("waste_classifier_model.h5")
classes = ['Biodegradable', 'Non-Biodegradable']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']
        
        # Preprocess image
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((150, 150))
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0)
        
        # Make prediction
        pred = model.predict(img_array)[0]
        idx = np.argmax(pred)
        confidence = round(float(np.max(pred) * 100), 2)
        
        return jsonify({
            "category": classes[idx].lower(),
            "confidence": confidence
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)