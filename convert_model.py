import tensorflowjs as tfjs
from tensorflow.keras.models import load_model

# Load your trained model
model = load_model('ml_model/waste_classifier_model.h5')

# Convert to TensorFlow.js format
tfjs.converters.save_keras_model(model, 'public/model')

print("✅ Model converted to TensorFlow.js format!")
print("📁 Files saved in public/model/ directory")
print("🌐 Can now be loaded directly from your website")