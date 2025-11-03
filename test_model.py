import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import os

# Load the model
model_path = "ml_model/waste_classifier_model.h5"
if os.path.exists(model_path):
    model = load_model(model_path)
    print("Model loaded successfully!")
    print(f"Model input shape: {model.input_shape}")
    print(f"Model output shape: {model.output_shape}")
    
    # Test with random images
    print("\nTesting model with random inputs:")
    for i in range(10):
        # Create random image
        random_img = np.random.random((1, 150, 150, 3))
        pred = model.predict(random_img, verbose=0)[0][0]
        category = "biodegradable" if pred < 0.5 else "non-biodegradable"
        print(f"Test {i+1}: {pred:.6f} -> {category}")
    
    # Check model weights
    print(f"\nModel summary:")
    print(f"Total parameters: {model.count_params()}")
    
    # Check if model is actually trained
    first_layer_weights = model.layers[0].get_weights()[0]
    print(f"First layer weight range: {first_layer_weights.min():.6f} to {first_layer_weights.max():.6f}")
    
else:
    print("Model file not found!")