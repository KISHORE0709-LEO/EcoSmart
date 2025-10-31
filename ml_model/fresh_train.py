import kagglehub
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os

# Download dataset using kagglehub
print("Downloading dataset...")
path = kagglehub.dataset_download("rayhanzamzamy/non-and-biodegradable-waste-dataset")
print("Path to dataset files:", path)

# Set up data paths
train_dir = os.path.join(path, 'TRAIN.1')
test_dir = os.path.join(path, 'TEST')

print(f"Training directory: {train_dir}")
print(f"Test directory: {test_dir}")

# Check directories
if os.path.exists(train_dir):
    print("✅ Training directory found")
    subdirs = os.listdir(train_dir)
    print(f"Classes found: {subdirs}")
else:
    print("❌ Training directory not found")

# Image preprocessing
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    validation_split=0.2
)

# Load data
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary',
    subset='validation'
)

print(f"Class indices: {train_generator.class_indices}")
print(f"Training samples: {train_generator.samples}")
print(f"Validation samples: {validation_generator.samples}")

# Build CNN model
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
    Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("\n🏗️ Model Architecture:")
model.summary()

# Train model
print("\n🚀 Starting training...")
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    epochs=10,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size
)

# Save model
model.save('waste_classifier_model.h5')
print("\n✅ Model saved as waste_classifier_model.h5")

# Test predictions
import numpy as np
print("\n🧪 Testing model:")
for i in range(3):
    test_img = np.random.random((1, 150, 150, 3))
    pred = model.predict(test_img, verbose=0)
    result = "biodegradable" if pred[0][0] < 0.5 else "non-biodegradable"
    print(f"Test {i+1}: {pred[0][0]:.3f} → {result}")

print("\n🎉 Training complete!")