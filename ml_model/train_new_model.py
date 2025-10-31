import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

# Use the dataset path you already have
dataset_path = r'C:\Users\kisho\.cache\kagglehub\datasets\rayhanzamzamy\non-and-biodegradable-waste-dataset\versions\2'
train_dir = os.path.join(dataset_path, 'TRAIN.1')
test_dir = os.path.join(dataset_path, 'TEST')

print(f"Training data: {train_dir}")
print(f"Test data: {test_dir}")

# Check if directories exist
if not os.path.exists(train_dir):
    print("ERROR: Training directory not found!")
    exit()

# Image preprocessing with data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    validation_split=0.2  # Use 20% for validation
)

# Load training data
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',  # Binary classification
    subset='training'
)

# Load validation data
validation_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',
    subset='validation'
)

print(f"Training samples: {train_generator.samples}")
print(f"Validation samples: {validation_generator.samples}")
print(f"Class indices: {train_generator.class_indices}")

# Build a simple but effective CNN model
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
    Dense(1, activation='sigmoid')  # Binary output
])

# Compile model
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Model architecture:")
model.summary()

# Train model
print("Starting training...")
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    epochs=15,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    verbose=1
)

# Save model
model.save('waste_classifier_model.h5')
print("Model saved as waste_classifier_model.h5")

# Test the model with a few predictions
import numpy as np
print("\nTesting model predictions:")
for i in range(5):
    test_img = np.random.random((1, 150, 150, 3))
    pred = model.predict(test_img, verbose=0)
    print(f"Test {i+1}: Prediction = {pred[0][0]:.3f}")