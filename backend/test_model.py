from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

# Load the model
model = load_model("waste_classifier_model.h5")

print("Model loaded successfully!")
print(f"Model input shape: {model.input_shape}")
print(f"Model output shape: {model.output_shape}")

# Create test images
test_image = np.random.random((1, 150, 150, 3))
pred = model.predict(test_image)

print(f"Raw prediction shape: {pred.shape}")
print(f"Raw prediction: {pred}")
print(f"Prediction argmax: {np.argmax(pred)}")
print(f"Prediction max: {np.max(pred)}")

# Test multiple times to see consistency
for i in range(5):
    test_img = np.random.random((1, 150, 150, 3))
    pred = model.predict(test_img, verbose=0)
    idx = np.argmax(pred)
    confidence = pred[0][idx]
    print(f"Test {i+1}: Index={idx}, Confidence={confidence:.4f}")