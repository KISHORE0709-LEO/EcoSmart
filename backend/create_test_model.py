import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Flatten, Dropout
import numpy as np

# Create a simple CNN model for waste classification
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
    Dense(1, activation='sigmoid')  # Binary classification
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Create dummy training data for the model to learn some patterns
np.random.seed(42)
X_train = np.random.random((100, 150, 150, 3))
y_train = np.random.randint(0, 2, (100, 1))

# Train for a few epochs to give it some learned patterns
print("Training simple model...")
model.fit(X_train, y_train, epochs=5, verbose=1)

# Save the model
model.save("waste_classifier_model.h5")
print("Test model saved successfully!")

# Test the model
test_image = np.random.random((1, 150, 150, 3))
prediction = model.predict(test_image)
print(f"Test prediction: {prediction[0][0]}")