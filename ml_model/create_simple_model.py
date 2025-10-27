import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import numpy as np

# Create simple model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(2, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Create dummy training data for quick training
X_dummy = np.random.random((100, 150, 150, 3))
y_dummy = tf.keras.utils.to_categorical(np.random.randint(0, 2, 100), 2)

# Quick training
model.fit(X_dummy, y_dummy, epochs=5, verbose=1)

# Save model
model.save('waste_classifier_model.h5')
print("Simple model created and saved!")