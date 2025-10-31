from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import os

# Load model
model = load_model("waste_classifier_model.h5")
print("Model loaded!")

# Test with different random images to see pattern
print("\n=== TESTING MODEL BEHAVIOR ===")
for i in range(10):
    # Create random test image
    test_img = np.random.random((1, 150, 150, 3))
    pred = model.predict(test_img, verbose=0)
    idx = np.argmax(pred)
    confidence = pred[0][idx]
    
    print(f"Test {i+1}: Raw={pred[0]}, Index={idx}, Conf={confidence:.3f}")

print("\n=== MODEL SUMMARY ===")
print(f"Input shape: {model.input_shape}")
print(f"Output shape: {model.output_shape}")
print(f"Model layers: {len(model.layers)}")

# Check if model is always predicting same class
print("\n=== CHECKING FOR BIAS ===")
predictions = []
for i in range(50):
    test_img = np.random.random((1, 150, 150, 3))
    pred = model.predict(test_img, verbose=0)
    idx = np.argmax(pred)
    predictions.append(idx)

class_0_count = predictions.count(0)
class_1_count = predictions.count(1)
print(f"Class 0 predictions: {class_0_count}/50 ({class_0_count/50*100:.1f}%)")
print(f"Class 1 predictions: {class_1_count}/50 ({class_1_count/50*100:.1f}%)")

if class_1_count > 45:
    print("⚠️  MODEL IS BIASED - Always predicts class 1!")
elif class_0_count > 45:
    print("⚠️  MODEL IS BIASED - Always predicts class 0!")
else:
    print("✅ Model seems balanced")