import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import numpy as np

# Create tiny model
model = Sequential([
    Conv2D(16, (3, 3), activation='relu', input_shape=(150, 150, 3)),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(32, activation='relu'),
    Dense(2, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Quick training with minimal data
X_dummy = np.random.random((20, 150, 150, 3))
y_dummy = tf.keras.utils.to_categorical(np.random.randint(0, 2, 20), 2)

model.fit(X_dummy, y_dummy, epochs=1, verbose=0)

# Save tiny model
model.save('waste_classifier_model.h5')
print("Tiny model created!")